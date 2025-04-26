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
import { addBrandSchema } from "@/lib/schemas";
import { NetworkResponse, AddCustomerType, AddBrandType } from "@/lib/types";
import { VehicleBrand } from "@prisma/client";
import { useState } from "react";
import { createCustomer } from "@/actions/customer/actions";
import Spinner from "../spinner";

import Uploader from "./uploader";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { createBrand } from "@/actions/brand/actions";
import { Camera } from "lucide-react";
const formSchema = addBrandSchema;

interface BrandFormProps {
  onSubmitFinish: (response: NetworkResponse<VehicleBrand>) => void;
  defaultValues?: AddBrandType;
}

export function BrandForm({ onSubmitFinish, defaultValues }: BrandFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddBrandType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      logo: "",
    },
  });

  async function onSubmit(values: AddBrandType) {
    setIsLoading(true);
    try {
      const response = await createBrand(values);
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
              form.setValue("logo", res.url);
            } else if (res.error) {
              toast.error(res.error);
            }
          }}
          acceptFormats={{ "image/*": [] }}
          text="Brand Logo"
          icon={Camera}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Brand name" {...field} />
              </FormControl>
              <FormMessage />
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
