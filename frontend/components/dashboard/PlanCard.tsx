import { ReactNode } from "react";

interface PlanCardProps {
  name: string;
  duration: string;
  fee: string;
  icon: ReactNode;
  onActivate: () => void;
}

export default function PlanCard({ name, duration, fee, icon, onActivate }: PlanCardProps) {
  return (
    <div className="relative group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-white mb-2">{name} Protection</h4>
      <p className="text-slate-400 text-sm mb-6">Automated transfer after {duration} of total inactivity.</p>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-black text-white">{fee}</span>
        <span className="text-slate-500 font-medium">of total assets</span>
      </div>
      <button 
        onClick={onActivate}
        className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-900/20"
      >
        Activate Plan
      </button>
    </div>
  );
}
