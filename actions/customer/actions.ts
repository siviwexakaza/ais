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

export async function getCustomerById(
  id: string
): Promise<FullCustomerDetails | null> {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        customerVehicle: {
          include: {
            vehicle: true,
          },
        },
        customerInsurances: {
          include: {
            insurer: true,
          },
        },
        walkins: {
          include: {
            branch: true,
          },
        },
      },
    });
    return customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

export async function addCustomerVehicle(
  values: any,
  path = "/admin/customers"
) {
  try {
    const customerVehicle = await prisma.customerVehicle.create({
      data: values,
    });
    revalidatePath(path);
    return customerVehicle;
  } catch (error) {
    throw new Error("Failed to create customer vehicle");
  }
}

export async function getCustomerVehicles(customerId: string) {
  return prisma.customerVehicle.findMany({
    where: {
      customerId,
    },
    include: {
      vehicle: true,
    },
  });
}

export async function addCustomerInsurer(
  values: any,
  path = "/admin/customers"
) {
  try {
    const customerInsurer = await prisma.customerInsurance.create({
      data: values,
    });
    revalidatePath(path);
    return customerInsurer;
  } catch (error) {
    throw new Error("Failed to add customer insurance provider");
  }
}

export async function getCustomerInsurances(customerId: string) {
  return prisma.customerInsurance.findMany({
    where: {
      customerId,
    },
    include: {
      insurer: true,
    },
  });
}
