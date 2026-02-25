// "use client";

// import { useAppStore } from "@/lib/store";
// import { usePrivy } from "@privy-io/react-auth";
// import { useState } from "react";
// import CopyButton from "@/components/dashboard/CopyButton";

// export default function WalletPage() {
//   const { wallet } = useAppStore();
//   const { user } = usePrivy();
//   const [showSeed, setShowSeed] = useState(false);

//   if (!wallet) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Wallet not initialized
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* PAGE HEADER */}
//       <div>
//         <h1 className="text-2xl font-semibold mb-1">Wallet Details</h1>
//         <p className="text-gray-400 text-sm">
//           Manage your identity and digital assets
//         </p>
//       </div>

//       {/* WALLET INFO */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* EMAIL */}
//         <div className="bg-gray-900 rounded-xl p-6">
//           <p className="text-gray-400 text-sm mb-1">Email</p>
//           <p className="break-all">{user?.email?.address}</p>
//         </div>

//         {/* ADDRESS */}
//         <div className="bg-gray-900 rounded-xl p-6">
//           <p className="text-gray-400 text-sm mb-2">Wallet Address</p>

//           <div className="flex items-center justify-between gap-4">
//             <p className="break-all text-sm">
//               {wallet.address}
//             </p>
//             <CopyButton value={wallet.address} />
//           </div>
//         </div>
//       </div>

//       {/* SEED PHRASE */}
//       <div className="bg-gray-900 rounded-xl p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <p className="text-gray-400 text-sm">Seed Phrase</p>
//             <p className="text-xs text-red-400">
//               Never share this with anyone
//             </p>
//           </div>

//           <button
//             onClick={() => setShowSeed(!showSeed)}
//             className="text-sm text-purple-400 hover:text-purple-300"
//           >
//             {showSeed ? "Hide" : "Reveal"}
//           </button>
//         </div>

//         <div className="flex items-center justify-between gap-4">
//           <p
//             className={`text-sm break-all transition ${
//               showSeed ? "" : "blur-md select-none"
//             }`}
//           >
//             {wallet.mnemonic}
//           </p>

//           {showSeed && <CopyButton value={wallet.mnemonic} />}
//         </div>
//       </div>

//       {/* ASSETS */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Assets</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {MOCK_ASSETS.map((asset) => (
//             <div
//               key={asset.symbol}
//               className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-lg font-semibold">
//                   {asset.symbol}
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   {asset.network}
//                 </span>
//               </div>

//               <p className="text-2xl font-bold mb-1">
//                 {asset.balance}
//               </p>
//               <p className="text-sm text-gray-400">
//                 ≈ ${asset.usdValue}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* MOCK DATA (Frontend Demo) */
// const MOCK_ASSETS = [
//   {
//     symbol: "ETH",
//     balance: "0.00",
//     usdValue: "0.00",
//     network: "Ethereum",
//   },
//   {
//     symbol: "STRK",
//     balance: "0.00",
//     usdValue: "0.00",
//     network: "StarkNet",
//   },
//   {
//     symbol: "USDC",
//     balance: "0.00",
//     usdValue: "0.00",
//     network: "Ethereum",
//   },
// ];