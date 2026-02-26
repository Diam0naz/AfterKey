"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";
import ParticleCanvas from "./ParticleCanvas";

const faqs = [
  {
    question: "Is my seed phrase really safe with you?",
    answer:
      "Yes. We use military-grade encryption and decentralized storage. Your seed phrase never leaves your device unencrypted, and only you or your verified trustee can decrypt it.",
  },
  {
    question: "What happens if I lose my email or device?",
    answer:
      "No worries. As long as you still control your registered trustee contacts, recovery is possible. We provide additional identity checks before granting access.",
  },
  {
    question: "How does trustee verification work?",
    answer:
      "You pre-select trusted individuals. In case of inactivity, death, or asset transfer, we notify and verify them using multi-step checks before access is granted.",
  },
  {
    question: "What if I don't want a trustee?",
    answer:
      "You can still use our solution as a personal recovery vault. The trustee option is for inheritance or emergencies, but it's not mandatory.",
  },
  {
    question: "Which blockchains and wallets do you support?",
    answer:
      "We are chain-agnostic and support all major wallets like MetaMask, Coinbase Wallet, and Ledger. Proof of storage and activity is recorded on-chain.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-10 md:py-32 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#11141f]">
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <ParticleCanvas />
      </div>
      <ScrollReveal className="text-center">
        <h2 className="font-bold text-4xl sm:text-5xl text-indigo-100 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-indigo-100/70 text-lg max-w-2xl mx-auto">
          Everything you need to know about securing, recovering, and inheriting
          your digital assets.
        </p>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto mt-16 space-y-6 relative z-10">
        {faqs.map((faq, index) => (
          <ScrollReveal key={index} delay={index * 0.07}>
            {}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full border border-indigo-500/40 rounded-xl overflow-hidden bg-gray-800/30 shadow-lg text-left transition-all duration-300 hover:bg-gray-800/50 group relative"
            >
              <div className="px-6 py-5 flex justify-between items-center text-indigo-100">
                <span className="font-medium text-lg group-hover:text-indigo-400 transition-colors">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FiChevronUp className="text-xl text-indigo-400" />
                ) : (
                  <FiChevronDown className="text-xl text-indigo-400" />
                )}
              </div>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-indigo-100/70">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-red-500 via-indigo-500 to-red-500 opacity-50"></span>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
