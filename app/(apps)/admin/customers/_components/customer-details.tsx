"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Branch,
  Customer,
  CustomerInsurance,
  CustomerVehicle,
  Insurer,
  Vehicle,
  Walkin,
} from "@prisma/client";
import { CustomerForm } from "@/components/forms/customer-form";
import {
  AddCustomerType,
  FullCustomerDetails,
  NetworkResponse,
} from "@/lib/types";
import { CustomerVehicleForm } from "@/components/forms/customer-vehicle-form";
import { toast } from "sonner";
import { Building, Car, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerInsuranceForm } from "@/components/forms/customer-insurance-form";
import { formatCustomerWalkins } from "../utils";
import { CustomerQuotesTable } from "./customer-quotes-table";

interface CustomerDetailsProps {
  customer: FullCustomerDetails;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  const quotes = formatCustomerWalkins(customer);
  async function onSubmitCustomerFinish(data: NetworkResponse<Customer>) {
    console.log(data);
  }

  async function onSubmitCustomerVehicleFinish(
    data: NetworkResponse<CustomerVehicle>
  ) {
    if (data.success) {
      toast.success("Vehicle added successfully");
    } else {
      toast.error(data.message);
    }
  }

  async function onSubmitCustomerInsuranceFinish(
    data: NetworkResponse<CustomerInsurance>
  ) {
    if (data.success) {
      toast.success("Insurance added successfully");
    } else {
      toast.error(data.message);
    }
  }

  const defaultCustomerValues: AddCustomerType = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    streetName: customer.streetName,
    suburb: customer.suburb,
    city: customer.city,
    idNumber: customer.idNumber,
    dateOfBirth: customer.dateOfBirth,
  };

  return (
    <Tabs defaultValue="info">
      <TabsList className="grid w-full grid-cols-6 mb-4">
        <TabsTrigger value="info">Personal Information</TabsTrigger>
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        <TabsTrigger value="insurance">Insurance Information</TabsTrigger>
        <TabsTrigger value="quotes">Quotations</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="jobs">Jobs</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <CustomerForm
          onSubmitFinish={onSubmitCustomerFinish}
          defaultValues={defaultCustomerValues}
        />
      </TabsContent>
      <TabsContent value="vehicles">
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <CustomerVehicleForm
              onSubmitFinish={onSubmitCustomerVehicleFinish}
              customerId={customer.id}
            />
          </div>
          <div className="flex-1">
            {customer.customerVehicle.map((vehicle) => (
              <div
                className="flex flex-row  justify-between rounded-lg border p-3 shadow-sm mt-4"
                key={vehicle.id}
              >
                <div className="flex flex-row  gap-4">
                  <div>
                    <Car size={34} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-md font-bold">
                      {vehicle.year} {vehicle.vehicle.make}{" "}
                      {vehicle.vehicle.model}
                    </p>
                    <p className="text-xs">
                      <span className="font-bold">Colour: </span>{" "}
                      {vehicle.colour}
                    </p>
                    <p className="text-xs">
                      <span className="font-bold">Reg Number: </span>{" "}
                      {vehicle.registrationNumber}
                    </p>
                    <p className="text-xs">
                      <span className="font-bold">VIN Num: </span>{" "}
                      {vehicle.vinNumber}
                    </p>
                    <p className="text-xs">
                      <span className="font-bold">Engine Num: </span>{" "}
                      {vehicle.engineNumber}
                    </p>
                    <p className="text-xs">
                      <span className="font-bold">Warranty: </span>{" "}
                      {vehicle.isUnderWarranty ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <Button variant={"destructive"}>
                    <Trash />
                  </Button>
                  <Button>
                    <Pencil />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="insurance">
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <CustomerInsuranceForm
              onSubmitFinish={onSubmitCustomerInsuranceFinish}
              customerId={customer.id}
            />
          </div>
          <div className="flex-1">
            {customer.customerInsurances.map((insurer) => (
              <div
                className="flex flex-row  justify-between rounded-lg border p-3 shadow-sm mt-4"
                key={insurer.id}
              >
                <div className="flex flex-row  gap-4">
                  <div>
                    <Building size={34} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-md font-bold">{insurer.insurer.name}</p>
                    <p className="text-xs">
                      <span className="font-bold">Insurance Number: </span>{" "}
                      {insurer.insuranceNumber}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <Button variant={"destructive"}>
                    <Trash />
                  </Button>
                  <Button>
                    <Pencil />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="quotes">
        <CustomerQuotesTable quotes={quotes} />
      </TabsContent>
      <TabsContent value="invoices">
        <p>Password</p>
      </TabsContent>
      <TabsContent value="jobs">
        <p>Password</p>
      </TabsContent>
    </Tabs>
  );
}
