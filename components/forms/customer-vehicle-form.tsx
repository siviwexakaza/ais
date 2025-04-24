// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { addCustomerVehicleSchema } from "@/lib/schemas";
// import { NetworkResponse, AddCustomerVehicleType } from "@/lib/types";
// import { CustomerVehicle, Vehicle } from "@prisma/client";
// import { useEffect, useState } from "react";
// import { addCustomerVehicle } from "@/actions/customer/actions";
// import Spinner from "../spinner";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { Calendar } from "../ui/calendar";
// import { CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getVehicles } from "@/actions/vehicle/actions";
// import { Switch } from "../ui/switch";
// const formSchema = addCustomerVehicleSchema;

// interface CustomerFormProps {
//   onSubmitFinish: (response: NetworkResponse<CustomerVehicle>) => void;
//   customerId: string;
//   defaultValues?: AddCustomerVehicleType;
// }

// export function CustomerVehicleForm({
//   onSubmitFinish,
//   defaultValues,
//   customerId,
// }: CustomerFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const form = useForm<AddCustomerVehicleType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: defaultValues || {
//       customerId: customerId,
//       vehicleId: "",
//       registrationNumber: "",
//       year: "",
//       colour: "",
//       engineNumber: "",
//       vinNumber: "",
//       odometer: "",
//       isUnderWarranty: false,
//     },
//   });

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       const response = await getVehicles();
//       setVehicles(response);
//     };
//     fetchVehicles();
//   }, []);

//   async function onSubmit(values: AddCustomerVehicleType) {
//     setIsLoading(true);
//     const data = {
//       ...values,
//       year: parseInt(values.year),
//       odometer: parseInt(values.odometer),
//     };
//     console.log(data);
//     try {
//       const response = await addCustomerVehicle(data);
//       console.log(response);
//       onSubmitFinish({
//         success: true,
//         data: response,
//       });
//     } catch (error) {
//       console.error(error);
//       onSubmitFinish({
//         success: false,
//         message: "Failed to proccess form. Please try again.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
//         <FormField
//           control={form.control}
//           name="vehicleId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Vehicle</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl className="w-full">
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a vehicle" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {vehicles.map((vehicle) => (
//                     <SelectItem key={vehicle.id} value={vehicle.id}>
//                       {vehicle.make} {vehicle.model}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="grid grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="registrationNumber"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Registration Number</FormLabel>
//                 <Input {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="year"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Year</FormLabel>
//                 <Input type="number" maxLength={4} {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="odometer"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Odometer</FormLabel>
//                 <Input type="number" {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="colour"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Colour</FormLabel>
//                 <Input {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="engineNumber"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Engine Number</FormLabel>
//                 <Input {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="vinNumber"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>VIN Number</FormLabel>
//                 <Input {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="isUnderWarranty"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
//               <div className="space-y-0.5">
//                 <FormLabel>Warranty</FormLabel>
//                 <FormDescription>
//                   Is this vehicle under warranty?
//                 </FormDescription>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         {isLoading ? (
//           <div className="flex justify-center items-center w-full">
//             <Spinner />
//           </div>
//         ) : (
//           <Button type="submit" className="w-full">
//             Submit
//           </Button>
//         )}
//       </form>
//     </Form>
//   );
// }
