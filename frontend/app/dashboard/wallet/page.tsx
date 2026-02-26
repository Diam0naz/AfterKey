"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import { getStarknetAccount } from "@/lib/wallet";
import { Wallet, Shield, Eye, EyeOff, Coins } from "lucide-react";
import CopyButton from "@/components/dashboard/CopyButton";

export default function WalletPage() {
  const { user, ready } = usePrivy();
  const [showKey, setShowKey] = useState(false);

  if (!ready || !user) return <div className="text-indigo-500 animate-pulse p-8">Loading Vault...</div>;

  const { address, privateKey } = getStarknetAccount(user.id);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Wallet Assets</h1>
        <p className="text-slate-500 mt-1">Non-custodial Starknet Smart Account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-lg"><Wallet className="text-indigo-400" size={20}/></div>
              <h3 className="text-lg font-bold text-white">Identity Details</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2">Authenticated Email</p>
                <p className="text-slate-200 font-medium">{user.email?.address}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2">Vault Address (Sepolia)</p>
                <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs font-mono text-indigo-300 break-all">{address}</p>
                  <CopyButton value={address} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <Shield size={16} /> Security: Private Key
              </div>
              <button onClick={() => setShowKey(!showKey)} className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors">
                {showKey ? <div className="flex items-center gap-1"><EyeOff size={14}/> Hide</div> : <div className="flex items-center gap-1"><Eye size={14}/> Reveal</div>}
              </button>
            </div>
            <p className={`text-xs font-mono break-all p-4 bg-black/40 rounded-xl border border-red-900/20 text-red-200 transition-all duration-300 ${showKey ? "blur-0" : "blur-md select-none"}`}>
              {privateKey}
            </p>
          </div>

          <button
            onClick={() => setShowSeed(!showSeed)}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            {showSeed ? "Hide" : "Reveal"}
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest px-2">Balance Overview</h3>
          {MOCK_ASSETS.map((asset) => (
            <div key={asset.symbol} className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-950 border border-slate-800 hover:border-indigo-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-500/10 transition-colors"><Coins className="text-slate-400 group-hover:text-indigo-400" size={18}/></div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{asset.network}</span>
              </div>
              <p className="text-2xl font-black text-white">{asset.balance} {asset.symbol}</p>
              <p className="text-xs text-slate-500 mt-1">≈ ${asset.usdValue} USD</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCK_ASSETS = [
  { symbol: "STRK", balance: "250.00", usdValue: "112.50", network: "Starknet" },
  { symbol: "ETH", balance: "0.045", usdValue: "98.20", network: "Starknet" },
];
