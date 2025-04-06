"use server";

import { AddInsurerType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { Insurer } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createInsurer(
  values: AddInsurerType,
  path = "/admin/insurance-providers"
): Promise<Insurer> {
  try {
    const insurer = await prisma.insurer.create({
      data: values,
    });

    revalidatePath(path);
    return insurer;
  } catch (error) {
    throw new Error("Failed to create insurer");
  }
}
export async function getInsurers() {
  return prisma.insurer.findMany();
}
