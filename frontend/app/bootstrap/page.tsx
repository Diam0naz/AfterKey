"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createWallet } from "@/lib/wallet";
import { useAppStore } from "@/lib/store";

export default function BootstrapPage() {
  const router = useRouter();
  const { wallet, setWallet } = useAppStore();

  useEffect(() => {
    if (!wallet) {
      const newWallet = createWallet();
      setWallet(newWallet);
    }

    router.replace("/dashboard");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Initializing secure wallet…
    </div>
  );
}