export default function Testimonials() {
  const testimonials = [
    { name: "Alice", text: "AfterKey gave me peace of mind knowing my digital assets are safe." },
    { name: "Bob", text: "Simple, transparent, and automated – exactly what I needed." },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#0b0f1a] text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">What People Say</h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="card p-6 text-gray-300">
            <p className="mb-4">"{t.text}"</p>
            <span className="font-semibold text-white">- {t.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <a href="#signup" className="btn-purple px-8 py-3 rounded-lg">
          Get Started
        </a>
      </div>
    </section>
  );
}