"use client";
import { BrandForm } from "@/components/forms/brand-form";
import { CustomerForm } from "@/components/forms/customer-form";
import { PartForm } from "@/components/forms/part-form";
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
import { Part, VehicleBrand } from "@prisma/client";
import { toast } from "sonner";

export function ManagePartDialog({ isButton = true }: { isButton?: boolean }) {
  function onSubmitFinish(response: NetworkResponse<Part>) {
    if (response.success) {
      toast.success("Part added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isButton ? (
          <Button variant="default">Add Part</Button>
        ) : (
          <span className="cursor-pointer">Add Part</span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Part</DialogTitle>
          <DialogDescription>Add a new part to the system.</DialogDescription>
        </DialogHeader>
        <PartForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
