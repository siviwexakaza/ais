"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCustomerSchema } from "@/lib/schemas";
import { NetworkResponse, AddCustomerType } from "@/lib/types";
import { Customer } from "@prisma/client";
import { useState } from "react";
import { createCustomer } from "@/actions/customer/actions";
import Spinner from "../spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Uploader from "./uploader";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
const formSchema = addCustomerSchema;

interface CustomerFormProps {
  onSubmitFinish: (response: NetworkResponse<Customer>) => void;
  defaultValues?: AddCustomerType;
}

export function CustomerForm({
  onSubmitFinish,
  defaultValues,
}: CustomerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddCustomerType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      physicalAddress: "",
      isWhatsappNumber: false,
      driversLicencePic: "",
    },
  });

  async function onSubmit(values: AddCustomerType) {
    setIsLoading(true);
    try {
      const response = await createCustomer(values);
      onSubmitFinish({
        success: true,
        data: response,
      });
    } catch (error) {
      console.error(error);
      onSubmitFinish({
        success: false,
        message: "Failed to proccess form. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Uploader
          onUploadComplete={(res) => {
            if (res.url) {
              form.setValue("driversLicencePic", res.url);
            } else if (res.error) {
              toast.error(res.error);
            }
          }}
          acceptFormats={{ "image/*": [] }}
          text="Driver's licence"
          icon={Camera}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Customer first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Customer last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number / Passport</FormLabel>
              <FormControl>
                <Input placeholder="Customer ID number / passport" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Customer phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Customer email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="physicalAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Physical Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isWhatsappNumber"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use the above number for Whatsapp communication
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <Spinner />
          </div>
        ) : (
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="w-full"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
