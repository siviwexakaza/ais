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
import { addAssessorSchema } from "@/lib/schemas";
import { NetworkResponse, AddAssessorType } from "@/lib/types";
import { Assessor } from "@prisma/client";
import { useState } from "react";
import { createAssessor } from "@/actions/assessor/actions";
import Spinner from "../spinner";
const formSchema = addAssessorSchema;

interface AssessorFormProps {
  onSubmitFinish: (response: NetworkResponse<Assessor>) => void;
  defaultValues?: AddAssessorType;
}

export function AssessorForm({
  onSubmitFinish,
  defaultValues,
}: AssessorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddAssessorType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: AddAssessorType) {
    setIsLoading(true);
    try {
      const response = await createAssessor(values);
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
                <Input placeholder="Assessor name" {...field} />
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
                <Input placeholder="Assessor email" {...field} />
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
                <Input placeholder="Assessor phone" {...field} />
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
