export const dynamic = "force-dynamic";

import { getBranches } from "@/actions/branch/actions";
import { BranchesTable } from "./_components/branches-table";
import { ManageBranchesDialog } from "./_components/manage-branches-dialog";

export default async function Page() {
  const branches = await getBranches();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Branches</h1>
      <div className="flex justify-end">
        <ManageBranchesDialog />
      </div>
      <BranchesTable branches={branches} />
    </div>
  );
}
