import {
  Heart,
  House,
  Play,
  UserPlus2,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { ConversionRateStat } from "./_components/conversion-rate-stat";
import { QuotationsStats } from "./_components/quotation-stats";
import StatList from "./_components/stat-list";
import RangeSelector from "./_components/range-selector";
import { InventoryReport } from "./_components/inventory-report";
import { RepairReport } from "./_components/repair-status-stat";
import { TATReport } from "./_components/tat-stat";
import { PLPReport } from "./_components/plp-report";

export default function Page() {
  const cardData = [
    {
      title: "OVERALL INCOME",
      value: "190.6k",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: Wallet,
    },
    {
      title: "CUSTOMERS",
      value: "23",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: Users,
    },
    {
      title: "JOBS",
      value: "154",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: Wrench,
    },
    {
      title: "BRANCHES",
      value: "3",
      backgroundColor: "bg-slate-800",
      textColor: "#cbd5e1",
      Icon: House,
    },
  ];
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">An overview of your business</p>
      </div>

      <div className="mt-8">
        <StatList stats={cardData} />
      </div>

      <div className="my-8 w-full flex justify-end">
        <RangeSelector />
      </div>

      <div>
        <h1 className="font-semibold text-xl">Management Dashboard</h1>
        <div className="flex flex-row gap-2 mt-8">
          <div className="flex-1">
            <QuotationsStats />
          </div>
          <div className="flex-1">
            <ConversionRateStat />
          </div>

          <div className="flex-1">
            <InventoryReport />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="font-semibold text-xl">Workshop Dashboard</h1>
          <div className="flex flex-row gap-2 mt-8">
            <div className="flex-1">
              <RepairReport />
            </div>
            <div className="flex-1">
              <TATReport />
            </div>

            <div className="flex-1">
              <PLPReport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
