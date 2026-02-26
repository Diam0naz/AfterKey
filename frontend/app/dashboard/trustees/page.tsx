"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";
import { Plus, Trash2, UserPlus } from "lucide-react";

export default function TrusteesPage() {
  const { user, ready } = usePrivy();
  const [trusteeAddr, setTrusteeAddr] = useState("");
  const [trustees, setTrustees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [starkAccount, setStarkAccount] = useState<any>(null);

  useEffect(() => {
    if (!ready || !user) return;

    const { account } = getStarknetAccount(user.id);
    setStarkAccount(account);
    loadTrustees(account);
  }, [ready, user]);

  async function loadTrustees(account: any) {
    try {
      const contract = getLegacyContract(account);
      if (!contract) return; // ✅ null guard

      const count = await contract.get_trustee_count();
      const list: string[] = [];

      for (let i = 0; i < Number(count); i++) {
        const t = await contract.trustees(i);
        list.push(t);
      }

      setTrustees(list);
    } catch (e) {
      console.error(e);
    }
  }

  async function addTrustee() {
    if (!starkAccount || !trusteeAddr) return;

    setLoading(true);
    try {
      const contract = getLegacyContract(starkAccount);
      if (!contract) return; // ✅ null guard

      await contract.add_trustee(trusteeAddr);
      setTrusteeAddr("");
      loadTrustees(starkAccount);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-8 text-white">
      <div>
        <h1 className="text-3xl font-bold">Trustees Management</h1>
        <p className="text-slate-500 mt-1">
          Assign delegates who can approve asset transfers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <UserPlus className="text-indigo-400" size={20} />
            </div>
            <h2 className="text-xl font-semibold">Add New Trustee</h2>
          </div>

          <input
            value={trusteeAddr}
            onChange={(e) => setTrusteeAddr(e.target.value)}
            placeholder="Starknet address (0x...)"
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl"
          />

          <button
            onClick={addTrustee}
            disabled={loading || !trusteeAddr}
            className="w-full mt-4 py-4 bg-indigo-600 rounded-xl font-bold"
          >
            {loading ? "Processing..." : "Add Trustee"}
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase">
            Active Trustees
          </h3>

          {trustees.map((t) => (
            <div key={t} className="flex justify-between p-5 bg-slate-900 rounded-2xl">
              <span className="font-mono text-sm">
                {t.slice(0, 10)}...{t.slice(-8)}
              </span>
              <Trash2 size={18} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
