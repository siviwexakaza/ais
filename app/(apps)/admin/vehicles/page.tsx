export const dynamic = "force-dynamic";

import { VehiclesTable } from "./_components/vehicles-table";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Vehicles</h1>
      <div className="flex justify-end">{/* <ManageVehicleDialog /> */}</div>
      {/* <VehiclesTable vehicles={vehicles} /> */}
    </div>
  );
}
