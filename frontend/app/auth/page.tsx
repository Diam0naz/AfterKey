"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HandleLogin from "@/components/HandleLogin";
import Navbar from "@/components/Navbar";

export default function AuthPage() {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.replace("/bootstrap");
    }
  }, [ready, authenticated, router]);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-white overflow-hidden">
        
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, #1e1b4b 0%, #020617 100%)",
              "radial-gradient(circle at 80% 70%, #1e1b4b 0%, #020617 100%)",
              "radial-gradient(circle at 20% 30%, #1e1b4b 0%, #020617 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-lg mx-auto"
        >
          <HandleLogin />
        </motion.div>
      </div>
    </>
  );
}
