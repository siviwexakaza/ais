"use client";

import { Button } from "@/components/ui/button";
import { ListVehicleType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const VehiclesTableColumns: ColumnDef<ListVehicleType>[] = [
  {
    accessorKey: "make",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Make
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Model",
  },
];
