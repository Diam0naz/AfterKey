"use client";
import { ShieldAlert, Key, BellRing } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Security Settings</h1>
        <p className="text-slate-500 mt-1">Configure your automated inheritance parameters.</p>
      </div>

      <div className="grid gap-6">
        <SettingCard icon={<Key className="text-indigo-400"/>} title="Identity Recovery" description="Managed via Privy email authentication." action="Verified"/>
        <SettingCard icon={<ShieldAlert className="text-yellow-400"/>} title="Inactivity Trigger" description="Current threshold: 6 Months (Silver Plan)" action="Manage"/>
        <SettingCard icon={<BellRing className="text-blue-400"/>} title="Email Alerts" description="Send warnings 30 days before asset transfer." action="Active"/>
      </div>
      
      <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 italic text-sm text-slate-400">
        "AfterKey uses programmable Smart Accounts to ensure your assets are never lost, even if you lose access to your primary device."
      </div>
    </div>
  );
}

function SettingCard({ icon, title, description, action }: any) {
  return (
    <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-950 rounded-xl">{icon}</div>
        <div>
          <h4 className="text-white font-bold">{title}</h4>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors uppercase tracking-widest">{action}</button>
    </div>
  );
}
