"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect, useMemo } from "react";
import { getStarknetAccount, isAccountDeployed } from "@/lib/wallet";
import { Wallet, Shield, Coins, AlertCircle } from "lucide-react";
import CopyButton from "@/components/dashboard/CopyButton";
import { RpcProvider, CallData } from "starknet";

export default function WalletPage() {
  const { user, ready } = usePrivy();
  const [showKey, setShowKey] = useState(false);
  const [balance, setBalance] = useState<string>("0");
  const [isDeployed, setIsDeployed] = useState(false);
  const [loading, setLoading] = useState(true);
  const formattedBalance = useMemo(() => {
    if (!balance || balance === "0") return "0.00";
    try {
      const b = BigInt(balance);
      const decimals = 18;
      const divisor = BigInt(10 ** decimals);
      const integerPart = b / divisor;
      const fractionalPart = b % divisor;
      const fractionStr = fractionalPart.toString().padStart(decimals, "0");
      
      return `${integerPart}.${fractionStr.substring(0, 4)}`;
    } catch (e) {
      return "0.00";
    }
  }, [balance]);
  if (!ready || !user)
    return (
      <div className="text-indigo-500 animate-pulse p-8">Loading Vault...</div>
    );

  const { address, account } = getStarknetAccount(user.id);

  useEffect(() => {
    async function checkStatus() {
      try {
        const deployed = await isAccountDeployed(account);
        setIsDeployed(deployed);
      } catch (e) {
        console.error("Failed to check deployment:", e);
      } finally {
        setLoading(false);
      }
    }
    if (account) checkStatus();
  }, [account]);

  useEffect(() => {
    if (!account) return;
    let cancelled = false;

    const NODE_URL = process.env.NEXT_PUBLIC_STARKNET_RPC || "https://sepolia.rpc.starknet.rs";
    const provider = new RpcProvider({ nodeUrl: NODE_URL });

        async function refresh() {
      try {
        const deployed = await isAccountDeployed(account);
        if (!cancelled) setIsDeployed(deployed);

        const STRK_TOKEN_ADDRESS = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
        const response = await provider.callContract({
          contractAddress: STRK_TOKEN_ADDRESS,
          entrypoint: "balanceOf",
          calldata: [address],
        });

        const balBn = BigInt(response[0]);
        if (!cancelled) {
          setBalance(balBn.toString());
          setLoading(false);
        }

        if (!deployed && balBn > BigInt(0)) {
          console.log("Attempting auto-deploy with correct Class Hash...");         
          const OZ_CLASS_HASH = "0x00e29443051402219b56827ac05950ad17435f3365ad07f4661415664bc354fb";
          const publicKey = await (account as any).signer.getPubKey();

          const deployPayload = {
            classHash: OZ_CLASS_HASH,
            constructorCalldata: CallData.compile({ public_key: publicKey }), 
            addressSalt: publicKey,
          };

          try {
            const { transaction_hash } = await account.deployAccount(deployPayload);
            console.log("Deploying! Tx Hash:", transaction_hash);            
            await provider.waitForTransaction(transaction_hash);
            if (!cancelled) setIsDeployed(true);
          } catch (deployErr: any) {
            if (deployErr.message?.includes("already_deployed")) {
               setIsDeployed(true);
            } else {
               console.warn("Deployment status:", deployErr.message);
            }
          }
        }
      } catch (err) {
        console.error("Refresh error:", err);
      }
    }

    refresh();
    const iv = setInterval(() => {
      if (!cancelled) refresh();
    }, 10000);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, [account, isDeployed, address]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Wallet Assets
        </h1>
        <p className="text-slate-500 mt-1">
          Non-custodial Starknet Smart Account
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Wallet className="text-indigo-400" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Identity Details</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2">
                  Authenticated Email
                </p>
                <p className="text-slate-200 font-medium">{user.email?.address}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2">
                  Vault Address (Sepolia)
                </p>
                <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-col">
                    <p className="text-xs font-mono text-indigo-300 break-all">{address}</p>
                  </div>
                  <CopyButton value={address} />
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-green-400 font-bold text-sm mb-2">
              <Shield size={16} /> Smart Account Secured
            </div>
            <p className="text-xs text-slate-400">
              This vault uses a programmable Starknet smart account. Private keys are never exposed.
            </p>
          </div>

          {}
          {!isDeployed && (
            <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-700/50 flex items-start gap-3">
              <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-amber-200 font-semibold text-sm">Funding Required</p>
                <p className="text-amber-300/70 text-xs mt-1">
                  Copy your vault address above. Paste it on the <a href="https://faucet.starknet.io" target="_blank" className="underline hover:text-amber-200">Starknet Sepolia Faucet</a> to request test tokens.
                </p>
                <p className="text-amber-300/70 text-xs mt-2">
                  Once funded, your account will deploy automatically.
                </p>
              </div>
            </div>
          )}
        </div>

        {}
        <div className="lg:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest px-2">
              Account Balance
            </h3>
          
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <span className="text-indigo-400 font-bold">{formattedBalance} STRK</span> 
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest px-2">
              Account Status
            </h3>
            
            {loading ? (
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse">
                <p className="text-slate-400 text-sm">Checking status...</p>
              </div>
            ) : isDeployed ? (
              <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 text-green-400 font-bold text-sm mb-2">
                  ✅ Deployed
                </div>
                <p className="text-xs text-slate-400">
                  Your vault account is ready! You can now add trustees and manage your legacy.
                </p>
              </div>
            ) : BigInt(balance) > BigInt(0) ? (
              <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-2">
                  ⏳ Deploying
                </div>
                <p className="text-xs text-slate-400">
                  Funds received, deploying your account automatically. This may take a moment.
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  ⏳ Awaiting Funds
                </div>
                <p className="text-xs text-slate-400">
                  Send STRK to your vault address to trigger automatic deployment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
