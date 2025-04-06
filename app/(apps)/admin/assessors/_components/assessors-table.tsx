"use client";

import { DataTable } from "@/components/data-table";
import { AssessorsTableColumns } from "./assessors-table-columns";
import { ListAssessorType } from "@/lib/types";

interface AssessorsTableProps {
  assessors: ListAssessorType[];
}

export function AssessorsTable({ assessors }: AssessorsTableProps) {
  function onRowClick(row: ListAssessorType) {}
  return (
    <DataTable
      columns={AssessorsTableColumns}
      data={assessors}
      onRowClick={onRowClick}
    />
  );
}
