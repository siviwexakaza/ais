"use client";

import { Button } from "@/components/ui/button";
import { ListBrandType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const BrandsTableColumns: ColumnDef<ListBrandType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "logo",
    header: "",
    cell: ({ row }) => {
      const logoUrl = row.getValue("logo") as string;

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
];
