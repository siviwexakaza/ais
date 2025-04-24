"use server";

import {
  AddCustomerType,
  AddCustomerVehicleType,
  FullCustomerDetails,
} from "@/lib/types";
import prisma from "@/lib/prisma";
import { Customer } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCustomer(
  values: AddCustomerType,
  path = "/admin/customers"
): Promise<Customer> {
  try {
    const customer = await prisma.customer.create({
      data: values,
    });

    revalidatePath(path);
    return customer;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create customer");
  }
}

export async function getCustomers() {
  return prisma.customer.findMany();
}

export async function searchCustomers(query: string): Promise<Customer[]> {
  return prisma.customer.findMany({
    where: {
      OR: [
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { email: { contains: query } },
        { idNumber: { contains: query } },
      ],
    },
  });
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });
    return customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}
