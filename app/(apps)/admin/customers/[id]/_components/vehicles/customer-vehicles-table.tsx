"use client";

import { Button } from "@/components/ui/button";
import { ListCustomerVehicleType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const CustomerVehicleTableColumns: ColumnDef<ListCustomerVehicleType>[] =
  [
    {
      accessorKey: "model",
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
      accessorKey: "registrationNumber",
      header: "Registration",
    },
    {
      accessorKey: "engineNumber",
      header: "Engine Number",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
  ];
