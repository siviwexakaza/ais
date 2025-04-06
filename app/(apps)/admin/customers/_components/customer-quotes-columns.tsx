"use client";

import { Button } from "@/components/ui/button";
import { Quotation } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const CustomerQuotesTableColumns: ColumnDef<Quotation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "authorized",
    header: "Authorized",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
