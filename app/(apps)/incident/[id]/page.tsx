export const dynamic = "force-dynamic";

import { getCustomerById } from "@/actions/customer/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { getCustomerVehicles } from "@/actions/customerVehicle/actions";
import { getCustomerIncidents, getIncident } from "@/actions/incident/actions";

interface IncidentPageProps {
  params: {
    id: string;
  };
}

export default async function IncidentPage({ params }: IncidentPageProps) {
  const incident = await getIncident(params.id);

  if (!incident) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        <h1 className="text-2xl font-bold">Incident</h1>
      </div>

      <p className="text-sm text-gray-500">Incident information</p>
    </div>
  );
}
