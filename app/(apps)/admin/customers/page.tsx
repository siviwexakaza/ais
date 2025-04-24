export const dynamic = "force-dynamic";

import { getCustomers } from "@/actions/customer/actions";
import { CustomersTable } from "./_components/customers-table";
import { ManageCustomerDialog } from "./_components/manage-customer-dialog";
export default async function Page() {
  const customers = await getCustomers();
  console.log("Customers", customers);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Customers</h1>
      <p className="text-sm text-gray-500">
        Manage your customers all in one place
      </p>

      <div className="flex justify-end">
        <ManageCustomerDialog />
      </div>
      <CustomersTable customers={customers} />
    </div>
  );
}
