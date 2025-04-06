import { ConversionRateStat } from "./_components/conversion-rate-stat";
import { QuotationsStats } from "./_components/quotation-stats";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">An overview of your business</p>
      </div>

      <div className="flex flex-row gap-2 mt-8">
        <div className="flex-1">
          <QuotationsStats />
        </div>
        <div className="flex-1">
          <ConversionRateStat />
        </div>
      </div>
    </div>
  );
}
