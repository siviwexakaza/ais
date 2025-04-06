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
import { addVehicleSchema } from "@/lib/schemas";
import { NetworkResponse, AddVehicleType } from "@/lib/types";
import { Vehicle } from "@prisma/client";
import { useState } from "react";
import { createVehicle } from "@/actions/vehicle/actions";
import Spinner from "../spinner";
const formSchema = addVehicleSchema;

interface VehicleFormProps {
  onSubmitFinish: (response: NetworkResponse<Vehicle>) => void;
  defaultValues?: AddVehicleType;
}

export function VehicleForm({
  onSubmitFinish,
  defaultValues,
}: VehicleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddVehicleType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      make: "",
      model: "",
    },
  });

  async function onSubmit(values: AddVehicleType) {
    setIsLoading(true);
    try {
      const response = await createVehicle(values);
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
          name="make"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make</FormLabel>
              <FormControl>
                <Input placeholder="Vehicle make" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="Vehicle model" {...field} />
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
