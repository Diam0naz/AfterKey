"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount, isAccountDeployed } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Zap, AlertTriangle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
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

  if (!ready) return null;

  if (!authenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
        Please login first.
      </div>
    );
  }

  useEffect(() => {
    async function loadVaultData() {
      if (!user) return;

      try {
        const { account } = getStarknetAccount(user.id);
        setStarkAccount(account);

        const deployed = await isAccountDeployed(account);
        setAccountDeployed(deployed);

        if (!deployed) {
          console.warn("Account not deployed on-chain yet.");
          setLoading(false);
          return;
        }

        const contract = getLegacyContract(account);

        if (!contract) {
          console.warn("Contract not initialized.");
          return;
        }

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

    loadVaultData();
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-indigo-500">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
          <p className="text-slate-400 animate-pulse font-medium">
            Securing Vault Identity...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-10 p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            Vault Overview
          </h2>
          <p className="text-slate-500 mt-1">
            Logged in as:{" "}
            <span className="text-indigo-400">
              {user?.email?.address || "Authenticated User"}
            </span>
          </p>
        </div>
        <WalletAddress />
      </div>

      {!accountDeployed && (
        <div className="p-4 bg-amber-950/40 border border-amber-700/50 rounded-2xl flex items-start gap-3">
          <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="text-amber-200 font-semibold text-sm">Account Not Deployed</p>
            <p className="text-amber-300/70 text-xs mt-1">
              Your Starknet account doesn't exist on-chain yet. Deploy it first via Argent X or other wallet.
              Once deployed, the vault data will load automatically.
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

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Security Subscriptions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.name}
                {...plan}
                onActivate={() => {
                  if (!accountDeployed) {
                    alert("⚠️ Account not deployed yet. Fund your vault address first.");
                    return;
                  }

                  toast.promise(
                    (async () => {
                      const contract = getLegacyContract(starkAccount);
                      if (!contract) throw new Error("Contract not initialized");

                      await contract.subscribe_plan(plan.name.toLowerCase());
                      return "Plan activated!";
                    })(),
                    {
                      loading: `Activating ${plan.name}...`,
                      success: `✅ ${plan.name} plan activated!`,
                      error: (err: any) => `❌ Failed to activate plan: ${err?.message || err}`,
                    }
                  );
                }}
              />
            ))}
          </div>
      </div>
      <LogicSettings />
    </motion.div>
  );
}
