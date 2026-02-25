"use client";
import { useAccount, useProvider } from "@starknet-react/core";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Zap, AlertTriangle } from "lucide-react";
import WalletAddress from "@/components/Wallet/WalletAddress";
import StatsCard from "@/components/dashboard/StatsCard";
import PlanCard from "@/components/dashboard/PlanCard";
import LogicSettings from "@/components/dashboard/LogicSettings";

export default function Dashboard() {
  const { account } = useAccount();
  const { provider } = useProvider();
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const PLANS = [
    { name: "Silver", duration: "6 Months", fee: "3%", icon: <Clock className="text-blue-400" /> },
    { name: "Gold", duration: "1 Year", fee: "5%", icon: <Shield className="text-indigo-400" /> },
    { name: "Diamond", duration: "3 Years", fee: "12%", icon: <Zap className="text-purple-400" /> },
  ];

  useEffect(() => {
    async function loadStatus() {
      const target = account || provider;
      if (!target) return;
      try {
        const contract = getLegacyContract(target);
        const res = await contract.get_status();
        setStatus({
          executed: res[0],
          approvals: Number(res[1]),
          required: Number(res[2]),
          deadline: Number(res[3]),
        });
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    loadStatus();
  }, [account, provider]);
  if (loading) return <div className="h-screen flex items-center justify-center text-indigo-500">Initializing...</div>;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">Vault Overview</h2>
          <p className="text-slate-500 mt-1">Manage programmable inheritance triggers.</p>
        </div>
        <WalletAddress />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Vault Status" value={status?.executed ? "Executed" : "Protected"} icon={<Shield size={18}/>} color={status?.executed ? "text-green-400" : "text-indigo-400"} />
        <StatsCard title="Trustee Approvals" value={`${status?.approvals} / ${status?.required}`} icon={<Zap size={18}/>} />
        <StatsCard title="Activity Heartbeat" value="Healthy" subtitle="Last ping: 5 days ago" icon={<Clock size={18}/>} color="text-green-400" />
        <StatsCard title="Next Deadline" value={new Date(status?.deadline * 1000).toLocaleDateString()} icon={<AlertTriangle size={18}/>} color="text-yellow-500" />
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Security Subscriptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} {...plan} onActivate={() => console.log(`Activating ${plan.name}`)} />
          ))}
        </div>
      </div>
      <LogicSettings />
    </motion.div>
  );
}
