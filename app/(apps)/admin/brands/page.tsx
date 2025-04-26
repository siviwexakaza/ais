export const dynamic = "force-dynamic";

import { getBrands } from "@/actions/brand/actions";
import { ManageBrandDialog } from "./_components/manage-brand-dialog";
import { BrandsTable } from "./_components/brands-table";
export default async function Page() {
  const brands = await getBrands();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Brands</h1>
      <p className="text-sm text-gray-500">
        Manage your vehicle brands all in one place
      </p>

      <div className="flex justify-end">
        <ManageBrandDialog />
      </div>
      <BrandsTable brands={brands} />
    </div>
  );
}
