"use client";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiShield, FiZap, FiEye } from "react-icons/fi";

const features = [
  {
    icon: <FiShield className="text-2xl text-indigo-400" />,
    title: "Secure",
    desc: "All assets are managed by StarkNet smart contracts with multi-trustee governance.",
  },
  {
    icon: <FiZap className="text-2xl text-purple-400" />,
    title: "Automated",
    desc: "No intermediaries, no lawyers – your legacy executes automatically.",
  },
  {
    icon: <FiEye className="text-2xl text-cyan-400" />,
    title: "Transparent",
    desc: "All operations are logged on-chain and fully auditable.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#11141f] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why Trust AfterKey?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Built with transparency and security at every layer.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.12} direction="up">
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:border-indigo-500/40 hover:bg-white/6 transition-colors duration-300 text-center cursor-default">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    
    </section>
  );
}
