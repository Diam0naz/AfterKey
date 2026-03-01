"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount, isAccountDeployed } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Activity, Zap, ShieldAlert, Loader2 } from "lucide-react";

export default function RulesPage() {
  const { user, ready } = usePrivy();
  const [starkAccount, setStarkAccount] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready || !user) return;
    const { account } = getStarknetAccount(user.id);
    setStarkAccount(account);
  }, [ready, user]);

  async function pingActivity() {
    if (!starkAccount) return;
    setLoading(true);
    const toastId = toast.loading("Confirming your activity on-chain...");
    
    try {
      const deployed = await isAccountDeployed(starkAccount);
      if (!deployed) {
        toast.error("Account not deployed. Fund its address first.", { id: toastId });
        return;
      }

      const contract = getLegacyContract(starkAccount);
      if (!contract) throw new Error("Contract not found");

      await contract.ping_activity();
      toast.success("Activity pinged successfully! Counter reset.", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to ping activity. Check network status.", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  async function executeLegacy() {
    if (!starkAccount) return;
    setLoading(true);
    const toastId = toast.loading("Checking inheritance conditions...");
    
    try {
      const deployed = await isAccountDeployed(starkAccount);
      if (!deployed) {
        toast.error("Account not deployed. Fund its address first.", { id: toastId });
        return;
      }

      const contract = getLegacyContract(starkAccount);
      if (!contract) throw new Error("Contract not found");

      await contract.execute_legacy();
      toast.success("Legacy executed successfully! Assets migrating.", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Conditions not met or transaction failed.", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-16 px-4">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
          Legacy Rules
        </h1>
        <p className="text-slate-500 font-medium">
          Manage your Proof-of-Life and trigger asset distribution manually if required.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ping Activity Card */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl flex flex-col justify-between group hover:border-indigo-500/30 transition-all">
          <div className="space-y-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl w-fit">
              <Activity className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">Proof of Life</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Reset the inactivity timer by signing an on-chain heartbeat. This confirms your presence and keeps your vault locked.
            </p>
          </div>
          <button
            onClick={pingActivity}
            disabled={loading}
            className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Ping Activity"}
          </button>
        </div>

        {/* Execute Legacy Card */}
        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl flex flex-col justify-between group hover:border-green-500/30 transition-all">
          <div className="space-y-4">
            <div className="p-3 bg-green-500/10 rounded-2xl w-fit">
              <Zap className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">Force Execution</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Manually trigger the asset transfer to your designated beneficiaries. This will only work if the inactivity period has passed.
            </p>
          </div>
          <button
            onClick={executeLegacy}
            disabled={loading}
            className="mt-8 w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Execute Legacy"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
        <ShieldAlert className="text-amber-500 shrink-0" size={20} />
        <p className="text-xs text-amber-200/60 leading-relaxed italic">
          Manual execution is protected by smart contract constraints. If the threshold hasn't been met, the Starknet transaction will revert automatically.
        </p>
      </div>
    </div>
  );
}
