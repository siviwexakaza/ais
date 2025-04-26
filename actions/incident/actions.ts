"use server";

import { AddCustomerVehicleType, AddIncidentType } from "@/lib/types";
import prisma from "@/lib/prisma";
import { Incident } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createIncident(
  values: AddIncidentType,
  path = "/admin/customers"
): Promise<Incident> {
  try {
    const incident = await prisma.incident.create({
      data: values,
    });

    revalidatePath(path);
    return incident;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Failed to create incident");
  }
}

export async function getCustomerIncidents(customerId: string) {
  return prisma.incident.findMany({
    where: {
      customerId,
    },
    include: {
      vehicle: true,
    },
  });
}
