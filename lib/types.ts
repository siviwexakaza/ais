import {
  Branch,
  Customer,
  CustomerVehicle,
  Incident,
  Part,
  VehicleBrand,
} from "@prisma/client";
import {
  addAssessorSchema,
  addInsurerSchema,
  addVehicleSchema,
  addCustomerSchema,
  addCustomerVehicleSchema,
  addBranchSchema,
  addCustomerInsuranceSchema,
  addBrandSchema,
  addIncidentSchema,
  addPartSchema,
  addPartCategorySchema,
  addDocumentSchema,
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

export type CustomerVehicleDetails = CustomerVehicle & {
  brand: VehicleBrand;
};

export type PartDetails = Part & {
  brand: VehicleBrand;
  branch: Branch;
};

export type IncidentDetails = Incident & {
  vehicle: CustomerVehicle;
};

export type IncidentExtendedDetails = Incident & {
  vehicle: CustomerVehicle & {
    brand: VehicleBrand;
  };
  customer: Customer;
};

export type AddPartType = z.infer<typeof addPartSchema>;
export type ListPartsType = { id: string } & AddPartType;

export type AddDocumentType = z.infer<typeof addDocumentSchema>;
export type ListDocumentType = { id: string } & AddDocumentType;

export type AddPartCategoryType = z.infer<typeof addPartCategorySchema>;
export type ListPartCategoryType = { id: string } & AddPartCategoryType;

export type AddAssessorType = z.infer<typeof addAssessorSchema>;
export type ListAssessorType = { id: string } & AddAssessorType;

export type AddInsurerType = z.infer<typeof addInsurerSchema>;
export type ListInsurerType = { id: string } & AddInsurerType;

export type AddVehicleType = z.infer<typeof addVehicleSchema>;
export type ListVehicleType = { id: string } & AddVehicleType;

export type AddCustomerType = z.infer<typeof addCustomerSchema>;
export type ListCustomerType = { id: string } & AddCustomerType;

export type AddBrandType = z.infer<typeof addBrandSchema>;
export type ListBrandType = { id: string } & AddBrandType;

export type AddCustomerVehicleType = z.infer<typeof addCustomerVehicleSchema>;
export type ListCustomerVehicleType = { id: string } & AddCustomerVehicleType;

export type AddIncidentType = z.infer<typeof addIncidentSchema>;
export type ListIncidentType = { id: string } & AddIncidentType;

export type AddBranchType = z.infer<typeof addBranchSchema>;
export type ListBranchType = { id: string } & AddBranchType;

export type AddCustomerInsuranceType = z.infer<
  typeof addCustomerInsuranceSchema
>;
export type ListCustomerInsuranceType = {
  id: string;
} & AddCustomerInsuranceType;
