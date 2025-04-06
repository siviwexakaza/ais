"use client";
import { AssessorForm } from "@/components/forms/assessor-form";
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
import { Assessor } from "@prisma/client";
import { toast } from "sonner";

export function ManageAssessorDialog() {
  function onSubmitFinish(response: NetworkResponse<Assessor>) {
    if (response.success) {
      toast.success("Assessor added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Assessor</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Assessor</DialogTitle>
          <DialogDescription>
            Add a new assessor to the system.
          </DialogDescription>
        </DialogHeader>
        <AssessorForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
