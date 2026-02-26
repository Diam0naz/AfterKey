"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Zap, AlertTriangle } from "lucide-react";
import WalletAddress from "@/components/Wallet/WalletAddress";
import StatsCard from "@/components/dashboard/StatsCard";
import PlanCard from "@/components/dashboard/PlanCard";
import LogicSettings from "@/components/dashboard/LogicSettings";

type Address = BigInt;

export default function Dashboard() {
  const { user, ready } = usePrivy();
  const [starkAccount, setStarkAccount] = useState<any>(null);
  const [status, setStatus] = useState({
    executed: false,
    approvals: 0,
    required: 0,
    deadline: 0,
  });
  const [loading, setLoading] = useState(true);

  const PLANS = [
    {
      name: "Silver",
      duration: "6 Months",
      fee: "3%",
      icon: <Clock className="text-blue-400" />,
    },
    {
      name: "Gold",
      duration: "1 Year",
      fee: "5%",
      icon: <Shield className="text-indigo-400" />,
    },
    {
      name: "Diamond",
      duration: "3 Years",
      fee: "12%",
      icon: <Zap className="text-purple-400" />,
    },
  ];

  useEffect(() => {
    async function loadVaultData() {
      if (!ready || !user) return;

      try {
        const { account, address } = getStarknetAccount(user.id);
        setStarkAccount(account);

        const contract = getLegacyContract(account);
        if (!contract) {
          console.warn("Contract initialization failed: Address missing?");
          setLoading(false);
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
        console.error(
          "Vault data sync failed. Is the contract deployed to Sepolia?",
          err,
        );
      } finally {
        setLoading(false);
      }
    }

    loadVaultData();
  }, [user, ready]);

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
      className="max-w-7xl mx-auto space-y-10 p-6">
      {}
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
        { } 
        <WalletAddress  address={starkAccount}/>
      </div>

      {}
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

      {}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">
          Security Subscriptions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.name}
              {...plan}
              onActivate={() =>
                console.log(
                  `Activating ${plan.name} plan via account ${starkAccount?.address}`,
                )
              }
            />
          ))}
        </div>
      </div>

      <LogicSettings />
    </motion.div>
  );
}
