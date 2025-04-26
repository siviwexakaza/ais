"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Cloud, CloudIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/admin/dashboard");
    }
  }, [isSignedIn]);
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex">
          {/* Left Side */}
          <div className="w-1/2 bg-gradient-to-br from-blue-600 via-blue-100 to-pink-100 flex flex-col p-36">
            <p className="text-4xl font-bold text-amber-50 max-w-md leading-tight">
              AIS
            </p>
            <p className="text-4xl font-bold text-amber-50 max-w-md leading-tight my-4">
              Your smart CRM for Seamless Operations & Better Customer
              Engagement
            </p>
            <Image
              src={"/dashboard.svg"}
              width={350}
              height={350}
              alt="image"
              className="mt-8"
            />
          </div>

          {/* Right Side */}
          <div className="w-1/2 bg-white flex items-center justify-center p-12">
            <div className="w-full max-w-md">
              <div className="w-full flex gap-2 justify-center items-center ">
                <CloudIcon color="#155dfc" size={40} />
                <p className="text-3xl font-bold text-slate-900 max-w-md leading-tight my-4">
                  AIS
                </p>
              </div>

              <div className="w-full flex flex-col gap-2 items-center mb-4">
                <p className="text-2xl font-bold text-slate-900 max-w-md leading-tight">
                  Welcome Back
                </p>
                <p className="text-md  text-slate-500 max-w-md leading-tight">
                  Please login to continue.
                </p>
              </div>
              <SignIn />
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
