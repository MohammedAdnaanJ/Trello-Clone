"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBoards } from "@/lib/hooks/useBoards";
import { useUser } from "@clerk/nextjs";
import {
  Filter,
  Grid3X3,
  List,
  Loader2,
  Plus,
  Rocket,
  Search,
  Trello,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import StatCard from "./components/StatCard";
import BoardCard from "./components/BoardCard";
import FilterDialog from "./components/FilterDialog";
import { Board } from "@/lib/supabase/models";
import { usePlan } from "@/lib/contexts/PlanContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { createBoard, boards, loading, error } = useBoards();
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState<boolean>(false);
  const [filters, setIsFilters] = useState({
    search: "",
    dateRange: {
      start: null as string | null,
      end: null as string | null,
    },
    taskCount: {
      min: null as number | null,
      max: null as number | null,
    },
  });

  const { isFreeUser } = usePlan();
  const canCreateBoard = !isFreeUser || boards.length < 1;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // const hasProPlan = has({plan: "pro_user"})

  const boardsWithTaskCount = boards.map((board) => ({
    ...board,
    taskCount: 0,
  }));

  const filterBoards = boardsWithTaskCount.filter((board: Board) => {
    const matchesSearch = board.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesDateRange =
      !filters.dateRange.start ||
      (new Date(board.created_at) >= new Date(filters.dateRange.start) &&
        (!filters.dateRange.end ||
          new Date(board.created_at) <= new Date(filters.dateRange.end)));

    return matchesSearch && matchesDateRange;
  });

  const clearFilters = () => {
    setIsFilters({
      search: "",
      dateRange: {
        start: null as string | null,
        end: null as string | null,
      },
      taskCount: {
        min: null as number | null,
        max: null as number | null,
      },
    });
  };

  const handleCreateBoard = async () => {
    if (!canCreateBoard) {
      setShowUpgradeDialog(true);
      return;
    }
    await createBoard({ title: "New Board" });
  };
  const { user } = useUser();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 />
        <span>Loading Your Boards...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2>Error Loading Boards</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋
          </h1>
          <p className="text-gray-600 mb-4 sm:mb-6">
            Here&apos;s What happening with you boards today.
          </p>
        </div>
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Total Boards"
              value={boards.length}
              icon={<Trello className="size-5 sm:size-6 text-blue-600" />}
              iconBg="bg-blue-100"
            />
            <StatCard
              title="Recent Activity"
              value={
                boards.filter((board) => {
                  const updatedAt = new Date(board.updated_at);
                  const oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  return updatedAt > oneWeekAgo;
                }).length
              }
              icon={<div>📊</div>}
              iconBg="bg-purple-100"
            />
            <StatCard
              title="Active Projects"
              value={boards.length}
              icon={<Rocket className="size-5 sm:size-6 text-green-600" />}
              iconBg="bg-green-100"
            />
            <StatCard
              title="Total Boards"
              value={boards.length}
              icon={<Trello className="size-5 sm:size-6 text-blue-600" />}
              iconBg="bg-blue-100"
            />
          </div>
        </section>

        {/* Boards */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Your Boards
              </h2>
              <p className="text-gray-600">Manage your Projects and Tasks.</p>
              <p>
                {isFreeUser && <p>Free Plan: {boards.length}/1 boards used.</p>}
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row
            items-stretch sm:items-center space-x-1 sm:space-x-2 space-y-2 sm:space-y-0"
            >
              <div className="flex items-center border bg-white rounded">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsFilterOpen(true);
                }}
              >
                <Filter /> Filter
              </Button>

              <Button
                size="sm"
                className="w-full sm:w-auto cursor-pointer"
                onClick={handleCreateBoard}
              >
                <Plus size={4} className="mr-2" />
                Create Board
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search boards..."
              className="pl-10"
              onChange={(e) =>
                setIsFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>

          {/* Boards Grid/List */}
          {filterBoards.length === 0 ? (
            <div>No Boards Yet.</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filterBoards.map((board, key) => (
                <Link key={key} href={`/boards/${board.id}`}>
                  <BoardCard board={board} />
                </Link>
              ))}
            </div>
          ) : (
            <div>
              {filterBoards.map((board, key) => (
                <div key={key} className={key > 0 ? "mt-4" : ""}>
                  <Link href={`/boards/${board.id}`}>
                    <BoardCard board={board} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Filter Dialog */}
      <FilterDialog
        isOpen={isFilterOpen}
        onOpenChange={() => setIsFilterOpen(false)}
        setIsFilters={setIsFilters}
        clearFilters={clearFilters}
        setIsFilterOpen={setIsFilterOpen}
      />

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Upgrade to Create More Boards</DialogTitle>
            <p className="text-sm text-gray-600">
              Free users can only create one board. Upgrade to Pro or Enterprise
              to create unlimited boards.
            </p>
          </DialogHeader>
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowUpgradeDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => router.push("/pricing")}>View Plans</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
