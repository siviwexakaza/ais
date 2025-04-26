"use client";
import { CustomerForm } from "@/components/forms/customer-form";
import { CustomerVehicleForm } from "@/components/forms/customer-vehicle-form";
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
import { CustomerVehicle } from "@prisma/client";
import { toast } from "sonner";

export function ManageCustomerVehicleDialog({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  function onSubmitFinish(response: NetworkResponse<CustomerVehicle>) {
    if (response.success) {
      toast.success("Customer vehicle added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isButton ? (
          <Button variant="default">Add Vehicle</Button>
        ) : (
          <span className="cursor-pointer">Add Vehicle</span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogDescription>
            Add a new customer to the system.
          </DialogDescription>
        </DialogHeader>
        <CustomerVehicleForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
