/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface EditColumnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingColumnTitle: string;
  handleUpdateColumn: (e: React.FormEvent<HTMLFormElement>) => void;
  setEditingColumnTitle: (title: string) => void;
  setIsEditingColumn: (isEditing: boolean) => void;
  setEditingColumn: (column: any) => void; // Replace 'any' with your column type if available
}

const EditColumn = ({
  open,
  onOpenChange,
  editingColumnTitle,
  handleUpdateColumn,
  setEditingColumnTitle,
  setIsEditingColumn,
  setEditingColumn,
}: EditColumnProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Column</DialogTitle>
          <p className="text-sm text-gray-600">
            Update the title of your column
          </p>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleUpdateColumn}>
          <div className="space-y-2">
            <Label>Column Title</Label>
            <Input
              id="columnTitle"
              value={editingColumnTitle}
              onChange={(e) => setEditingColumnTitle(e.target.value)}
              placeholder="Enter column title..."
              required
            />
          </div>
          <div className="space-x-2 flex justify-end">
            <Button
              type="button"
              onClick={() => {
                setIsEditingColumn(false);
                setEditingColumnTitle("");
                setEditingColumn(null);
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Edit Column</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditColumn;
