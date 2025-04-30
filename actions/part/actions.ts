"use server";

import { AddBrandType, AddPartType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { Part, VehicleBrand } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPart(
  values: AddPartType,
  path = "/admin/inventory"
): Promise<Part> {
  try {
    const part = await prisma.part.create({
      data: {
        ...values,
        quantity: parseInt(values.quantity),
        price: parseFloat(values.price),
      },
    });

    revalidatePath(path);
    return part;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create part");
  }
}

export async function getParts() {
  return prisma.part.findMany({
    include: {
      branch: true,
      brand: true,
    },
  });
}
