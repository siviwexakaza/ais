"use client";

import { DataTable } from "@/components/data-table";
import { PartDetails } from "@/lib/types";
import { useRouter } from "next/navigation";
import { PartTableColumns } from "./parts-table-columns";

interface PartsTableProps {
  parts: PartDetails[];
}

export function PartsTable({ parts }: PartsTableProps) {
  const router = useRouter();
  function onRowClick(row: PartDetails) {
    router.push(`/admin/inventory/${row.id}`);
  }
  return (
    <DataTable
      searchFeild="name"
      searchPlaceholder="Search parts by name..."
      columns={PartTableColumns}
      data={parts}
      onRowClick={onRowClick}
    />
  );
}
