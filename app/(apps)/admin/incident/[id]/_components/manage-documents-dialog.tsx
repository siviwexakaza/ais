"use client";
import { CustomerForm } from "@/components/forms/customer-form";
import { DocumentForm } from "@/components/forms/document-form";
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
import { CustomerDocument } from "@prisma/client";
import { toast } from "sonner";

export function ManageDocumentsDialog({
  isButton = true,
  customerId,
}: {
  isButton?: boolean;
  customerId: string;
}) {
  function onSubmitFinish(response: NetworkResponse<CustomerDocument>) {
    if (response.success) {
      toast.success("Document added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isButton ? (
          <Button variant="default">Add Document</Button>
        ) : (
          <span className="cursor-pointer">Add Document</span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Document</DialogTitle>
          <DialogDescription>
            Add a new document to the system.
          </DialogDescription>
        </DialogHeader>
        <DocumentForm customerId={customerId} onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
