"use client";
import { motion } from "framer-motion";
import { useConnect } from "@starknet-react/core";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhyTrustUs from "@/components/WhyTrustUs";
import Steps from "@/components/Steps";
import FAQs from "@/components/FAQs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { connect, connectors } = useConnect();

  return (
    <>
      <Navbar />
      <Hero />

      <section className="py-12 flex justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-cyan-600 hover:opacity-90 transition font-semibold"
            >
              Connect {connector.name}
            </button>
          ))}
        </motion.div>
      </section>

      <Problem />
      <WhyTrustUs />
      <Steps />
      <FAQs />
      <Testimonials />
      <Footer />
    </>
  );
}