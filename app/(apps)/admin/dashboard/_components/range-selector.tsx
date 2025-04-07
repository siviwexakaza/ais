import { Button } from "@/components/ui/button";
import React from "react";

function RangeSelector() {
  return (
    <div className="flex gap-2">
      <Button className="bg-slate-800">3 months</Button>
      <Button
        variant={"outline"}
        className="text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white"
      >
        6 months
      </Button>
      <Button
        variant={"outline"}
        className="text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white"
      >
        12 months
      </Button>
    </div>
  );
}

export default RangeSelector;
