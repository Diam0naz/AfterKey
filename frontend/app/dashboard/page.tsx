"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount, isAccountDeployed } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Zap, AlertTriangle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import WalletAddress from "@/components/Wallet/WalletAddress";
import StatsCard from "@/components/dashboard/StatsCard";
import PlanCard from "@/components/dashboard/PlanCard";
import LogicSettings from "@/components/dashboard/LogicSettings";

export default function Dashboard() {
  const { user, ready, authenticated } = usePrivy();

  const [starkAccount, setStarkAccount] = useState<any>(null);
  const [accountDeployed, setAccountDeployed] = useState(false);
  const [status, setStatus] = useState({
    executed: false,
    approvals: 0,
    required: 0,
    deadline: 0,
  });
  const [loading, setLoading] = useState(true);

  const PLANS = [
    { name: "Silver", duration: "6 Months", fee: "3%", icon: <Clock className="text-blue-400" /> },
    { name: "Gold", duration: "1 Year", fee: "5%", icon: <Shield className="text-indigo-400" /> },
    { name: "Diamond", duration: "3 Years", fee: "12%", icon: <Zap className="text-purple-400" /> },
  ];

  useEffect(() => {
    async function loadVaultData() {
      if (!user) return;

      try {
        const { account } = getStarknetAccount(user.id);
        setStarkAccount(account);

        const deployed = await isAccountDeployed(account);
        setAccountDeployed(deployed);

        if (!deployed) {
          setLoading(false);
          return;
        }

        const contract = getLegacyContract(account);
        if (!contract) return;

        const res = await contract.get_status();

        const data = Array.isArray(res)
          ? {
              executed: Boolean(res[0]),
              approvals: Number(res[1] || 0),
              required: Number(res[2] || 0),
              deadline: Number(res[3] || 0),
            }
          : {
              executed: Boolean(res.executed),
              approvals: Number(res.approvals ?? 0),
              required: Number(res.required_approvals ?? res.required ?? 0),
              deadline: Number(res.execution_deadline ?? res.deadline ?? 0),
            };

        setStatus(data);
      } catch (err) {
        console.error("Failed to fetch vault status:", err);
      } finally {
        setLoading(false);
      }
    }

    if (ready && authenticated) loadVaultData();
  }, [user, ready, authenticated]);

  if (!ready) return null;

  if (!authenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4">
        <Shield className="text-indigo-500 animate-pulse" size={48} />
        <p className="font-bold tracking-tight">Access Restricted. Please login.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-indigo-500" size={40} />
          <p className="text-slate-400 animate-pulse font-medium tracking-widest uppercase text-xs">
            Securing Vault Identity...
          </p>
        </div>
      </div>
    );
  }

  const handlePlanActivation = async (planName: string) => {
    if (!accountDeployed) {
      toast.error("Account not deployed. Fund your vault address to activate plans.");
      return;
    }

    const toastId = toast.loading(`Initiating ${planName} subscription...`);

    try {
      const contract = getLegacyContract(starkAccount);
      if (!contract) throw new Error("Contract not initialized");

      await contract.subscribe_plan(planName.toLowerCase());
      toast.success(`${planName} plan activated successfully!`, { id: toastId });
    } catch (err: any) {
      toast.error(`Activation failed: ${err?.message || "Transaction reverted"}`, { id: toastId });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-10 p-6 pb-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
            Vault Overview
          </h2>
          <div className="flex items-center gap-2 mt-1">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <p className="text-slate-500 text-sm font-medium">
               Secure Session: <span className="text-indigo-400/80">{user?.email?.address}</span>
             </p>
          </div>
        </div>
        <WalletAddress />
      </div>

      {!accountDeployed && (
        <div className="p-6 rounded-[2rem] bg-amber-950/20 border border-amber-700/30 flex items-start gap-4 backdrop-blur-md">
          <div className="p-2 bg-amber-500/10 rounded-xl">
            <AlertCircle className="text-amber-500" size={24} />
          </div>
          <div>
            <p className="text-amber-200 font-bold">Action Required: Account Deployment</p>
            <p className="text-amber-300/60 text-xs mt-1 leading-relaxed max-w-2xl">
              Your Starknet Smart Account is currently in a "Counterfactual" state. To enable full legacy protection, 
              please fund your address. Deployment will trigger automatically upon receipt of STRK/ETH.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Vault Status"
          value={status.executed ? "Executed" : "Protected"}
          icon={<Shield size={18} />}
          color={status.executed ? "text-green-400" : "text-indigo-400"}
        />
        <StatsCard
          title="Trustee Approvals"
          value={`${status.approvals} / ${status.required}`}
          icon={<Zap size={18} />}
        />
        <StatsCard
          title="Heartbeat"
          value="Healthy"
          subtitle="Last ping: 5 days ago"
          icon={<Clock size={18} />}
          color="text-green-400"
        />
        <StatsCard
          title="Next Deadline"
          value={
            status.deadline > 0
              ? new Date(status.deadline * 1000).toLocaleDateString()
              : "No Deadline"
          }
          icon={<AlertTriangle size={18} />}
          color="text-yellow-500"
        />
      </div>

      <div className="space-y-8 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-black text-white tracking-tight">Security Subscriptions</h3>
          <p className="text-slate-500 text-sm">Automated protocol parameters for asset distribution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.name}
                {...plan}
                onActivate={() => handlePlanActivation(plan.name)}
              />
            ))}
          </div>
      </div>
      <LogicSettings />
    </motion.div>
  );
}
