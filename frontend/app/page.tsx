"use client";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhyTrustUs from "@/components/WhyTrustUs";
import Steps from "@/components/Steps";
import FAQs from "@/components/FAQs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <WhyTrustUs />
      <Steps />
      <FAQs />
      <Testimonials />
      <Footer />
    </>
  );
}
