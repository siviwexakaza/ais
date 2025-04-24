"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerForm } from "@/components/forms/customer-form";
import {
  AddCustomerType,
  FullCustomerDetails,
  NetworkResponse,
} from "@/lib/types";
import { toast } from "sonner";
import {
  Building,
  Car,
  CarFrontIcon,
  Copy,
  File,
  FileLineChart,
  Pencil,
  Trash,
  User,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatList from "../../dashboard/_components/stat-list";
import Image from "next/image";

interface CustomerDetailsProps {
  customer: FullCustomerDetails;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  const cardData = [
    {
      title: "VEHICLES",
      value: "2",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: CarFrontIcon,
    },
    {
      title: "QUOTATIONS",
      value: "7",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: File,
    },
    {
      title: "ONGOING JOBS",
      value: "1",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: Wrench,
    },
    {
      title: "INVOICES",
      value: "3",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: FileLineChart,
    },
  ];
  return (
    <div className="mt-4 flex flex-col gap-6">
      <StatList stats={cardData} />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold">Driver's Licence</h3>
          <Image
            width={500}
            height={500}
            src={customer.driversLicencePic}
            alt="Drivers Licence"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Information</h3>

          <div className="flex flex-row gap-2 items-center">
            <User />
            <p>
              {customer.firstName} {customer.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
