"use client";
import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount, isAccountDeployed } from "@/lib/wallet";
import { getLegacyContract } from "@/lib/contract";
import { useEffect, useState } from "react";
import { Plus, Trash2, UserPlus, ShieldCheck, Users, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; 


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
      const deployed = await isAccountDeployed(account);
      if (!deployed) {
        console.log("ℹ️ Account not deployed yet.");
        return;
      }
      const contract = getLegacyContract(account);
      if (!contract) return;
      const count = await contract.get_trustee_count();
      const list: string[] = [];
      for (let i = 0; i < Number(count); i++) {
        const t = await contract.trustees(i);
        list.push(t);
      }
      setTrustees(list);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load trustees from chain.");
    }
  }

  async function addTrustee() {
    if (!starkAccount || !trusteeAddr) return;
    setLoading(true);
    const id = toast.loading("Adding trustee to Starknet...");
    
    try {
      const deployed = await isAccountDeployed(starkAccount);
      if (!deployed) {
        toast.error("Account not deployed. Fund its address first.", { id });
        return;
      }
      const contract = getLegacyContract(starkAccount);
      if (!contract) throw new Error("Contract not found");
      
      await contract.add_trustee(trusteeAddr);
      
      toast.success("Trustee added successfully!", { id });
      setTrusteeAddr("");
      loadTrustees(starkAccount);
    } catch (e) {
      console.error(e);
      toast.error("Failed to add trustee. Check your balance.", { id });
    } finally {
      setLoading(false);
    }
  }

  async function removeTrustee(index: number) {
    if (!starkAccount) return;
    setLoading(true);
    const id = toast.loading("Removing trustee...");

    try {
      const deployed = await isAccountDeployed(starkAccount);
      if (!deployed) {
        toast.error("Account not deployed.", { id });
        return;
      }

      const contract = getLegacyContract(starkAccount);
      if (!contract) throw new Error("Contract not found");

      await contract.remove_trustee(index);
      toast.success("Trustee removed successfully!", { id });
      loadTrustees(starkAccount);
    } catch (e) {
      console.error(e);
      toast.error("Failed to remove trustee.", { id });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Trustees Management</h1>
          <p className="text-slate-500 mt-2 max-w-md">
            Assign delegated "Key Holders" who can verify your legacy status and authorize asset migration.
          </p>
        </div>
        <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck size={14} /> Multi-Sig Protection Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl shadow-2xl sticky top-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <UserPlus className="text-indigo-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add Delegate</h2>
              <p className="text-xs text-slate-500 uppercase font-black tracking-tighter mt-0.5">Step 1 of 3: Assign Identity</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Starknet Address</label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  value={trusteeAddr}
                  onChange={(e) => setTrusteeAddr(e.target.value)}
                  placeholder="0x0..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-mono text-sm placeholder:text-slate-800"
                />
              </div>
            </div>
            <button
              onClick={addTrustee}
              disabled={loading || !trusteeAddr}
              className="w-full py-5 bg-gradient-to-br from-indigo-700 to-indigo-500 hover:from-indigo-600 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-950/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              {loading ? <Spinner /> : <><Plus size={18}/> Assign Trustee</>}
            </button>
          </div>
        </div>
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Users size={16} /> Current Delegates ({trustees.length})
            </h3>
          </div>
          <AnimatePresence>
            <div className="grid gap-4">
              {trustees.length === 0 ? (
                <div className="p-16 border-2 border-dashed border-slate-800 rounded-3xl text-center">
                  <p className="text-slate-600 font-medium">No trustees found on-chain. <br/> Your vault currently relies on inactivity only.</p>
                </div>
              ) : (
                trustees.map((t, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    key={t} 
                    className="flex justify-between items-center p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all group backdrop-blur-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Delegate ID</p>
                        <span className="font-mono text-sm text-slate-300">
                          {t.slice(0, 16)}...{t.slice(-12)}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeTrustee(index)}
                      disabled={loading}
                      className="p-3 text-slate-600 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />;
}