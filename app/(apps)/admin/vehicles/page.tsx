export const dynamic = "force-dynamic";

import { ManageVehicleDialog } from "./_components/manage-vehicle-dialog";
import { VehiclesTable } from "./_components/vehicles-table";
import { getVehicles } from "@/actions/vehicle/actions";
export default async function Page() {
  const vehicles = await getVehicles();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Vehicles</h1>
      <div className="flex justify-end">
        <ManageVehicleDialog />
      </div>
      <VehiclesTable vehicles={vehicles} />
    </div>
  );
}
