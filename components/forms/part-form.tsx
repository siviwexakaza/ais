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
import { addCustomerSchema, addPartSchema } from "@/lib/schemas";
import { NetworkResponse, AddCustomerType, AddPartType } from "@/lib/types";
import { Customer, Part } from "@prisma/client";
import { useEffect, useState } from "react";
import { createCustomer } from "@/actions/customer/actions";
import Spinner from "../spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Camera, Settings } from "lucide-react";

import Uploader from "./uploader";
import { toast } from "sonner";
import { createPart } from "@/actions/part/actions";
import { getBrands } from "@/actions/brand/actions";
import { getBranches } from "@/actions/branch/actions";
import Select from "react-select";
import { getCategories } from "@/actions/category/actions";
const formSchema = addPartSchema;

interface PartFormProps {
  onSubmitFinish: (response: NetworkResponse<Part>) => void;
  defaultValues?: AddPartType;
}

export function PartForm({ onSubmitFinish, defaultValues }: PartFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState<{ value: string; label: string }[]>([]);
  const [branches, setBranches] = useState<{ value: string; label: string }[]>(
    []
  );
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const form = useForm<AddPartType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      model: "",
      picture: "",
      make: "",
      quantity: "",
      name: "",
      price: "",
      branchId: "",
      brandId: "",
      partCategoryId: "",
      condition: "",
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

  const fetchAllCategories = async () => {
    const res = await getCategories();

    const options = res.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setCategories(options);
  };

  const fetchAllBranches = async () => {
    const res = await getBranches();

    const options = res.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setBranches(options);
  };

  const handleBrandChange = (
    selected: { value: string; label: string } | null
  ) => {
    if (selected) {
      form.setValue("brandId", selected.value);
    }
  };

  const handleCategoryChange = (
    selected: { value: string; label: string } | null
  ) => {
    if (selected) {
      form.setValue("partCategoryId", selected.value);
    }
  };

  const handleBranchChange = (
    selected: { value: string; label: string } | null
  ) => {
    if (selected) {
      form.setValue("branchId", selected.value);
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllBranches();
    fetchAllCategories();
  }, []);

  async function onSubmit(values: AddPartType) {
    setIsLoading(true);
    try {
      const response = await createPart(values);
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
              form.setValue("picture", res.url);
            } else if (res.error) {
              toast.error(res.error);
            }
          }}
          acceptFormats={{ "image/*": [] }}
          text="Part Image"
          icon={Settings}
        />
        <Select
          options={brands}
          onChange={handleBrandChange}
          placeholder="Select a brand..."
        />
        <Select
          options={branches}
          onChange={handleBranchChange}
          placeholder="Select a branch..."
        />
        <Select
          options={categories}
          onChange={handleCategoryChange}
          placeholder="Select a category..."
        />
        <Select
          options={[
            {
              value: "New",
              label: "New",
            },
            {
              value: "Used",
              label: "Used",
            },
          ]}
          onChange={(selected: { value: string; label: string } | null) => {
            if (selected) {
              form.setValue("condition", selected.value);
            }
          }}
          placeholder="Condition"
        />
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make</FormLabel>
              <FormControl>
                <Input placeholder="Make" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
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
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="Quantity" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" type="number" {...field} />
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
