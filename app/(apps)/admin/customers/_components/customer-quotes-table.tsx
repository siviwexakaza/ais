"use client";

import { DataTable } from "@/components/data-table";
import { Quotation } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CustomerQuotesTableColumns } from "./customer-quotes-columns";

interface CustomerQuotesTableProps {
  quotes: Quotation[];
}

export function CustomerQuotesTable({ quotes }: CustomerQuotesTableProps) {
  const router = useRouter();
  function onRowClick(row: Quotation) {
    router.push(`/admin/quotations/build/${row.id}`);
  }
  return (
    <DataTable
      columns={CustomerQuotesTableColumns}
      data={quotes}
      onRowClick={onRowClick}
    />
  );
}
