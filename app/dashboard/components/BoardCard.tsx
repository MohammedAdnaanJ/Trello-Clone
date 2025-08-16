"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BoardProps {
  board: {
    id: string;
    title: string | null;
    description: string | null;
    color: string | null;
    created_at: string;
    updated_at: string;
  };
}

const BoardCard = ({ board }: BoardProps) => {
  return (
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
        <CardTitle
          className={`text-base sm:text-lg mb-2 group-hover:text-${board.color} transition-colors`}
        >
          {board.title}
        </CardTitle>
        <CardDescription className="text-sm mb-4">
          {board.description}
        </CardDescription>
        <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between text-sm text-gray-500 space-y-1 sm:space-y-0">
          <span>
            created_at {new Date(board.created_at).toLocaleDateString()}
          </span>
          <span>
            updated_at {new Date(board.updated_at).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardCard;
