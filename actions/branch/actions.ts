"use server";

import { AddBranchType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { Branch } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createBranch(
  values: AddBranchType,
  path = "/admin/branches"
): Promise<Branch> {
  try {
    const branch = await prisma.branch.create({
      data: values,
    });

    revalidatePath(path);
    return branch;
  } catch (error) {
    throw new Error("Failed to create a branch");
  }
}
export async function getBranches() {
  return prisma.branch.findMany();
}
