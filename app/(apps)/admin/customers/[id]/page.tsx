export const dynamic = "force-dynamic";

import { getCustomerById } from "@/actions/customer/actions";
import { notFound } from "next/navigation";
import { CustomerDetails } from "../_components/customer-details";

interface CustomerPageProps {
  params: {
    id: string;
  };
}

export default async function CustomerDetailsPage({
  params,
}: CustomerPageProps) {
  const customer = await getCustomerById(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">
        {customer.firstName} {customer.lastName}
      </h1>
      <p className="text-sm text-gray-500">
        Manage {customer.firstName}'s information, vehicles, quotations and
        insurance details
      </p>

      <CustomerDetails customer={customer} />
    </div>
  );
}
