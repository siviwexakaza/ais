"use client";
import { AssessorForm } from "@/components/forms/assessor-form";
import { BranchForm } from "@/components/forms/branch-form";
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
import { Branch } from "@prisma/client";
import { toast } from "sonner";

export function ManageBranchesDialog() {
  function onSubmitFinish(response: NetworkResponse<Branch>) {
    if (response.success) {
      toast.success("Branch added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Branch</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Branch</DialogTitle>
          <DialogDescription>Add a new branch to the system.</DialogDescription>
        </DialogHeader>
        <BranchForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
