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
import { addIncidentSchema } from "@/lib/schemas";
import {
  NetworkResponse,
  AddCustomerVehicleType,
  AddIncidentType,
} from "@/lib/types";
import { Incident } from "@prisma/client";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import Select from "react-select";
import {
  createCustomerVehicle,
  getCustomerVehicles,
} from "@/actions/customerVehicle/actions";
import { useParams } from "next/navigation";
import { getBrands } from "@/actions/brand/actions";
import { createIncident } from "@/actions/incident/actions";
import { Textarea } from "../ui/textarea";
import Uploader from "./uploader";
import { toast } from "sonner";
import {
  Armchair,
  ArrowDown01,
  ArrowUp01,
  Car,
  Caravan,
  CarFront,
  CarIcon,
  CircleHelp,
  Gauge,
  HeartCrack,
  Settings,
  ZoomIn,
} from "lucide-react";
const formSchema = addIncidentSchema;

interface IncidentFormProps {
  onSubmitFinish: (response: NetworkResponse<Incident>) => void;
  defaultValues?: AddIncidentType;
}

export function IncidentForm({
  onSubmitFinish,
  defaultValues,
}: IncidentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState<{ value: string; label: string }[]>(
    []
  );
  const params = useParams();
  const form = useForm<AddIncidentType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {},
  });

  const fetchCustomerVehicles = async () => {
    const res = await getCustomerVehicles(params.id as string);

    const options = res.map((item) => ({
      value: item.id,
      label: `${item.model} (${item.registrationNumber})`,
    }));
    setVehicles(options);
  };

  const handleVehicleChange = (
    selected: { value: string; label: string } | null
  ) => {
    if (selected) {
      form.setValue("vehicleId", selected.value);
    }
  };

  useEffect(() => {
    if (params.id) {
      form.setValue("customerId", params.id as string);
    }

    fetchCustomerVehicles();
  }, []);

  async function onSubmit(values: AddIncidentType) {
    setIsLoading(true);
    try {
      const response = await createIncident(values);
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
        <div className="grid grid-cols-2 gap-4">
          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("licenseDisk", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="License Disc"
            icon={CircleHelp}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("numberPlateFront", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Number Plate Front"
            icon={ArrowUp01}
          />
          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("frontView", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Front View"
            icon={CarFront}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("numberPlateRear", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Number Plate Rear"
            icon={ArrowDown01}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("rearView", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Rear View"
            icon={CarFront}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("leftSide", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Left Side"
            icon={Car}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("rightSide", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Right Side"
            icon={Car}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("dashboard", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Dashboard"
            icon={Gauge}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("interiorSeating", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Interior Seating"
            icon={Armchair}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("bootSpace", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Boot Space"
            icon={Caravan}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("rearBumber", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Rear Bumper"
            icon={CarFront}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("engineBay", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Engine Bay"
            icon={Settings}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("damageArea", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Damage Area"
            icon={HeartCrack}
          />

          <Uploader
            onUploadComplete={(res) => {
              if (res.url) {
                form.setValue("closeUpOfDamage", res.url);
              } else if (res.error) {
                toast.error(res.error);
              }
            }}
            acceptFormats={{ "image/*": [] }}
            text="Close-Up of Damage"
            icon={ZoomIn}
          />
        </div>
        <Select
          options={vehicles}
          onChange={handleVehicleChange}
          placeholder="Select a vehicle..."
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Notes" {...field} />
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
