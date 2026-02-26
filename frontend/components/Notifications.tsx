"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/event";

export default function Notifications() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <div className="absolute right-0 mt-2 w-72 bg-[#0b0f1a] border border-white/10 rounded-xl p-4 z-50">
      <h4 className="font-semibold mb-2">Notifications</h4>

      {events.length === 0 && (
        <p className="text-gray-400 text-sm">No notifications</p>
      )}

      {events.map((e, i) => (
        <div key={i} className="text-sm text-gray-300 py-1">
          {e.keys[0]}
        </div>
      ))}
    </div>
  );
}