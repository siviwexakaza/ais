export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Quotation</h1>
        <p className="text-sm text-gray-500"></p>
      </div>
    </div>
  );
}
