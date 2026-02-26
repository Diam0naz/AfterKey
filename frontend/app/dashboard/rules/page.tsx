"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useState, useEffect } from "react";

export default function RulesPage() {
  const { user, ready } = usePrivy();
  const [starkAccount, setStarkAccount] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready || !user) return;

    const { account } = getStarknetAccount(user.id);
    setStarkAccount(account);
  }, [ready, user]);

  async function executeLegacy() {
    if (!starkAccount) return;

    setLoading(true);
    try {
      const contract = getLegacyContract(starkAccount);
      if (!contract) return; 

      await contract.execute_legacy();
      alert("Legacy executed successfully");
    } catch (err) {
      alert("Conditions not met");
    } finally {
      setLoading(false);
    }
  }

  async function pingActivity() {
    if (!starkAccount) return;

    setLoading(true);
    try {
      const contract = getLegacyContract(starkAccount);
      if (!contract) return; 

      await contract.ping_activity();
      alert("Activity updated");
    } catch (err) {
      alert("Failed to update activity");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl text-white">
      <h1 className="text-2xl font-bold mb-6">Legacy Rules</h1>

      <div className="bg-white/5 p-6 rounded-xl space-y-4 border border-slate-800 backdrop-blur-md">
        <button
          onClick={pingActivity}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold transition-all"
        >
          {loading ? "Processing..." : "Ping Owner Activity"}
        </button>

        <button
          onClick={executeLegacy}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 font-bold transition-all"
        >
          {loading ? "Processing..." : "Execute Legacy"}
        </button>
      </div>
    </div>
  );
}