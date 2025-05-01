"use server";

import { AddPartCategoryType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { PartCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCategory(
  values: AddPartCategoryType,
  path = "/admin/inventory"
): Promise<PartCategory> {
  try {
    const category = await prisma.partCategory.create({
      data: values,
    });

    revalidatePath(path);
    return category;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create category");
  }
}

export async function getCategories() {
  return prisma.partCategory.findMany();
}
