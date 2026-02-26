export default function LogicSettings() {
  const settings = [
    { label: "Warning Duration", value: "30 Days before transfer" },
    { label: "Dormant Duration", value: "7 Days (Non-revocable)" },
    {
      label: "Trigger Events",
      value: "No TXs, No Heartbeat, No Votes",
      italic: true,
    },
  ];

  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-slate-900/40 border border-indigo-500/20 backdrop-blur-md">
      <h3 className="text-xl font-bold text-white mb-4">
        Programmable Logic Settings
      </h3>
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        {settings.map((s) => (
          <div key={s.label}>
            <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
              {s.label}
            </p>
            <p className={`text-slate-200 ${s.italic ? "italic" : ""}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
