"use server";

import prisma from "@/lib/prisma";
import { AddVehicleType } from "@/lib/types";
import { Vehicle } from "@prisma/client";
import { revalidatePath } from "next/cache";
export async function createVehicle(
  values: AddVehicleType,
  path = "/admin/vehicles"
): Promise<Vehicle> {
  try {
    const vehicle = await prisma.vehicle.create({
      data: values,
    });
    revalidatePath(path);
    return vehicle;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Failed to create vehicle");
  }
}

export async function getVehicles() {
  return prisma.vehicle.findMany();
}
