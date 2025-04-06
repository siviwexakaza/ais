"use client";

import { DataTable } from "@/components/data-table";
import { ListBranchType } from "@/lib/types";
import { BranchesTableColumns } from "./branches-table-columns";

interface BranchesTableProps {
  branches: ListBranchType[];
}

export function BranchesTable({ branches }: BranchesTableProps) {
  function onRowClick(row: ListBranchType) {}
  return (
    <DataTable
      columns={BranchesTableColumns}
      data={branches}
      onRowClick={onRowClick}
    />
  );
}
