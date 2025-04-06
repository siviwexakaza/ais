"use server";

import prisma from "@/lib/prisma";
import { Walkin } from "@prisma/client";

export async function createWalkin(values: any): Promise<Walkin> {
  try {
    const walkin = await prisma.walkin.create({
      data: values,
    });

    return walkin;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create walkin");
  }
}

export async function getWalkinById(id: string) {
  return prisma.walkin.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      branch: true,
      customerInsurance: {
        include: {
          insurer: true,
        },
      },
      vehicle: {
        include: {
          vehicle: true,
        },
      },
    },
  });
}
