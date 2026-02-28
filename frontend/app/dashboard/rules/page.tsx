"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount, isAccountDeployed } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";

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
    try {
      const deployed = await isAccountDeployed(starkAccount);
      if (!deployed) return alert("⚠️ Account not deployed. Fund its address first.");

      const contract = getLegacyContract(starkAccount);
      if (!contract) return;

      await contract.ping_activity();
      alert("✅ Activity pinged successfully!");
    } catch (err) {
      console.error(err);
      alert("⚠️ Failed to ping activity.");
    } finally {
      setLoading(false);
    }
  }

  async function executeLegacy() {
    if (!starkAccount) return;
    setLoading(true);
    try {
      const deployed = await isAccountDeployed(starkAccount);
      if (!deployed) return alert("⚠️ Account not deployed. Fund its address first.");

      const contract = getLegacyContract(starkAccount);
      if (!contract) return;

      await contract.execute_legacy();
      alert("✅ Legacy executed successfully!");
    } catch (err) {
      console.error(err);
      alert("⚠️ Conditions not met or transaction failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-16">
      <h1 className="text-4xl font-black text-white">Legacy Rules</h1>
      <button
        onClick={pingActivity}
        disabled={loading}
        className="px-6 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-lg transition-all"
      >
        {loading ? "Processing..." : "Ping Activity"}
      </button>

      <button
        onClick={executeLegacy}
        disabled={loading}
        className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg transition-all"
      >
        {loading ? "Processing..." : "Execute Legacy"}
      </button>
    </div>
  );
}