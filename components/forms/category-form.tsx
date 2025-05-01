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
import { addPartCategorySchema } from "@/lib/schemas";
import { NetworkResponse, AddPartCategoryType } from "@/lib/types";
import { PartCategory } from "@prisma/client";
import { useState } from "react";
import Spinner from "../spinner";
import { Camera } from "lucide-react";

import Uploader from "./uploader";
import { toast } from "sonner";
import { createCategory } from "@/actions/category/actions";
const formSchema = addPartCategorySchema;

interface PartCategoryFormProps {
  onSubmitFinish: (response: NetworkResponse<PartCategory>) => void;
  defaultValues?: AddPartCategoryType;
}

export function PartCategoryForm({
  onSubmitFinish,
  defaultValues,
}: PartCategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddPartCategoryType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      image: "",
    },
  });

  async function onSubmit(values: AddPartCategoryType) {
    setIsLoading(true);
    try {
      const response = await createCategory(values);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Uploader
          onUploadComplete={(res) => {
            if (res.url) {
              form.setValue("image", res.url);
            } else if (res.error) {
              toast.error(res.error);
            }
          }}
          acceptFormats={{ "image/*": [] }}
          text="Category image"
          icon={Camera}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
