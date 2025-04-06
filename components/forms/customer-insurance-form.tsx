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
import { addCustomerInsuranceSchema } from "@/lib/schemas";
import { NetworkResponse, AddCustomerInsuranceType } from "@/lib/types";
import { CustomerInsurance, Insurer } from "@prisma/client";
import { useEffect, useState } from "react";
import { addCustomerInsurer } from "@/actions/customer/actions";
import Spinner from "../spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInsurers } from "@/actions/insurer/actions";
const formSchema = addCustomerInsuranceSchema;

interface CustomerInsuranceFormProps {
  onSubmitFinish: (response: NetworkResponse<CustomerInsurance>) => void;
  customerId: string;
  defaultValues?: AddCustomerInsuranceType;
}

export function CustomerInsuranceForm({
  onSubmitFinish,
  defaultValues,
  customerId,
}: CustomerInsuranceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [insurances, setInsurances] = useState<Insurer[]>([]);
  const form = useForm<AddCustomerInsuranceType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      insurerId: "",
      insuranceNumber: "",
    },
  });

  useEffect(() => {
    const fetchInsurers = async () => {
      const response = await getInsurers();
      setInsurances(response);
    };
    fetchInsurers();
  }, []);

  async function onSubmit(values: AddCustomerInsuranceType) {
    setIsLoading(true);
    const data = {
      ...values,
      customerId,
    };
    try {
      const response = await addCustomerInsurer(data);
      console.log(response);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="insurerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Service Provider</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {insurances.map((insurance) => (
                    <SelectItem key={insurance.id} value={insurance.id}>
                      {insurance.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insuranceNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Insurance Number</FormLabel>
              <Input {...field} />
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
