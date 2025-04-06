"use client";

import { DataTable } from "@/components/data-table";
import { InsurersTableColumns } from "./insurers-table-columns";
import { ListInsurerType } from "@/lib/types";

interface InsurersTableProps {
  insurers: ListInsurerType[];
}

export function InsurersTable({ insurers }: InsurersTableProps) {
  function onRowClick(row: ListInsurerType) {}
  return (
    <DataTable
      columns={InsurersTableColumns}
      data={insurers}
      onRowClick={onRowClick}
    />
  );
}
