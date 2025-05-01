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
import { addCustomerVehicleSchema } from "@/lib/schemas";
import { NetworkResponse, AddCustomerVehicleType } from "@/lib/types";
import { CustomerVehicle, VehicleBrand } from "@prisma/client";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import Select from "react-select";
import { createCustomerVehicle } from "@/actions/customerVehicle/actions";
import { useParams } from "next/navigation";
import { getBrands } from "@/actions/brand/actions";
const formSchema = addCustomerVehicleSchema;

interface CustomerVehicleFormProps {
  onSubmitFinish: (response: NetworkResponse<CustomerVehicle>) => void;
  defaultValues?: AddCustomerVehicleType;
}

export function CustomerVehicleForm({
  onSubmitFinish,
  defaultValues,
}: CustomerVehicleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState<{ value: string; label: string }[]>([]);
  const params = useParams();
  const form = useForm<AddCustomerVehicleType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      model: "",
      registrationNumber: "",
      engineNumber: "",
    },
  });

  const fetchAllBrands = async () => {
    const res = await getBrands();

    const options = res.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setBrands(options);
  };

  const handleBrandChange = (
    selected: { value: string; label: string } | null
  ) => {
    if (selected) {
      form.setValue("brandId", selected.value);
    }
  };

  useEffect(() => {
    if (params.id) {
      form.setValue("customerId", params.id as string);
    }
    fetchAllBrands();
  }, []);

  async function onSubmit(values: AddCustomerVehicleType) {
    setIsLoading(true);
    try {
      const response = await createCustomerVehicle(values);
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
        <FormField
          control={form.control}
          name="engineNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine Number</FormLabel>
              <FormControl>
                <Input placeholder="Engine Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Select
          options={brands}
          onChange={handleBrandChange}
          placeholder="Select a brand..."
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Registration Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
