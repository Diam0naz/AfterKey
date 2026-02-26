"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { FiStar } from "react-icons/fi";
import ParticleCanvas from "./ParticleCanvas";

const testimonials = [
  {
    name: "Alice Moreau",
    role: "Crypto Investor",
    avatar: "AM",
    avatarColor: "from-indigo-500 to-purple-600",
    rating: 5,
    text: "AfterKey gave me peace of mind knowing my digital assets are safe. The trustee system is genius — simple to set up, and I know my family is protected.",
  },
  {
    name: "Bob Chen",
    role: "Web3 Developer",
    avatar: "BC",
    avatarColor: "from-cyan-500 to-indigo-600",
    rating: 5,
    text: "Simple, transparent, and automated – exactly what I needed. The smart contract execution is flawless. No more worrying about lost keys or complicated wills.",
  },
  {
    name: "Sarah Williams",
    role: "DeFi Enthusiast",
    avatar: "SW",
    avatarColor: "from-purple-500 to-pink-600",
    rating: 5,
    text: "I've tried other solutions but AfterKey is in a league of its own. The on-chain audit trail gives me total confidence in the system.",
  },
  {
    name: "James Okafor",
    role: "Blockchain Consultant",
    avatar: "JO",
    avatarColor: "from-violet-500 to-cyan-600",
    rating: 5,
    text: "Finally a product that treats digital asset inheritance seriously. The UX is clean, the tech is solid, and the team clearly understands the problem.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#0b0f1a] relative overflow-hidden">
      {}
      <div className="absolute inset-0 bg-linear-to-b from-[#11141f] to-[#0b0f1a] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <ParticleCanvas />
      </div>
      <div className="relative">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-indigo-500/40 text-indigo-300 bg-indigo-500/10">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Trusted by crypto holders worldwide to protect their digital legacy.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280 }}
                className="relative flex flex-col h-full p-6 rounded-2xl border border-white/8 bg-linear-to-b from-white/5 to-white/2 backdrop-blur-sm hover:border-indigo-500/30 hover:from-white/8 transition-all duration-300 cursor-default">
                {}
                <div className="text-5xl text-indigo-500/20 font-serif leading-none mb-3 select-none">
                  &ldquo;
                </div>

                {}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <FiStar
                      key={si}
                      className="text-amber-400 fill-amber-400"
                      style={{ fill: "currentColor" }}
                      size={13}
                    />
                  ))}
                </div>

                {}
                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                  {t.text}
                </p>

                {}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className={`w-10 h-10 rounded-full bg-linear-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold leading-tight">
                      {t.name}
                    </div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>

                {}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent rounded-full" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="mt-14 text-center">
          <Link
            href="/signup"
            className="inline-block bg-indigo-600 px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)] text-white">
            Get Started Today
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
