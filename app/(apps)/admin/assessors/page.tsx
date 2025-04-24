export const dynamic = "force-dynamic";

import { AssessorsTable } from "./_components/assessors-table";
export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Assessors</h1>
      <div className="flex justify-end">{/* <ManageAssessorDialog /> */}</div>
      {/* <AssessorsTable assessors={assessors} /> */}
    </div>
  );
}
