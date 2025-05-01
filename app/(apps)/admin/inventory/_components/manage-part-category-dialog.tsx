"use client";
import { PartCategoryForm } from "@/components/forms/category-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NetworkResponse } from "@/lib/types";
import { PartCategory } from "@prisma/client";
import { toast } from "sonner";

export function ManagePartCategoryDialog({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  function onSubmitFinish(response: NetworkResponse<PartCategory>) {
    if (response.success) {
      toast.success("Part category added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isButton ? (
          <Button variant="default">Add Part Category</Button>
        ) : (
          <span className="cursor-pointer">Add Part Category</span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Part Category</DialogTitle>
          <DialogDescription>
            Add a new part category to the system.
          </DialogDescription>
        </DialogHeader>
        <PartCategoryForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
