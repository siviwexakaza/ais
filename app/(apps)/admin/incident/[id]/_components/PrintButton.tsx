"use client";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import React from "react";

function PrintButton() {
  return (
    <div className="flex justify-end">
      <Button
        onClick={() => {
          if (window !== undefined) {
            window.print();
          }
        }}
      >
        {" "}
        <PrinterIcon /> Print
      </Button>
    </div>
  );
}

export default PrintButton;
