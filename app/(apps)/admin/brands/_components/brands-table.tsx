"use client";

import { DataTable } from "@/components/data-table";
import { ListBrandType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { BrandsTableColumns } from "./brands-table-columns";

interface BrandsTableProps {
  brands: ListBrandType[];
}

export function BrandsTable({ brands }: BrandsTableProps) {
  const router = useRouter();
  function onRowClick(row: ListBrandType) {
    //router.push(`/admin/brands/${row.id}`);
  }
  return (
    <DataTable
      searchFeild="name"
      searchPlaceholder="Search by brand name..."
      columns={BrandsTableColumns}
      data={brands}
      onRowClick={onRowClick}
    />
  );
}
