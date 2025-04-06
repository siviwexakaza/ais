"use client";

import { DataTable } from "@/components/data-table";
import { VehiclesTableColumns } from "./vehicle-table-columns";
import { ListVehicleType } from "@/lib/types";

interface VehiclesTableProps {
  vehicles: ListVehicleType[];
}

export function VehiclesTable({ vehicles }: VehiclesTableProps) {
  function onRowClick(row: ListVehicleType) {}
  return (
    <DataTable
      columns={VehiclesTableColumns}
      data={vehicles}
      onRowClick={onRowClick}
    />
  );
}
