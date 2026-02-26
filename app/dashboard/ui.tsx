"use client";

import { useAppStore } from "@/lib/store";

export default function DashboardClient() {
  const { wallet } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Wallet Address</p>
          <p className="break-all mt-2">{wallet?.address}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Seed Phrase</p>
          <p className="mt-2 blur-sm hover:blur-none transition">
            {wallet?.mnemonic}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Status</p>
          <p className="mt-2 text-green-400">Active</p>
        </div>
      </div>
    </div>
  );
}
