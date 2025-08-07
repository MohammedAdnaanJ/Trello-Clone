"use client";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const Dashboard = () => {
  const { createBoard, boards, loading, error } = useBoards();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCreateBoard = async () => {
    await createBoard({ title: "New Board" });
  };
  const { user } = useUser();

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <Loader2 />
  //       <span>Loading Your Boards...</span>
  //     </div>
  //   );
  // }

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
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg sm:text-md font-medium text-gray-600">
                      Total Boards
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {boards.length}
                    </p>
                  </div>
                  <div className="size-10 sm:size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Trello className="size-5 sm:size-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg sm:text-md font-medium text-gray-600">
                      Recent Activity
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {
                        boards.filter((board) => {
                          const updatedAt = new Date(board.updated_at);
                          const oneWeekAgo = new Date();
                          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                          return updatedAt > oneWeekAgo;
                        }).length
                      }
                    </p>
                  </div>
                  <div className="size-10 sm:size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    📊
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg sm:text-md font-medium text-gray-600">
                      Active Projects
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {boards.length}
                    </p>
                  </div>
                  <div className="size-10 sm:size-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Rocket className="size-5 sm:size-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg sm:text-md font-medium text-gray-600">
                      Total Boards
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {boards.length}
                    </p>
                  </div>
                  <div className="size-10 sm:size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Trello className="size-5 sm:size-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
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
            </div>

            <div
              className="flex flex-col sm:flex-row
            items-stretch sm:items-center space-y-2 sm:space-y-0"
            >
              <div className="flex items-center space-x-2 border bg-white p-1 rounded">
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
              <Button variant="outline" size="sm" onClick={() => {}}>
                <Filter /> Filter
              </Button>

              <Button
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
            />
          </div>

          {/* Boards Grid/List */}
          {boards.length === 0 ? (
            <div>No Boards Yet.</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {boards.map((board, key) => (
                <Link key={key} href={`/boards/${board.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-3 ">
                      <div className="flex items-center justify-between">
                        <div className={`size-4 ${board.color} rounded`} />
                        <Badge className="text-xs" variant="secondary">
                          New
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-8">
                      <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {board.title}
                      </CardTitle>
                      <CardDescription className="text-sm mb-4">
                        {board.description}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between text-sm text-gray-500 space-y-1 sm:space-y-0">
                        <span>
                          created_at{" "}
                          {new Date(board.created_at).toLocaleDateString()}
                        </span>
                        <span>
                          updated_at{" "}
                          {new Date(board.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                  <Plus className="size-6 sm:size-8 text-gray-400 group-hover:text-blue-400 mb-2" />
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">
                    Create New Board
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              {boards.map((board, key) => (
                <div key={key} className={key > 0 ? "mt-4" : ""}>
                  <Link href={`/boards/${board.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader className="pb-3 ">
                        <div className="flex items-center justify-between">
                          <div className={`size-4 ${board.color} rounded`} />
                          <Badge className="text-xs" variant="secondary">
                            New
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-8">
                        <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {board.title}
                        </CardTitle>
                        <CardDescription className="text-sm mb-4">
                          {board.description}
                        </CardDescription>
                        <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between text-sm text-gray-500 space-y-1 sm:space-y-0">
                          <span>
                            created_at{" "}
                            {new Date(board.created_at).toLocaleDateString()}
                          </span>
                          <span>
                            updated_at{" "}
                            {new Date(board.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}

              <Card className="mt-4 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                  <Plus className="size-6 sm:size-8 text-gray-400 group-hover:text-blue-400 mb-2" />
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">
                    Create New Board
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
