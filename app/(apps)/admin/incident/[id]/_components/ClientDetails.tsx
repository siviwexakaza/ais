"use client";
import { Button } from "@/components/ui/button";
import { CustomerDocument } from "@prisma/client";
import { Download, File } from "lucide-react";
import React from "react";

function ClientDetails({ documents }: { documents: CustomerDocument[] }) {
  return (
    <div className="mt-8 flex flex-col gap-8">
      {documents.map((doc) => (
        <div className="w-full rounded-md shadow flex justify-between p-4">
          <div className="flex gap-2 items-center">
            <File />
            <p>{doc.name}</p>
          </div>
          <a href={doc.url} download>
            <Button variant="ghost">
              <Download />
            </Button>
          </a>
        </div>
      ))}
    </div>
  );
}

export default ClientDetails;
