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
import { addBranchSchema } from "@/lib/schemas";
import { NetworkResponse, AddBranchType } from "@/lib/types";
import { Branch } from "@prisma/client";
import { useState } from "react";
import Spinner from "../spinner";
import { createBranch } from "@/actions/branch/actions";
const formSchema = addBranchSchema;

interface BranchFormProps {
  onSubmitFinish: (response: NetworkResponse<Branch>) => void;
  defaultValues?: AddBranchType;
}

export function BranchForm({ onSubmitFinish, defaultValues }: BranchFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddBranchType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      address: "",
    },
  });

  async function onSubmit(values: AddBranchType) {
    setIsLoading(true);
    try {
      const response = await createBranch(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Branch name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Branch Address" {...field} />
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
