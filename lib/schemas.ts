import { z } from "zod";

export const addInsurerSchema = z.object({
  name: z.string().min(2, {
    message: "Insurer name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

export const addAssessorSchema = z.object({
  name: z.string().min(2, {
    message: "Assessor name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

export const addBranchSchema = z.object({
  name: z.string().min(2, {
    message: "Branch name must be at least 2 characters.",
  }),
  address: z.string().min(0, {
    message: "Please enter the branch address",
  }),
});

export const addCustomerInsuranceSchema = z.object({
  insuranceNumber: z.string().min(2, {
    message: "Enter insurance number",
  }),
  insurerId: z.string().min(2, {
    message: "Please select the customer's insurance provider",
  }),
});

export const addVehicleSchema = z.object({
  make: z.string().min(2, {
    message: "Vehicle make must be at least 2 characters.",
  }),
  model: z.string().min(2, {
    message: "Vehicle model must be at least 2 characters.",
  }),
});

export const addCustomerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }), // First name must be at least 2 characters
  driversLicencePic: z
    .string()
    .min(2, { message: "Driver's licence is requred" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }), // Last name must be at least 2 characters
  idNumber: z
    .string()
    .min(9, {
      message: "ID or passport number must be between 9 and 13 characters.",
    })
    .max(13, {
      message: "ID or passport number must be between 9 and 13 characters.",
    }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }), // Phone number should be at least 10 characters
  email: z.string().email({ message: "Invalid email address." }), // Valid email format
  physicalAddress: z
    .string()
    .min(1, { message: "Physical address must not be empty." }),
  isWhatsappNumber: z.boolean().default(false),
});

export const addCustomerVehicleSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  vehicleId: z.string().min(1, "Please select a vehicle"),
  registrationNumber: z.string().min(1, "Please enter a registration number"),
  year: z.string().min(4, "Please enter a year"),
  colour: z.string().min(1, "Please enter a color"),
  engineNumber: z.string().min(1, "Please enter an engine number"),
  vinNumber: z.string().min(1, "Please enter a VIN number"),
  odometer: z.string().min(0, "Please enter an odometer reading"),
  isUnderWarranty: z.boolean().default(false),
});

export const QuotationSetupSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  customerVehicleId: z.string().min(1, "Please select customer vehicle"),
  branchId: z.string().min(1, "Please select a branch"),
  condition: z.string().min(1, "Please select vehicle condition"),
});
