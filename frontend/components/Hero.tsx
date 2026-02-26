"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
  return (
    <>
      <Navbar />
      {/* Hero wrapper — particles sit at z-0, content at z-10 */}
      <div className="relative min-h-screen flex items-center justify-center py-8 px-4 sm:px-8 md:px-16 lg:px-24 bg-slate-950 text-white overflow-hidden">
        {/* ── Top-left slanted divider — inverse of bottom slant ── */}
        <div
          className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none lg:block hidden"
          style={{ zIndex: 20 }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-32 md:h-40"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1440,0 L0,80 Z" fill="#020617" />
          </svg>
        </div>
        <div
          className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none lg:hidden block "
          style={{ zIndex: 20 }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-25 md:h-20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1440,0 L0,80 Z" fill="#020617" />
          </svg>
        </div>
        {/* ── Layer 0: animated radial bg ── */}

        <motion.div
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, #1e1b4b 0%, #020617 100%)",
              "radial-gradient(circle at 80% 70%, #1e1b4b 0%, #020617 100%)",
              "radial-gradient(circle at 20% 30%, #1e1b4b 0%, #020617 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* ── Layer 1: Floating particles ── */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <ParticleCanvas />
        </div>

        {/* ── Layer 2: glow orbs ── */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"
          style={{ zIndex: 3 }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-purple-700/15 rounded-full blur-[100px] pointer-events-none"
          style={{ zIndex: 3 }}
        />

        {/* ── Layer 3: Hero content ── */}
        <div
          className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 pt-16 lg:gap-16 items-center"
          style={{ zIndex: 10 }}>
          {/* Left: headline + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left ">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-indigo-500/50 text-indigo-300 bg-indigo-500/10">
              Built on StarkNet
            </motion.span>

            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              If life changes,{" "}
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                your secrets stay safe
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Assign trusted friends or family as recovery contacts, so your
              assets are safe no matter what happens.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/signup"
                className="inline-block bg-linear-to-br from-indigo-600 to-purple-600 px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] text-sm sm:text-base font-semibold">
                Get Started →
              </Link>
              <Link
                href="#how-it-works"
                className="inline-block px-8 py-3 rounded-xl border border-white/10 text-gray-300 hover:border-indigo-500/50 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium">
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="relative rounded-2xl overflow-hidden ">
                
              <Image
                src="/coins.png"
                alt="Hero Image"
                width={600}
                height={400}
                className="rounded-2xl hover:scale-105 transition-all duration-500 hidden lg:block"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Slanted bottom divider ── */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none lg:block hidden"
          style={{ zIndex: 20 }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-32 md:h-30"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 L1440,0 L1440,80 Z" fill="#0b0f1a" />
          </svg>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none lg:hidden block"
          style={{ zIndex: 20 }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-20 md:h-30"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 L1440,0 L1440,80 Z" fill="#0b0f1a" />
          </svg>
        </div>
      </div>
    </>
  );
}
