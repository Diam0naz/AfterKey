export default function Steps() {
  const steps = [
    "Sign up and connect your wallet",
    "Add trustees and define execution rules",
    "Approve legacy execution",
    "Automatically execute legacy when conditions are met",
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#0b0f1a]">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        How AfterKey Works
      </h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="card p-6 text-center">
            <div className="text-purple-400 text-2xl font-bold mb-2">Step {i + 1}</div>
            <p className="text-gray-300">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}