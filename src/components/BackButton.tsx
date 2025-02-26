"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const BackToHome = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => router.push("/products/1")}
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </Button>
  );
};

export default BackToHome;
