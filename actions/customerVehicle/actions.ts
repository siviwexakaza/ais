"use server";

import { AddCustomerVehicleType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { CustomerVehicle, VehicleBrand } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCustomerVehicle(
  values: AddCustomerVehicleType,
  path = "/admin/customers"
): Promise<CustomerVehicle> {
  try {
    const vehicle = await prisma.customerVehicle.create({
      data: values,
    });

    revalidatePath(path);
    return vehicle;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create vehicle");
  }
}

export async function getCustomerVehicles(customerId: string) {
  return prisma.customerVehicle.findMany({
    where: {
      customerId,
    },
  });
}
