import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlmostFinished from "@/public/work-is-almost-over-happy.gif";

const GrantIdRoute = () => {
  return (
    <div className="min-h-screen w-full grid md:grid-cols-2 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Left Side (Image) */}
      <div className="flex items-center justify-center p-8">
        <Image
          src={AlmostFinished}
          alt="Finish Setup"
          className="rounded-xl shadow-xl w-full max-w-md"
          priority
        />
      </div>

      {/* Right Side (Content) */}
      <div className="flex flex-col justify-center px-8 md:px-16 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-900">Final Step 🚀</h1>
        <p className="text-lg text-gray-700">
          You're one step away from unlocking your smart scheduling experience.
        </p>
        <div className="bg-indigo-100 p-4 rounded-lg shadow-inner">
          <p className="text-sm text-indigo-800">
            🔗 Let's connect your calendar and complete your onboarding.
          </p>
        </div>
        <Button asChild className="w-full md:w-fit">
          <Link href="/api/auth">
            <CalendarCheck2 className="size-4 mr-2" />
            Connect Calendar
          </Link>
        </Button>
        <p className="text-sm text-gray-500 italic mt-4">
          Don’t worry — we’ll never make changes to your calendar without asking.
        </p>
      </div>
    </div>
  );
};

export default GrantIdRoute;
