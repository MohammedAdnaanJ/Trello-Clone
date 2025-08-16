"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

type Board = { id: string; title: string; color: string } | null;
const BoardEditing = ({
  open,
  onOpenChange,
  board,
  onUpdateBoard,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  board: Board;
  onUpdateBoard: (
    id: string,
    data: { title: string; color: string }
  ) => Promise<void>;
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState("");

  useEffect(() => {
    if (board) {
      setNewTitle(board.title || "");
      setNewColor(board.color || "");
    }
  }, [board]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!board) return;
    await onUpdateBoard(board.id, {
      title: newTitle.trim(),
      color: newColor || board.color,
    });
    onOpenChange(false);
  };

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-gray-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-emerald-500",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogTitle>Edit Board</DialogTitle>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Board Title</Label>
            <Input
              id="boardTitle"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter the Board Title..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Board Color</Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`cursor-pointer size-8 rounded-full ${color} ${
                    color === newColor
                      ? "ring-2 ring-offset-2 ring-gray-900"
                      : ""
                  }`}
                  onClick={() => setNewColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BoardEditing;