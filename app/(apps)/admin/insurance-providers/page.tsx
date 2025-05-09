export const dynamic = "force-dynamic";

import { InsurersTable } from "./_components/insurers-table";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Insurance Providers</h1>

      <div className="flex justify-end">{/* <ManageInsurerDialog /> */}</div>
      {/* <InsurersTable insurers={insurers} /> */}
    </div>
  );
}
