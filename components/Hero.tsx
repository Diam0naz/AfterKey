"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <>
      <Navbar />
      {/* Container: Removed static bg image, added overflow-hidden and dark base color */}
      <div className="relative min-h-screen flex items-center justify-center py-8 px-4 sm:px-8 md:px-16 lg:px-24 bg-slate-950 text-white overflow-hidden">
        
        {/* Animated Background Element */}
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

        {/* Optional: Floating Blobs for extra depth */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"
        />

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-semibold mb-6"
            >
              If life changes, your secrets stay safe
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Assign trusted friends or family as recovery contacts, so your
              assets are safe no matter what happens.
            </motion.p>

            <Link
              href="/signup"
              className="inline-block bg-gradient-to-br from-indigo-700 to-indigo-500 px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base font-medium"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Image
                src="/coins.png"
                alt="Hero Image"
                width={600}
                height={400}
                className="rounded-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
