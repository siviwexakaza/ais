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

export const addBrandSchema = z.object({
  name: z.string().min(2, {
    message: "Brand name is required",
  }),
  logo: z.string().min(2, {
    message: "Brand logo is required",
  }),
});

export const addCustomerVehicleSchema = z.object({
  model: z.string().min(1, {
    message: "Vehicle model is required",
  }),
  registrationNumber: z.string().min(1, {
    message: "Registration number is required",
  }),
  engineNumber: z.string().min(1, {
    message: "Engine number is required",
  }),
  customerId: z.string().uuid({
    message: "Valid customer ID is required",
  }),
  brandId: z.string().uuid({
    message: "Valid brand ID is required",
  }),
});

export const addPartCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
});

export const addDocumentSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  url: z.string().min(1, {
    message: "Image is required",
  }),
  customerId: z.string().min(1, {
    message: "Customer Id required",
  }),
});

export const addPartSchema = z.object({
  model: z.string().min(1, {
    message: "Model is required",
  }),
  picture: z.string().min(1, {
    message: "Picture is required",
  }),
  condition: z.string().min(1, {
    message: "Condition is required",
  }),
  make: z.string().min(1, {
    message: "Make is required",
  }),
  quantity: z.string().min(1, {
    message: "Quantity must be at least 1",
  }),
  name: z.string().min(1, {
    message: "Part name is required",
  }),
  brandId: z.string().uuid({
    message: "Valid brand ID is required",
  }),
  branchId: z.string().uuid({
    message: "Valid branch ID is required",
  }),
  partCategoryId: z.string().uuid({
    message: "Category is required",
  }),
  price: z.string().min(1, {
    message: "Price must be a positive number",
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

export const addIncidentSchema = z.object({
  licenseDisk: z.string().min(1, { message: "License disk is required" }),
  numberPlateFront: z
    .string()
    .min(1, { message: "Front plate photo is required" }),
  frontView: z.string().min(1, { message: "Front view is required" }),
  numberPlateRear: z
    .string()
    .min(1, { message: "Rear plate photo is required" }),
  rearView: z.string().min(1, { message: "Rear view is required" }),
  leftSide: z.string().min(1, { message: "Left side photo is required" }),
  rightSide: z.string().min(1, { message: "Right side photo is required" }),
  dashboard: z.string().min(1, { message: "Dashboard photo is required" }),
  interiorSeating: z
    .string()
    .min(1, { message: "Interior seating photo is required" }),
  bootSpace: z.string().min(1, { message: "Boot space photo is required" }),
  rearBumber: z.string().min(1, { message: "Rear bumper photo is required" }),
  engineBay: z.string().min(1, { message: "Engine bay photo is required" }),
  damageArea: z.string().min(1, { message: "Damage area photo is required" }),
  closeUpOfDamage: z
    .string()
    .min(1, { message: "Close-up of damage is required" }),
  notes: z.string(),

  customerId: z.string().uuid({ message: "Valid customer ID is required" }),
  vehicleId: z.string().uuid({ message: "Valid vehicle ID is required" }),
});

export const QuotationSetupSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  customerVehicleId: z.string().min(1, "Please select customer vehicle"),
  branchId: z.string().min(1, "Please select a branch"),
  condition: z.string().min(1, "Please select vehicle condition"),
});
