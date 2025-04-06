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
import { addInsurerSchema } from "@/lib/schemas";
import { NetworkResponse, AddInsurerType } from "@/lib/types";
import { Insurer } from "@prisma/client";
import { useState } from "react";
import { createInsurer } from "@/actions/insurer/actions";
import Spinner from "../spinner";
const formSchema = addInsurerSchema;

interface InsurerFormProps {
  onSubmitFinish: (response: NetworkResponse<Insurer>) => void;
  defaultValues?: AddInsurerType;
}

export function InsurerForm({
  onSubmitFinish,
  defaultValues,
}: InsurerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddInsurerType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: AddInsurerType) {
    setIsLoading(true);
    try {
      const response = await createInsurer(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Insurer name" {...field} />
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
                <Input placeholder="Insurer email" {...field} />
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Insurer phone" {...field} />
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
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
