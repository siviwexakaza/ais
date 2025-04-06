"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { QuotationSetupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Assessor,
  Branch,
  Customer,
  CustomerInsurance,
  Insurer,
  Walkin,
} from "@prisma/client";
import Spinner from "@/components/spinner";
import { ManageCustomerDialog } from "../../../customers/_components/manage-customer-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getCustomerInsurances,
  getCustomerVehicles,
  searchCustomers,
} from "@/actions/customer/actions";
import { toast } from "sonner";
import UploadForm from "@/components/forms/image-upload-form";
import Image from "next/image";
import { ManageCustomerVehicleDialog } from "../../../customers/_components/manage-customer-vehicles-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBranches } from "@/actions/branch/actions";
import { getAssessors } from "@/actions/assessor/actions";
import { createWalkin } from "@/actions/walkin/actions";

type Inputs = z.infer<typeof QuotationSetupSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Client Information",
    fields: ["customerId"],
  },
  {
    id: "Step 2",
    name: "Vehicle Information",
    fields: ["customerVehicleId"],
  },
  {
    id: "Step 3",
    name: "Additional Information",
    fields: ["branchId", "condition"],
  },
];

export function CreateQuotationForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedCustomerVehicle, setSelectedCustomerVehicle] = useState<
    string | null
  >(null);
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [customnerVehicles, setCustomerVehicles] = useState<any[] | null>();
  const [pictureUrls, setPictureUrls] = useState<string[]>([]);
  const [vehicleNotes, setVehicleNotes] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [assessors, setAssessors] = useState<Assessor[]>([]);
  const [customerInsurances, setCustomerInsurances] = useState<
    (CustomerInsurance & { insurer: Insurer })[]
  >([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  // const [insuranceType, setInsuranceType] = useState("");
  // const [assessorType, setAssessorType] = useState("");
  const [selectedInsurerId, setSelectedInsurerId] = useState("");
  const [clerkRef, setClerkRef] = useState("");
  const [claimNumber, setClaimNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    unregister,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(QuotationSetupSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log("form", data);
    reset();
  };

  const searchCustomer = async () => {
    setIsLoading(true);
    try {
      const results = await searchCustomers(customerSearch.toLowerCase());
      setCustomers(results);
    } catch (error) {
      toast.error("Error searching for customers");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchCustomerVehicles = async () => {
    setIsLoading(true);
    try {
      const results = await getCustomerVehicles(selectedCustomer?.id || "");
      setCustomerVehicles(results);
    } catch (error) {
      toast.error("Error searching for customer vehicles");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchCustomerInsurers = async () => {
    setIsLoading(true);
    try {
      const results = await getCustomerInsurances(selectedCustomer?.id || "");
      setCustomerInsurances(results);
      console.log("Insurers", results);
    } catch (error) {
      toast.error("Error searching for customer insurance providers");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllAssessors = async () => {
    setIsLoading(true);
    try {
      const results = await getAssessors();
      setAssessors(results);
    } catch (error) {
      toast.error("Error searching for assessors");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    console.log("STEPS", steps.length, currentStep);
    if (currentStep + 1 === 3) {
      console.log("SUBMIT", getValues());

      const walkin = {
        customerId: selectedCustomer!.id,
        vehicleId: selectedCustomerVehicle!,
        branchId: selectedBranch!,
        customerInsuranceId: selectedInsurerId,
        claimNumber: claimNumber,
        pictures: pictureUrls.join(","),
        clerkRef: clerkRef,
        authorized: false,
        condition: "Repair",
        status: "PENDING",
      };

      const walkingResult = await createWalkin(walkin);
      console.log("WALIKI", walkingResult);
      //await handleSubmit(processForm)();
    }

    if (!output) return;

    if (currentStep == 0) {
      searchCustomerVehicles();
    }

    if (currentStep < steps.length - 1) {
      console.log("STEP", currentStep);

      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      if (currentStep - 1 === 0) {
        unregister("customerVehicleId");
        setSelectedCustomerVehicle(null);
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await getBranches();
      setBranches(res);
    };

    fetchBranches();
  }, []);

  return (
    <section className=" flex flex-col justify-between p-8">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-primary transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-primary">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="mt-6 py-4" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Client Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Select the client you want to create a quotation for.
            </p>

            {/* Customer search section */}
            <div className="w-full max-w-sm items-center space-x-2 my-12">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search for customer by ID Number"
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
                <Button
                  onClick={searchCustomer}
                  disabled={isLoading}
                  type="button"
                >
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Search />
                      Search
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Can't find the customer?{" "}
                <ManageCustomerDialog isButton={false} />
              </p>
            </div>
            {errors.customerId?.message && (
              <p className="mt-2 text-sm text-red-400">
                Please select a customer first.
              </p>
            )}

            {customers?.length === 0 ? (
              <div>
                <p>No customers found</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {/* Customer results section */}
                {customers?.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                  >
                    <div>
                      <Checkbox
                        checked={selectedCustomer?.id === c.id}
                        onCheckedChange={(val) => {
                          if (val) {
                            setSelectedCustomer(c);
                            register("customerId", { value: c.id });
                          } else {
                            setSelectedCustomer(null);
                            unregister("customerId");
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-1 leading-none">
                      <p className="font-semibold">
                        {c.firstName} {c.lastName}
                      </p>
                      <span className="text-sm text-gray-500">
                        ID Number: {c.idNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Vehicle Information */}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="font-semibold leading-7 text-gray-900 text-xl">
              {selectedCustomer?.firstName} {selectedCustomer?.lastName}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Add information about the vehicle.
            </p>

            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="flex flex-row mt-4 gap-4">
                <div className="flex-1">
                  <p className="text-base font-semibold leading-7 text-gray-900 mb-4">
                    Select Vehicle
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {customnerVehicles?.map((c) => (
                      <div
                        key={c.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                      >
                        <div>
                          <Checkbox
                            checked={selectedCustomerVehicle === c.id}
                            onCheckedChange={(val) => {
                              if (val) {
                                setSelectedCustomerVehicle(c.id);
                                register("customerVehicleId", { value: c.id });
                              } else {
                                setSelectedCustomerVehicle(null);
                                unregister("customerVehicleId");
                              }
                            }}
                          />
                        </div>
                        <div className="space-y-1 leading-none flex flex-col">
                          <p className="font-semibold">
                            {c.year} {c.vehicle.make} {c.vehicle.model}
                          </p>
                          <span className="text-sm text-gray-500">
                            Registration Number: {c.registrationNumber}
                          </span>
                          <span className="text-sm text-gray-500">
                            Colour: {c.colour}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Can't find the customer vehicle?{" "}
                    <ManageCustomerVehicleDialog
                      customerId={selectedCustomer?.id!}
                      isButton={false}
                      onResponse={(response) => {
                        if (response.success) {
                          searchCustomerVehicles();
                        }
                      }}
                    />
                  </p>
                  {errors.customerVehicleId?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      Please select the customers vehicle first.
                    </p>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-base font-semibold leading-7 text-gray-900 mb-4">
                    Upload Vehicle Pictures
                  </p>
                  <UploadForm
                    acceptFormats={{ "image/*": [] }} // audio/* or image/*
                    onUploadComplete={(result) => {
                      if (result.url) {
                        toast.success(
                          "Picture uploaded successfully. Now complete your profile."
                        );
                        let tempPicUrls = pictureUrls;
                        tempPicUrls.push(result.url);
                        setPictureUrls(tempPicUrls);
                        console.log(pictureUrls);
                      } else {
                        toast.error(
                          "Could not upload the picture. Please try again."
                        );
                      }
                    }}
                  />
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {pictureUrls.map((p, i) => (
                      <Image
                        className="rounded-md"
                        src={p}
                        width={150}
                        height={150}
                        alt="car"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Additional information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 mb-8">
              Pleaase verify the information and add info if needed.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mt-4 text-md font-semibold">
                    Insurance Provider
                  </p>
                  <Select
                    onValueChange={(val) => {
                      if (val === "insurance") searchCustomerInsurers();
                    }}
                  >
                    <SelectTrigger className="w-[280px] mt-4">
                      <SelectValue placeholder="Insurance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {customerInsurances.length > 0 && (
                  <>
                    <div>
                      <p className="mt-4 text-md font-semibold">
                        Select insurance provider
                      </p>
                      <Select
                        onValueChange={(val) => {
                          setSelectedInsurerId(val);
                        }}
                      >
                        <SelectTrigger className="w-[280px] mt-4">
                          <SelectValue placeholder="Insurance provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {customerInsurances.map((val, i) => (
                            <SelectItem key={i} value={val.id}>
                              {val.insurer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <p className="mt-4 text-md font-semibold">Claim Number</p>
                      <Input
                        className="w-[280px] mt-4"
                        placeholder="Claim number"
                        onChange={(e) => setClaimNumber(e.target.value)}
                      />
                    </div>

                    <div>
                      <p className="mt-4 text-md font-semibold">
                        Clerk Reference
                      </p>
                      <Input
                        className="w-[280px] mt-4"
                        placeholder="Clerk reference"
                        onChange={(e) => setClerkRef(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div>
                <p className="mt-4 text-md font-semibold">Assessor</p>
                <Select>
                  <SelectTrigger className="w-[280px] mt-4">
                    <SelectValue placeholder="Assessor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mt-4 text-md font-semibold">Branch</p>
                <Select
                  onValueChange={(val) => {
                    setSelectedBranch(val);
                  }}
                >
                  <SelectTrigger className="w-[280px] mt-4">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-4">
        <div className="flex gap-6 items-center">
          <Button onClick={prev} disabled={currentStep === 0}>
            <ChevronLeft /> Back
          </Button>
          <Button onClick={next}>
            Next <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
