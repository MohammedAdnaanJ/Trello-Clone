"use client";

import { ArrowLeft, FilterIcon, MoreHorizontal, Trello } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  boardTitle?: string;
  onEditBoard?: () => void;
  onFilterClick?: () => void;
  filterCount?: number;
};

const BoardPage = ({
  boardTitle,
  onEditBoard,
  onFilterClick,
  filterCount = 2,
}: Props) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <Link
              href="/dashboard"
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 flex-shrink-0"
            >
              <ArrowLeft className="size-4 sm:size-5" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="h-4 sm:h-6 w-px bg-gray-300 hidden sm:block" />
            <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
              <Trello className="text-blue-600" />
              <div className="items-center space-x-1 sm:space-x-2 min-w-0">
                <span className="text-lg font-bold text-gray-900 truncate">
                  {boardTitle}
                </span>
                {onEditBoard && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-7 flex-shrink-0 p-0"
                    onClick={onEditBoard}
                  >
                    <MoreHorizontal />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {onFilterClick && (
              <Button
                variant="outline"
                size="sm"
                className={`text-xs sm:text-sm ${
                  filterCount > 0 ? "bg-blue-100 border-blue-200" : 0
                }`}
                onClick={onFilterClick}
              >
                <FilterIcon className="size-3 sm:size-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
                {filterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-xs ml-1 sm:ml-2 bg-blue-100 border-blue-200"
                  >
                    {filterCount}
                  </Badge>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default BoardPage;
