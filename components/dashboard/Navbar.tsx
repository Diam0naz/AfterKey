// "use client";

// import { usePrivy } from "@privy-io/react-auth";
// import { useAppStore } from "@/lib/store";
// import NotificationBell from "./NotificationBell";
// import MobileSidebar from "./MobileSidebar";

// export default function Navbar() {
//   const { logout } = usePrivy();
//   const { wallet, sidebarOpen, toggleSidebar } = useAppStore();

//   return (
//     <>
//       <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950 fixed w-full z-50">
//         <button
//           onClick={toggleSidebar}
//           className="md:hidden text-2xl"
//           aria-label="Toggle sidebar"
//         >
//           ☰
//         </button>
//         <div className="text-sm text-gray-400 hidden md:block">
//           Wallet:{" "}
//           <span className="text-white">
//             {wallet?.address
//               ? `${wallet.address.slice(0, 6)}…${wallet.address.slice(-4)}`
//               : "Not connected"}
//           </span>
//         </div>
//         <div className="flex items-center gap-4">
//           <NotificationBell />
//           <button
//             onClick={logout}
//             className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white"
//           >
//             Logout
//           </button>
//         </div>
//       </header>
//       <MobileSidebar />
//     </>
//   );
// }