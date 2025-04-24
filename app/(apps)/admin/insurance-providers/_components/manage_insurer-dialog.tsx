// "use client";
// import { InsurerForm } from "@/components/forms/insurer-form";
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
// import { Insurer } from "@prisma/client";
// import { toast } from "sonner";

// export function ManageInsurerDialog() {
//   function onSubmitFinish(response: NetworkResponse<Insurer>) {
//     if (response.success) {
//       toast.success("Insurer added successfully");
//     } else {
//       toast.error(response.message);
//     }
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default">Add Insurer</Button>
//       </DialogTrigger>
//       <DialogContent className="w-full">
//         <DialogHeader>
//           <DialogTitle>Add Insurer</DialogTitle>
//           <DialogDescription>
//             Add a new insurer to the system.
//           </DialogDescription>
//         </DialogHeader>
//         <InsurerForm onSubmitFinish={onSubmitFinish} />
//       </DialogContent>
//     </Dialog>
//   );
// }
