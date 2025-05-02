"use client";

import { Button } from "@/components/ui/button";
import { IncidentDetails } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const IncidentTableColumns: ColumnDef<IncidentDetails>[] = [
  {
    accessorFn: (row) => row.vehicle.model,
    id: "model",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => row.vehicle.registrationNumber,
    id: "registrationNumber",
    header: "Registration",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
