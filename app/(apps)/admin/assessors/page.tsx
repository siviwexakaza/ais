export const dynamic = "force-dynamic";

import { ManageAssessorDialog } from "./_components/manage-assessor-dialog";
import { getAssessors } from "@/actions/assessor/actions";
import { AssessorsTable } from "./_components/assessors-table";
export default async function Page() {
  const assessors = await getAssessors();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Assessors</h1>
      <div className="flex justify-end">
        <ManageAssessorDialog />
      </div>
      <AssessorsTable assessors={assessors} />
    </div>
  );
}
