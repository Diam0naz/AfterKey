"use client";
import ScrollReveal from "./ScrollReveal";

export default function Problem() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#0b0f1a] relative">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-red-500/40 text-red-400 bg-red-500/10">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Billions in digital assets are lost every year
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Many people never get to see their digital assets or have their
            final instructions executed. AfterKey solves this by providing
            automated, smart contract-driven legacy execution — no lawyers, no
            delays.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { value: "$140B+", label: "Lost in unclaimed crypto" },
            { value: "83%", label: "Families lack a crypto plan" },
            { value: "0 sec", label: "AfterKey execution delay" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="text-4xl font-bold text-red-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
