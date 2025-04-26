"use client";

import { DataTable } from "@/components/data-table";
import { ListCustomerType, ListCustomerVehicleType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CustomerVehicleTableColumns } from "./customer-vehicles-table";

interface CustomersVehicleTableProps {
  vehicles: ListCustomerVehicleType[];
}

export function CustomersVehicleTable({
  vehicles,
}: CustomersVehicleTableProps) {
  const router = useRouter();
  function onRowClick(row: ListCustomerVehicleType) {
    //router.push(`/admin/customers/${row.id}`);
  }
  return (
    <DataTable
      columns={CustomerVehicleTableColumns}
      data={vehicles}
      onRowClick={onRowClick}
    />
  );
}
