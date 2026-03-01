"use client";
import { useState } from "react";
import { useCreateWallet, usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Wallet, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateWalletButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { createWallet } = useCreateWallet();
  const { authenticated, user } = usePrivy();
  const router = useRouter();

  const handleClick = async () => {
    if (!authenticated || !user) return toast.error("Please verify your email first.");

    if (user?.wallet) {
      toast.info("Wallet already exists. Redirecting...");
      return router.push("/dashboard");
    }

    setStatus("loading");
    const toastId = toast.loading("Generating your secure vault...");

    try {
      await createWallet();
      setStatus("success");
      toast.success("Vault created successfully!", { id: toastId });
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      toast.error(err.message || "Wallet creation failed.", { id: toastId });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <button
        onClick={handleClick}
        disabled={status !== "idle"}
        className={`w-full relative py-5 px-6 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl ${
          status === "idle"
            ? "bg-white text-black hover:bg-indigo-50 hover:scale-[1.02]"
            : status === "loading"
            ? "bg-slate-800 text-slate-400 cursor-wait"
            : status === "success"
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center justify-center gap-3"
          >
            {status === "idle" && <><Wallet size={18} /> Initialize Vault</>}
            {status === "loading" && <><Loader2 className="animate-spin" size={18} /> Creating...</>}
            {status === "success" && <><CheckCircle2 size={18} /> Success</>}
            {status === "error" && <><AlertTriangle size={18} /> Failed</>}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
