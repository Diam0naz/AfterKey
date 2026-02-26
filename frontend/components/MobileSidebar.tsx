"use client";
import Link from "next/link";
export default function MobileSidebar({ open, setOpen }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50">
      <aside className="w-64 bg-[#050816] h-full p-6">
        <button onClick={() => setOpen(false)}>✕</button>

        <nav className="mt-6 space-y-3">
          {["dashboard", "trustees", "rules", "activity", "settings"].map(
            (p) => (
              <Link
                key={p}
                href={`/dashboard/${p === "dashboard" ? "" : p}`}
                onClick={() => setOpen(false)}
                className="block"
              >
                {p}
              </Link>
            )
          )}
        </nav>
      </aside>
    </div>
  );
}