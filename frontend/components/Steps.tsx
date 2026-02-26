"use client";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Connect Wallet",
    desc: "Sign up and connect your StarkNet wallet in seconds.",
    color: "from-indigo-500 to-indigo-700",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    number: "02",
    title: "Add Trustees",
    desc: "Select trusted friends or family and define execution rules.",
    color: "from-purple-500 to-purple-700",
    glow: "rgba(168,85,247,0.3)",
  },
  {
    number: "03",
    title: "Approve Legacy",
    desc: "Review and approve your complete legacy execution plan.",
    color: "from-violet-500 to-violet-700",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    number: "04",
    title: "Auto-Execute",
    desc: "Smart contracts execute your legacy when conditions are met.",
    color: "from-cyan-500 to-cyan-700",
    glow: "rgba(56,189,248,0.3)",
  },
];

export default function Steps() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 md:px-16 bg-[#0b0f1a] relative overflow-hidden">
      {}
      <div className="hidden md:block absolute top-1/2 left-[14%] right-[14%] h-px bg-linear-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 pointer-events-none" />

      <ScrollReveal className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          How AfterKey Works
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Four simple steps to protect everything you care about.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.13} direction="up">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 280 }}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-white/8 bg-white/3 hover:border-white/20 transition-colors duration-300 group"
              style={{
                boxShadow: `0 0 0 0 ${step.glow}`,
              }}
              whileInView={{
                boxShadow: [
                  `0 0 0px 0px ${step.glow}`,
                  `0 10px 40px 0px ${step.glow}`,
                ],
              }}
              viewport={{ once: true }}>
              {}
              <div
                className={`w-14 h-14 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg mb-5 shadow-lg`}>
                {step.number}
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
