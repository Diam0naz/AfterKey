export default function WhyTrustUs() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#11141f]">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Why Trust AfterKey?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { title: "Secure", desc: "All assets are managed by StarkNet smart contracts with multi-trustee governance." },
          { title: "Automated", desc: "No intermediaries, no lawyers – your legacy executes automatically." },
          { title: "Transparent", desc: "All operations are logged on-chain and fully auditable." },
        ].map((item) => (
          <div key={item.title} className="card p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}