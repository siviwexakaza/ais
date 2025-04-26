"use client";
import { CustomerVehicleForm } from "@/components/forms/customer-vehicle-form";
import { IncidentForm } from "@/components/forms/incident-form";
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
import { Incident } from "@prisma/client";
import { toast } from "sonner";

export function ManageIncidentDialog({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  function onSubmitFinish(response: NetworkResponse<Incident>) {
    if (response.success) {
      toast.success("Incident added successfully");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isButton ? (
          <Button variant="default">New Incident</Button>
        ) : (
          <span className="cursor-pointer">New Incident</span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>New Incident</DialogTitle>
          <DialogDescription>
            Upload the required pictures and add a note to create a new
            incident.
          </DialogDescription>
        </DialogHeader>
        <IncidentForm onSubmitFinish={onSubmitFinish} />
      </DialogContent>
    </Dialog>
  );
}
