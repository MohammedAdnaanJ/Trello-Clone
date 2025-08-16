"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

interface CreateColumnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleCreateColumn: (e: React.FormEvent<HTMLFormElement>) => void;
  newColumnTitle: string;
  setNewColumnTitle: (title: string) => void;
  setIsCreatingColumn: (isCreating: boolean) => void;
}

const CreateColumn = ({
  open,
  onOpenChange,
  handleCreateColumn,
  newColumnTitle,
  setNewColumnTitle,
  setIsCreatingColumn,
}: CreateColumnProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>Create New Column</DialogTitle>
          <p className="text-sm text-gray-600">
            Add new column to organize your tasks
          </p>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleCreateColumn}>
          <div className="space-y-2">
            <Label>Column Title</Label>
            <Input
              id="columnTitle"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Enter column title..."
              required
            />
          </div>
          <div className="space-x-2 flex justify-end">
            <Button
              type="button"
              onClick={() => setIsCreatingColumn(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Create Column</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumn;
