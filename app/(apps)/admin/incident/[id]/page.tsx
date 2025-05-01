export const dynamic = "force-dynamic";

import { getCustomerById } from "@/actions/customer/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Printer, PrinterIcon } from "lucide-react";
import { getCustomerVehicles } from "@/actions/customerVehicle/actions";
import { getCustomerIncidents, getIncident } from "@/actions/incident/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncidentDetails from "./_components/IncidentDetails";
import VehicleDetails from "./_components/VehicleDetails";
import ClientDetails from "./_components/ClientDetails";
import FinanceDetails from "./_components/FinanceDetails";
import WorkshopDetails from "./_components/WorkshopDetails";
import InsuranceDetails from "./_components/InsuranceDetails";
import PrintButton from "./_components/PrintButton";

interface IncidentPageProps {
  params: {
    id: string;
  };
}

export default async function IncidentPage({ params }: IncidentPageProps) {
  const incident = await getIncident(params.id);
  console.log(incident);
  if (!incident) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        <h1 className="text-2xl font-bold">Incident</h1>
      </div>

      <p className="text-sm text-gray-500">Incident information</p>

      <div>
        <div>
          <PrintButton />
        </div>
        <Tabs defaultValue="incident" className="">
          <TabsList>
            <TabsTrigger value="incident">Incident</TabsTrigger>
            {/* <TabsTrigger value="vehicle">Vehicle</TabsTrigger> */}
            {/* <TabsTrigger value="client">Client</TabsTrigger> */}
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="workshop">Workshop</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>
          <TabsContent value="incident">
            <IncidentDetails {...incident} />
          </TabsContent>
          <TabsContent value="vehicle">
            <VehicleDetails />
          </TabsContent>
          <TabsContent value="client">
            <ClientDetails />
          </TabsContent>
          <TabsContent value="finance">
            <FinanceDetails />
          </TabsContent>
          <TabsContent value="workshop">
            <WorkshopDetails />
          </TabsContent>
          <TabsContent value="insurance">
            <InsuranceDetails />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
