"use client";

import { DataTable } from "@/components/data-table";
import { IncidentDetails } from "@/lib/types";
import { useRouter } from "next/navigation";
import { IncidentTableColumns } from "./incidents-table-columns";

interface IncidentTableProps {
  incidents: IncidentDetails[];
}

export function IncidentsTable({ incidents }: IncidentTableProps) {
  const router = useRouter();
  function onRowClick(row: IncidentDetails) {
    router.push(`/admin/incident/${row.id}`);
  }
  return (
    <DataTable
      columns={IncidentTableColumns}
      data={incidents}
      onRowClick={onRowClick}
    />
  );
}
