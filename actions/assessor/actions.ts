"use server";

import { AddAssessorType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { Assessor } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAssessor(
  values: AddAssessorType,
  path = "/admin/assessors"
): Promise<Assessor> {
  try {
    const assessor = await prisma.assessor.create({
      data: values,
    });

    revalidatePath(path);
    return assessor;
  } catch (error) {
    throw new Error("Failed to create assessor");
  }
}
export async function getAssessors() {
  return prisma.assessor.findMany();
}
