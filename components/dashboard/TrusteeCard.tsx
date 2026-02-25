"use client";

import { Trustee, useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";

function format(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
}

export default function TrusteeCard({ t }: { t: Trustee }) {
  const { removeTrustee, markExecuted, addNotification } = useAppStore();
  const [remaining, setRemaining] = useState(t.unlockAt - Date.now());

  useEffect(() => {
    const i = setInterval(() => {
      const r = t.unlockAt - Date.now();
      setRemaining(r);

      if (r <= 0 && !t.executed) {
        markExecuted(t.id);
        addNotification(`Legacy unlocked for ${t.name}`);
      }
    }, 1000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{t.name}</h3>
        <button
          onClick={() => removeTrustee(t.id)}
          className="text-red-400 text-sm"
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-gray-400">{t.email}</p>
      <p className="text-xs break-all">{t.walletAddress}</p>

      <div className="pt-2">
        {t.executed ? (
          <span className="text-green-400 font-semibold">
            Executed
          </span>
        ) : (
          <span className="text-purple-400">
            Unlocks in {format(remaining)}
          </span>
        )}
      </div>
    </div>
  );
}