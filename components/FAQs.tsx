export default function FAQs() {
  const faqs = [
    { q: "Is AfterKey safe?", a: "Yes! All operations are executed via audited smart contracts." },
    { q: "Can I change trustees?", a: "Absolutely. You can add or remove trustees anytime." },
    { q: "Do I need crypto experience?", a: "No, we guide you through wallet setup and onboarding." },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#11141f]">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">FAQs</h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((f, i) => (
          <details key={i} className="card p-4">
            <summary className="font-semibold cursor-pointer">{f.q}</summary>
            <p className="mt-2 text-gray-300">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}