"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QuoteDetails } from "@/lib/types";
import { Calendar, Car, File, Landmark, MapIcon, User } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";

function CustomerQuote({ quote }: { quote: QuoteDetails }) {
  const [quoteType, setSelectedQuoteType] = useState("");
  console.log("CLIENT QUOTE", quote);
  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <div>
          <Select
            onValueChange={(val) => {
              setSelectedQuoteType(val);
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="QuoteType" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="money">Money</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {}}>
          <File /> Download PDF
        </Button>
      </div>

      <div className="flex gap-8 mt-8">
        <div className="">
          <h1 className="text-xl font-bold">Details</h1>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex gap-2 items-center text-xs">
              <MapIcon />
              <div>
                <p>{quote.branch.name}</p>
                <p>{quote.branch.address}</p>
              </div>
            </div>

            <div className="flex gap-2 items-center text-xs">
              <User />
              <div>
                <p>
                  {quote.customer.firstName} {quote.customer.lastName}
                </p>
                <p>
                  {quote.customer.email} . {quote.customer.phoneNumber}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center text-xs">
              <Car />
              <div>
                <p>
                  {quote.vehicle.year} {quote.vehicle.vehicle.make}{" "}
                  {quote.vehicle.vehicle.model}
                </p>
                <p>
                  {quote.vehicle.registrationNumber} . {quote.vehicle.odometer}
                  KM
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center text-xs">
              <Calendar />
              <div>
                <p>{moment(quote.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
                <p>{moment(quote.createdAt).fromNow()}</p>
              </div>
            </div>
            {quote.customerInsurance && (
              <div className="flex gap-2 items-center text-xs">
                <Landmark />
                <div>
                  <p>
                    {quote.customerInsurance.insurer.name} . {quote.claimNumber}
                  </p>
                  <p>Ref {quote.clerkRef}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-4">
            {quote.pictures?.split(",").map((pic) => (
              <Image
                className="object-cover rounded-4xl"
                key={pic}
                src={pic}
                width={160}
                height={160}
                alt="pic"
              />
            ))}
          </div>
        </div>
        <div
          id="quote"
          className="flex-1 bg-[#FAFAFA] h-[75vh] w-full rounded-md"
        >
          <h1>Quotation</h1>
        </div>
      </div>

      <div className="mt-4">
        <div>
          <div>
            <Table>
              <TableHeader className="bg-slate-900">
                <TableRow>
                  <TableHead className="text-white">Operation</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">Markup</TableHead>
                  <TableHead className="text-white">Bett</TableHead>
                  <TableHead className="text-white">Qty</TableHead>
                  <TableHead className="text-white">Part</TableHead>
                  <TableHead className="text-white">Labour</TableHead>
                  <TableHead className="text-white">Paint</TableHead>
                  <TableHead className="text-white">Strip</TableHead>
                  <TableHead className="text-white">Frame</TableHead>
                  <TableHead className="text-white">Inhouse/Outwork</TableHead>
                  <TableHead className="text-white"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <Select onValueChange={(val) => {}}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Operation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Panel Beat">Panel Beat</SelectItem>
                        <SelectItem value="Engine Change">
                          Engine Change
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Button>Save</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerQuote;
