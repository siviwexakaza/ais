import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IncidentExtendedDetails } from "@/lib/types";
import moment from "moment";
import Image from "next/image";
import React from "react";

type Props = IncidentExtendedDetails;

type ImageField =
  | "licenseDisk"
  | "numberPlateFront"
  | "frontView"
  | "numberPlateRear"
  | "rearView"
  | "leftSide"
  | "rightSide"
  | "dashboard"
  | "interiorSeating"
  | "bootSpace"
  | "rearBumber"
  | "engineBay"
  | "damageArea"
  | "closeUpOfDamage";

const IMAGE_FIELDS: { key: ImageField; label: string }[] = [
  { key: "licenseDisk", label: "License Disk" },
  { key: "numberPlateFront", label: "Front Number Plate" },
  { key: "frontView", label: "Front View" },
  { key: "numberPlateRear", label: "Rear Number Plate" },
  { key: "rearView", label: "Rear View" },
  { key: "leftSide", label: "Left Side" },
  { key: "rightSide", label: "Right Side" },
  { key: "dashboard", label: "Dashboard" },
  { key: "interiorSeating", label: "Interior Seating" },
  { key: "bootSpace", label: "Boot Space" },
  { key: "rearBumber", label: "Rear Bumper" },
  { key: "engineBay", label: "Engine Bay" },
  { key: "damageArea", label: "Damage Area" },
  { key: "closeUpOfDamage", label: "Close-up of Damage" },
];

function IncidentDetails(props: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-semibold">First Name</p>
                <p>{props.customer.firstName}</p>
              </div>
              <hr />
            </div>

            <div>
              <div className="flex justify-between my-2">
                <p className="font-semibold">Last Name</p>
                <p>{props.customer.lastName}</p>
              </div>
              <hr />
            </div>

            <div>
              <div className="flex justify-between my-2">
                <p className="font-semibold">ID Number</p>
                <p>{props.customer.idNumber}</p>
              </div>
              <hr />
            </div>

            <div>
              <div className="flex justify-between my-2">
                <p className="font-semibold">Phone Number</p>
                <p>{props.customer.phoneNumber}</p>
              </div>
              <hr />
            </div>

            <div>
              <div className="flex justify-between my-2">
                <p className="font-semibold">
                  This number can be used for whatsapp
                </p>
                <p>{props.customer.isWhatsappNumber ? "Yes" : "No"}</p>
              </div>
              <hr />
            </div>

            <div>
              <div className="flex justify-between my-2">
                <p className="font-semibold">Email</p>
                <p>{props.customer.email}</p>
              </div>
              <hr />
            </div>

            <div>
              <div className="flex justify-between my-2">
                <p className="font-semibold">Physical Address</p>
                <p>{props.customer.physicalAddress}</p>
              </div>
              <hr />
            </div>

            <div>
              <div className="flex justify-between my-2">
                <p className="font-semibold">Created At</p>
                <p>{moment(props.createdAt).format("DD MMMM YYYY")}</p>
              </div>
              <hr />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
              <h1>Developemnt in progress</h1>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {IMAGE_FIELDS.map(({ key, label }) => {
              const url = props[key];
              if (!url) return null;

              return (
                <div key={key} className="flex flex-col items-center">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={url}
                      alt={label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm text-center text-gray-700 font-medium">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default IncidentDetails;
