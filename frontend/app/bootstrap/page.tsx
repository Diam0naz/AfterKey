"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

export default function BootstrapPage() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && authenticated) {
      router.replace("/dashboard");
    }
  }, [ready, authenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-medium">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-4"></div>
      Syncing secure identity...
    </div>
  );
}