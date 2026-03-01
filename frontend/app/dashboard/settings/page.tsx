"use client";
import { ShieldAlert, Key, BellRing } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Security Settings
        </h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base font-medium">
          Configure your automated inheritance parameters.
        </p>
      </header>

      <div className="grid gap-4 md:gap-6">
        <SettingCard
          icon={<Key className="text-indigo-400" />}
          title="Identity Recovery"
          description="Managed via Privy email authentication."
          action="Verified"
          onClick={() => toast.info("Identity Recovery is active via Privy authentication.")}
        />
        <SettingCard
          icon={<ShieldAlert className="text-yellow-400" />}
          title="Inactivity Trigger"
          description="Current threshold: 6 Months (Silver Plan)"
          action="Manage"
          onClick={() => toast.warning("Inactivity Trigger settings are coming soon to the Silver Plan.")}
        />
        <SettingCard
          icon={<BellRing className="text-blue-400" />}
          title="Email Alerts"
          description="Send warnings 30 days before asset transfer."
          action="Active"
          onClick={() => toast.success("Email alerts are currently active and monitoring your vault.")}
        />
      </div>

      <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 italic text-xs md:text-sm text-slate-400 leading-relaxed shadow-inner">
        "AfterKey uses programmable Smart Accounts to ensure your assets are never lost, even if you lose access to your primary device."
      </div>
    </div>
  );
}

function SettingCard({ icon, title, description, action, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md hover:bg-slate-900/60 hover:border-indigo-500/30 hover:scale-[1.01] cursor-pointer transition-all duration-300 gap-4 shadow-xl"
    >
      <div className="flex items-start sm:items-center gap-4">
        {}
        <div className="p-3 bg-slate-950/80 rounded-xl flex-shrink-0 group-hover:bg-slate-950 transition-colors shadow-lg">
          {icon}
        </div>
        <div className="space-y-1">
          <h4 className="text-white font-bold leading-none tracking-tight group-hover:text-indigo-300 transition-colors">
            {title}
          </h4>
          <p className="text-slate-500 text-sm leading-snug font-medium">{description}</p>
        </div>
      </div>
    
      {}
      <button className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-slate-800/80 group-hover:bg-indigo-600 group-hover:text-white text-slate-300 text-[10px] sm:text-xs font-black rounded-xl transition-all uppercase tracking-widest text-center shadow-md">
        {action}
      </button>
    </div>
  );
}
