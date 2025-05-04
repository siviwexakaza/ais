"use client";

import { DataTable } from "@/components/data-table";
import { CustomersTableColumns } from "./customers-table-columns";
import { ListCustomerType } from "@/lib/types";
import { useRouter } from "next/navigation";

interface CustomersTableProps {
  customers: ListCustomerType[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  const router = useRouter();
  function onRowClick(row: ListCustomerType) {
    router.push(`/admin/customers/${row.id}`);
  }
  return (
    <DataTable
      columns={CustomersTableColumns}
      searchFeild={"firstName"}
      searchPlaceholder="Search by name..."
      data={customers}
      onRowClick={onRowClick}
    />
  );
}
