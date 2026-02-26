"use client";
import { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { FaEnvelope, FaWallet, FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HandleLogin() {
  const { login, user, ready } = usePrivy();
  const { wallets } = useWallets();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!ready) {
      toast.error("Privy is still loading. Please wait.");
      return;
    }

    setIsLoading(true);
    try {
      await login();
      
      if (user) {
        const primaryWallet = wallets.length > 0 ? wallets[0] : null;
        
        if (!primaryWallet) {
          console.warn("User logged in but no wallet found yet.");
        }

        await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email?.address,
            walletAddress: primaryWallet?.address || "",
            publicKey: "04bfcab1e1f63d92ecab4870c23d37e0d8a0a6b3e6b0ab0e86f1b59c3d2e2b1fbc567f32f7c0f2e726a9c77d1e3f55b0f902c6f4c9c8b1f1a0f02e5a2e37f9b2e3",
            recoveryThreshold: 2,
            inactivityMonths: 1,
          }),
        });

        toast.success("Successfully signed in!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      }
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl shadow-2xl text-gray-200 relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e1b4b",
            color: "#FFFFFF",
            border: "1px solid #312e81",
          },
        }}
      />

      <div className="flex flex-col items-center mb-8">
        <div className="p-4 bg-indigo-500/10 rounded-2xl mb-4">
          <FaWallet className="text-indigo-400 text-3xl" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
        <p className="text-gray-400 mt-2 text-center">Access your secure digital legacy</p>
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading || !ready}
        className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold transition-all duration-300 ${
          !isLoading && ready
            ? "bg-linear-to-br from-indigo-700 to-indigo-500 hover:scale-[1.02] shadow-lg shadow-indigo-500/20 text-white"
            : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-70"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            <span>Signing in...</span>
          </div>
        ) : !ready ? (
          <span>Initializing...</span>
        ) : (
          <>
            <FaEnvelope className="text-lg" />
            <span>Login with Email</span>
            <FaArrowRight className="text-xs" />
          </>
        )}
      </button>

      <div className="mt-8 pt-6 border-t border-slate-800/50 text-center space-y-4">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
          >
            Create one now
          </Link>
        </p>
        
        <p className="text-xs text-gray-500 leading-relaxed">
          By continuing, you agree to AfterKey's <br />
          <span className="text-indigo-400 cursor-pointer hover:underline">Terms of Service</span>
        </p>
      </div>
    </div>
  );
}
