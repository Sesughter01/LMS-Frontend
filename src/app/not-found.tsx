"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl">Page Not Found</h2>
      <h3 className="my-4">Redirect back to the home Page</h3>
      <Button className="bg-[#1A183E]" onClick={() => router.push(`/`)}>Go Home</Button>
    </div>
  );
}
