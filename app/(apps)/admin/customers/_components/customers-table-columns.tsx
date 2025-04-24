"use client";

import { Button } from "@/components/ui/button";
import { ListCustomerType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const CustomersTableColumns: ColumnDef<ListCustomerType>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "physicalAddress",
    header: "Physical Address",
  },
  {
    accessorKey: "idNumber",
    header: "ID Number",
  },
];
