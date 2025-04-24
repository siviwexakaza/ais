// "use client";
// import { VehicleForm } from "@/components/forms/vehicle-form";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { NetworkResponse } from "@/lib/types";
// import { Vehicle } from "@prisma/client";
// import { toast } from "sonner";

// export function ManageVehicleDialog() {
//   function onSubmitFinish(response: NetworkResponse<Vehicle>) {
//     if (response.success) {
//       toast.success("Vehicle added successfully");
//     } else {
//       toast.error(response.message);
//     }
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default">Add Vehicle</Button>
//       </DialogTrigger>
//       <DialogContent className="w-full">
//         <DialogHeader>
//           <DialogTitle>Add Vehicle</DialogTitle>
//           <DialogDescription>
//             Add a new vehicle to the system.
//           </DialogDescription>
//         </DialogHeader>
//         <VehicleForm onSubmitFinish={onSubmitFinish} />
//       </DialogContent>
//     </Dialog>
//   );
// }
