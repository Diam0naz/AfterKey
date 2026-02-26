import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color?: string;
}

export default function StatsCard({ title, value, subtitle, icon, color = "text-white" }: StatsCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md hover:scale-[1.02] transition-transform shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <span className="text-slate-600">{icon}</span>
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );
}
