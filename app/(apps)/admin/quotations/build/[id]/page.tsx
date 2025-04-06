import { getWalkinById } from "@/actions/walkin/actions";
import CustomerQuote from "./_components/CustomerQuote";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const id = await params.id;
  const quotation = await getWalkinById(id);

  if (!quotation) {
    notFound();
  }

  console.log("WALKI", quotation);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Quotation</h1>
        <p className="text-sm text-gray-500">
          {quotation?.customer.firstName} {quotation?.customer.lastName}
        </p>
      </div>

      <CustomerQuote
        quote={{
          ...quotation,
          customerInsurance: quotation.customerInsurance || undefined,
        }}
      />
    </div>
  );
}
