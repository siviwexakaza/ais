"use client";
import { BrandForm } from "@/components/forms/brand-form";
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
import { VehicleBrand } from "@prisma/client";
import { toast } from "sonner";

export function ManageBrandDialog({ isButton = true }: { isButton?: boolean }) {
  function onSubmitFinish(response: NetworkResponse<VehicleBrand>) {
    if (response.success) {
      toast.success("Brand added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isButton ? (
          <Button variant="default">Add Brand</Button>
        ) : (
          <span className="cursor-pointer">Add Barand</span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Brand</DialogTitle>
          <DialogDescription>Add a new brand to the system.</DialogDescription>
        </DialogHeader>
        <BrandForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
