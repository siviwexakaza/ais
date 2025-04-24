import {
  Branch,
  Customer,
  CustomerInsurance,
  CustomerVehicle,
  Insurer,
  Vehicle,
  Walkin,
} from "@prisma/client";
import {
  addAssessorSchema,
  addInsurerSchema,
  addVehicleSchema,
  addCustomerSchema,
  addCustomerVehicleSchema,
  addBranchSchema,
  addCustomerInsuranceSchema,
} from "./schemas";
import { z } from "zod";

export type NetworkResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type Quotation = {
  id: string;
  branch: string;
  condition: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export type FullCustomerDetails = Customer;

export type QuoteDetails = Walkin & {
  branch: Branch;
  customer: Customer;
  vehicle: CustomerVehicle & { vehicle: Vehicle };
  customerInsurance: (CustomerInsurance & { insurer: Insurer }) | undefined;
};

export type AddAssessorType = z.infer<typeof addAssessorSchema>;
export type ListAssessorType = { id: string } & AddAssessorType;

export type AddInsurerType = z.infer<typeof addInsurerSchema>;
export type ListInsurerType = { id: string } & AddInsurerType;

export type AddVehicleType = z.infer<typeof addVehicleSchema>;
export type ListVehicleType = { id: string } & AddVehicleType;

export type AddCustomerType = z.infer<typeof addCustomerSchema>;
export type ListCustomerType = { id: string } & AddCustomerType;

export type AddCustomerVehicleType = z.infer<typeof addCustomerVehicleSchema>;
export type ListCustomerVehicleType = { id: string } & AddCustomerVehicleType;

export type AddBranchType = z.infer<typeof addBranchSchema>;
export type ListBranchType = { id: string } & AddBranchType;

export type AddCustomerInsuranceType = z.infer<
  typeof addCustomerInsuranceSchema
>;
export type ListCustomerInsuranceType = {
  id: string;
} & AddCustomerInsuranceType;
