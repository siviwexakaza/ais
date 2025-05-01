"use client";

import { Button } from "@/components/ui/button";
import { PartDetails } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const PartTableColumns: ColumnDef<PartDetails>[] = [
  {
    accessorKey: "picture",
    header: "Image",
    cell: ({ row }) => {
      const logoUrl = row.getValue("picture") as string;

      return (
        <div className="flex items-center justify-center">
          <div className="relative w-12 h-12 rounded-md overflow-hidden">
            <Image
              src={logoUrl}
              alt="Brand Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorFn: (row) => row.brand.name,
    id: "brandName",
    header: "Brand",
  },
  {
    accessorFn: (row) => row.branch.name,
    id: "branchName",
    header: "Branch",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "quantity",
    header: "Status",
    cell: ({ row }) => {
      const qty = parseInt(row.getValue("quantity"));

      return (
        <>
          {qty > 0 ? (
            <div className="px-2 w-fit bg-green-300/40 text-green-700 rounded-md">
              <p>In Stock</p>
            </div>
          ) : (
            <div className="px-2 w-fit bg-red-300/40 text-red-700 rounded-md">
              <p>Out of Stock</p>
            </div>
          )}
        </>
      );
    },
  },
];
