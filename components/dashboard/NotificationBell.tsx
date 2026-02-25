"use client";

import { useAppStore } from "@/lib/store";
import { useState } from "react";

export default function NotificationBell() {
  const { notifications } = useAppStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-gray-900 border border-gray-800 rounded-xl p-4 z-50">
          <h4 className="font-semibold mb-2">Notifications</h4>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-400">
              No notifications yet
            </p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="text-sm border-b border-gray-800 pb-2"
                >
                  <p>{n.message}</p>
                  <span className="text-xs text-gray-500">
                    {n.time}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}