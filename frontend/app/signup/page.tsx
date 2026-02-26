"use client";
import Navbar from "@/components/Navbar";
import PrivySignUp from "@/components/SignInFlow/PrivySignUp";
import { motion } from "framer-motion";

export default function SignUpPage() {
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
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8"
          >
          </motion.div>
          
          <PrivySignUp />
        </div>
      </div>
    </>
  );
}
