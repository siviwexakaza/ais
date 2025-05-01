export const dynamic = "force-dynamic";

import { getCustomerById } from "@/actions/customer/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { getCustomerVehicles } from "@/actions/customerVehicle/actions";
import { getCustomerIncidents } from "@/actions/incident/actions";
import { getPart } from "@/actions/part/actions";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface PartPageProps {
  params: {
    id: string;
  };
}

export default async function PartDetailsPage({ params }: PartPageProps) {
  const part = await getPart(params.id);

  if (!part) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        <h1 className="text-2xl font-bold">{part.name}</h1>
      </div>

      <p className="text-sm text-gray-500">Part Number {part.partNumber}</p>

      <Card>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative w-[400px] h-[400px] aspect-video rounded-xl overflow-hidden">
              <Image
                src={part.picture}
                alt="Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Model</p>
          <p className="font-semibold">{part.model}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Category</p>
          <p className="font-semibold">{part.partCategory.name}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Selling Price</p>
          <p className="font-semibold">R{part.price}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Brand</p>
          <p className="font-semibold">{part.brand.name}</p>
        </div>

        <div className="flex flex-col gap-2">
          {part.quantity > 0 ? (
            <div className="px-2 w-fit bg-green-300/40 text-green-700 rounded-md">
              <p>In Stock</p>
            </div>
          ) : (
            <div className="px-2 w-fit bg-red-300/40 text-red-700 rounded-md">
              <p>Out of Stock</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
