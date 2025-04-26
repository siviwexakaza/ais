export const dynamic = "force-dynamic";

import { getCustomerById } from "@/actions/customer/actions";
import { notFound } from "next/navigation";
import { CustomerDetails } from "../_components/customer-details";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { getCustomerVehicles } from "@/actions/customerVehicle/actions";
import { getCustomerIncidents } from "@/actions/incident/actions";

interface CustomerPageProps {
  params: {
    id: string;
  };
}

export default async function CustomerDetailsPage({
  params,
}: CustomerPageProps) {
  const customer = await getCustomerById(params.id);

  if (!customer) {
    notFound();
  }

  const vehicles = await getCustomerVehicles(customer.id);
  const incidents = await getCustomerIncidents(customer.id);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        <h1 className="text-2xl font-bold">
          {customer.firstName} {customer.lastName}
        </h1>
        <Button variant={"ghost"}>
          <Pencil />
        </Button>
      </div>

      <p className="text-sm text-gray-500">
        Manage {customer.firstName}'s information, vehicles, quotations and
        insurance details
      </p>

      <CustomerDetails
        incidents={incidents}
        customer={customer}
        vehicles={vehicles}
      />
    </div>
  );
}
