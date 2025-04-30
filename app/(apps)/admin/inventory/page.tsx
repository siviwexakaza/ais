export const dynamic = "force-dynamic";

import { ManagePartDialog } from "./_components/manage-part-dialog";
import { PartsTable } from "./_components/parts-table";
import { getParts } from "@/actions/part/actions";
export default async function Page() {
  const parts = await getParts();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Parts</h1>
      <p className="text-sm text-gray-500">
        Manage your parts all in one place
      </p>

      <div className="flex justify-end">
        <ManagePartDialog />
      </div>
      <PartsTable parts={parts} />
    </div>
  );
}
