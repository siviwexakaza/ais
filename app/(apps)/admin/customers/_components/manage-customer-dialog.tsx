"use client";
import { CustomerForm } from "@/components/forms/customer-form";
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
import { Customer } from "@prisma/client";
import { toast } from "sonner";

export function ManageCustomerDialog({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  function onSubmitFinish(response: NetworkResponse<Customer>) {
    if (response.success) {
      toast.success("Customer added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isButton ? (
          <Button variant="default">Add Customer</Button>
        ) : (
          <span className="cursor-pointer">Add Customer</span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Add a new customer to the system.
          </DialogDescription>
        </DialogHeader>
        <CustomerForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
