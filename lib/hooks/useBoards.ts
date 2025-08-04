"use clinet";
import { useUser } from "@clerk/nextjs";
import { boardDataService, boardService } from "../services";
import { useEffect, useState } from "react";
import { Board } from "../supabase/models";
import { useSupabase } from "../supabase/SupabaseProvider";

const useBoards = () => {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadBoards();
    }
  }, [user, supabase]);

  const loadBoards = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await boardService.getBoard(supabase!, user.id);
      setBoards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Board.");
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (boardData: {
    title: string;
    description?: string;
    color?: string;
  }) => {
    if (!user) throw new Error("User not authneticated");
    try {
      const newBoard = await boardDataService.createBoardWithDefaultColumns(
        supabase!,
        {
          ...boardData,
          userId: user.id,
        }
      );
      setBoards((prev) => [newBoard, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create board");
    }
  };

  return { boards, loading, error, createBoard };
};

export default useBoards;
