// "use client";

// import { CustomerVehicleForm } from "@/components/forms/customer-vehicle-form";
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
// import { CustomerVehicle } from "@prisma/client";
// import { toast } from "sonner";

// export function ManageCustomerVehicleDialog({
//   isButton = true,
//   customerId,
//   onResponse,
// }: {
//   isButton?: boolean;
//   customerId: string;
//   onResponse?: (response: NetworkResponse<CustomerVehicle>) => void;
// }) {
//   function onSubmitFinish(response: NetworkResponse<CustomerVehicle>) {
//     onResponse?.(response);
//     if (response.success) {
//       toast.success("Customer vehicle added successfully");
//     } else {
//       toast.error(response.message);
//     }
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         {isButton ? (
//           <Button variant="default">Add Customer Vehicle</Button>
//         ) : (
//           <span className="cursor-pointer">Add Customer Vehicle</span>
//         )}
//       </DialogTrigger>
//       <DialogContent className="w-full">
//         <DialogHeader>
//           <DialogTitle>Add Customer Vehicle</DialogTitle>
//           <DialogDescription>
//             Add a new customer vehicle to the system.
//           </DialogDescription>
//         </DialogHeader>
//         <CustomerVehicleForm
//           customerId={customerId}
//           onSubmitFinish={onSubmitFinish}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// }
