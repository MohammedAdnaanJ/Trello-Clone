"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React from "react";

const TaskFormDialog = ({
  handleCreateTask,
}: {
  handleCreateTask: (e: React.FormEvent) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <p className="text-sm text-gray-600">Add a task to the board</p>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleCreateTask}>
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input id="title" name="title" placeholder="Enter task title" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Assignee</Label>
            <Input
              id="assignee"
              name="assignee"
              placeholder="Who should do this?"
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["low", "medium", "high"].map((priority, key) => (
                  <SelectItem key={key} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input type="date" id="dueDate" name="dueDate" />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
