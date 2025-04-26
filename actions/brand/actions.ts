"use server";

import { AddBrandType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { VehicleBrand } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createBrand(
  values: AddBrandType,
  path = "/admin/brands"
): Promise<VehicleBrand> {
  try {
    const customer = await prisma.vehicleBrand.create({
      data: values,
    });

    revalidatePath(path);
    return customer;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create brand");
  }
}

export async function getBrands() {
  return prisma.vehicleBrand.findMany();
}
