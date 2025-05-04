"use server";

import {
  AddCustomerVehicleType,
  AddDocumentType,
  AddIncidentType,
} from "@/lib/types";
import prisma from "@/lib/prisma";
import { CustomerDocument } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createDocument(
  values: AddDocumentType,
  path = "/admin/incident"
): Promise<CustomerDocument> {
  try {
    const document = await prisma.customerDocument.create({
      data: values,
    });

    revalidatePath(path);
    return document;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create document");
  }
}

export async function getCustomerDocuments(customerId: string) {
  return prisma.customerDocument.findMany({
    where: {
      customerId,
    },
  });
}
