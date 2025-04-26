"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerForm } from "@/components/forms/customer-form";
import {
  AddCustomerType,
  FullCustomerDetails,
  IncidentDetails,
  ListCustomerVehicleType,
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
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash,
  User,
  Wrench,
} from "lucide-react";
import StatList from "../../dashboard/_components/stat-list";
import Image from "next/image";
import { CustomersVehicleTable } from "../[id]/_components/vehicles/customer-vehicle-table-columns";
import { ManageCustomerVehicleDialog } from "../[id]/_components/vehicles/manage-customer-vehicle-dialog";
import { IncidentsTable } from "../[id]/_components/incidents/incidents-table";
import { ManageIncidentDialog } from "../[id]/_components/incidents/manage-incident-dialog";

interface CustomerDetailsProps {
  customer: FullCustomerDetails;
  vehicles: ListCustomerVehicleType[];
  incidents: IncidentDetails[];
}

export function CustomerDetails({
  customer,
  vehicles,
  incidents,
}: CustomerDetailsProps) {
  const cardData = [
    {
      title: "VEHICLES",
      value: vehicles.length,
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: CarFrontIcon,
    },
    {
      title: "INCIDENTS",
      value: incidents.length,
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: File,
    },
    {
      title: "ONGOING JOBS",
      value: 0,
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: Wrench,
    },
    {
      title: "INVOICES",
      value: 0,
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

          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <User />
                <p>
                  {customer.firstName} {customer.lastName}
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Mail />
                <p>{customer.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <Phone />
                <p>{customer.phoneNumber}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <MapPin />
                <p>{customer.physicalAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">Vehicles</h3>
            <ManageCustomerVehicleDialog />
          </div>

          <CustomersVehicleTable vehicles={vehicles} />
        </div>

        <div className="mt-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">Incidents</h3>
            <ManageIncidentDialog />
          </div>
          <IncidentsTable incidents={incidents} />
        </div>
      </div>
    </div>
  );
}
