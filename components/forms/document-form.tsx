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
import { addBrandSchema, addDocumentSchema } from "@/lib/schemas";
import {
  NetworkResponse,
  AddCustomerType,
  AddBrandType,
  AddDocumentType,
} from "@/lib/types";
import { CustomerDocument, VehicleBrand } from "@prisma/client";
import { useEffect, useState } from "react";
import { createCustomer } from "@/actions/customer/actions";
import Spinner from "../spinner";

import Uploader from "./uploader";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { createBrand } from "@/actions/brand/actions";
import { Camera, File } from "lucide-react";
import { createDocument } from "@/actions/documents/actions";
const formSchema = addDocumentSchema;

interface DocumentFormProps {
  onSubmitFinish: (response: NetworkResponse<CustomerDocument>) => void;
  defaultValues?: AddDocumentType;
  customerId: string;
}

export function DocumentForm({
  onSubmitFinish,
  defaultValues,
  customerId,
}: DocumentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddDocumentType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      url: "",
      customerId: "",
    },
  });

  async function onSubmit(values: AddDocumentType) {
    setIsLoading(true);
    try {
      const response = await createDocument(values);
      onSubmitFinish({
        success: true,
        data: response,
      });
      form.reset();
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

  useEffect(() => {
    form.setValue("customerId", customerId);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Uploader
          onUploadComplete={(res) => {
            console.log("RES", res);
            if (res.url) {
              form.setValue("url", res.url);
            } else if (res.error) {
              toast.error(res.error);
            }
          }}
          acceptFormats={{ "application/pdf": [] }}
          text="Document"
          icon={File}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Name</FormLabel>
              <FormControl>
                <Input placeholder="Document name" {...field} />
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
