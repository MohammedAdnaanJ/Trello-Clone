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

interface FilterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setIsFilters: (filters: any) => void;
  setIsFilterOpen: (open: boolean) => void;
  clearFilters: () => void;
}

const FilterDialog = ({
  isOpen,
  onOpenChange,
  setIsFilters,
  setIsFilterOpen,
  clearFilters,
}: FilterDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>Filter Boards</DialogTitle>
          <p className="text-sm text-gray-600">
            Filter Board by title,,date, or task count
          </p>
        </DialogHeader>
        <div className="space-y-4 ">
          <div className="space-y-2">
            <Label>Search</Label>
            <Input
              id="search"
              placeholder="Search board title..."
              onChange={(e) =>
                setIsFilters((prev: any) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <Label className="text-sm">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  onChange={(e) =>
                    setIsFilters((prev: { dateRange: any }) => ({
                      ...prev,
                      dateRange: {
                        ...prev.dateRange,
                        start: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label className="text-sm">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  onChange={(e) =>
                    setIsFilters((prev: { dateRange: any }) => ({
                      ...prev,
                      dateRange: {
                        ...prev.dateRange,
                        end: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Task Count</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <Label className="text-sm">Minimum</Label>
                <Input
                  id="min"
                  min="0"
                  placeholder="Min Tasks"
                  type="number"
                  onChange={(e) =>
                    setIsFilters((prev: { taskCount: any }) => ({
                      ...prev,
                      taskCount: {
                        ...prev.taskCount,
                        min: e.target.value ? Number(e.target.value) : null,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label className="text-sm">Maximum</Label>
                <Input
                  id="max"
                  min="0"
                  placeholder="Max Tasks"
                  type="number"
                  onChange={(e) =>
                    setIsFilters((prev: { taskCount: any }) => ({
                      ...prev,
                      taskCount: {
                        ...prev.taskCount,
                        max: e.target.value ? Number(e.target.value) : null,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-4 space-y-2 sm:space-y-0 space-x-2">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button onClick={() => setIsFilterOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
