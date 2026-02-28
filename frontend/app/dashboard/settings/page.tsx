"use client";
import { ShieldAlert, Key, BellRing } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Security Settings</h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Configure your automated inheritance parameters.
        </p>
      </header>

      <div className="grid gap-4 md:gap-6">
        <SettingCard
          icon={<Key className="text-indigo-400" />}
          title="Identity Recovery"
          description="Managed via Privy email authentication."
          action="Verified"
          onClick={() => alert("Identity Recovery is active via Privy")}
        />
        <SettingCard
          icon={<ShieldAlert className="text-yellow-400" />}
          title="Inactivity Trigger"
          description="Current threshold: 6 Months (Silver Plan)"
          action="Manage"
          onClick={() => alert("Inactivity Trigger settings coming soon")}
        />
        <SettingCard
          icon={<BellRing className="text-blue-400" />}
          title="Email Alerts"
          description="Send warnings 30 days before asset transfer."
          action="Active"
          onClick={() => alert("Email alerts are active")}
        />
      </div>

      <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 italic text-sm text-slate-400 leading-relaxed">
        "AfterKey uses programmable Smart Accounts to ensure your assets are never lost, even if you lose access to your primary device."
      </div>
    </div>
  );
}

function SettingCard({ icon, title, description, action, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md hover:bg-slate-900/60 cursor-pointer transition-all gap-4"
    >
      <div className="flex items-start sm:items-center gap-4">
        {}
        <div className="p-3 bg-slate-950 rounded-xl flex-shrink-0">
          {icon}
        </div>
        <div className="space-y-1">
          <h4 className="text-white font-bold leading-none">{title}</h4>
          <p className="text-slate-500 text-sm leading-snug">{description}</p>
        </div>
      </div>
      
      {}
      <button className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] sm:text-xs font-bold rounded-lg transition-colors uppercase tracking-widest text-center">
        {action}
      </button>
    </div>
  );
}
