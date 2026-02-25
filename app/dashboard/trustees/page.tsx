// "use client";

// import { useAccount, useProvider } from "@starknet-react/core";
// import { getLegacyContract } from "@/lib/contract";
// import { useEffect, useState } from "react";

// export default function TrusteesPage() {
//   const { account } = useAccount();
//   const { provider } = useProvider();
//   const contract = getLegacyContract(account ?? provider);

//   const [trustee, setTrustee] = useState("");
//   const [trustees, setTrustees] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   async function loadTrustees() {
//     const count = await contract.get_trustee_count();
//     const list: string[] = [];

//     for (let i = 0; i < Number(count); i++) {
//       const t = await contract.trustees(i);
//       list.push(t);
//     }

//     setTrustees(list);
//   }

//   useEffect(() => {
//     loadTrustees();
//   }, []);

//   async function addTrustee() {
//     if (!account || !trustee) return;
//     setLoading(true);

//     try {
//       await contract.add_trustee(trustee);
//       setTrustee("");
//       loadTrustees();
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function removeTrustee(address: string) {
//     if (!account) return;
//     await contract.remove_trustee(address);
//     loadTrustees();
//   }

//   return (
//     <div className="max-w-2xl">
//       <h1 className="text-2xl font-bold mb-6">Trustees</h1>

//       <div className="bg-white/5 p-6 rounded-xl mb-6">
//         <input
//           value={trustee}
//           onChange={(e) => setTrustee(e.target.value)}
//           placeholder="Wallet address"
//           className="w-full px-4 py-3 bg-black/40 rounded-lg mb-3"
//         />

//         <button
//           onClick={addTrustee}
//           className="w-full py-3 bg-purple-600 rounded-lg"
//         >
//           Add Trustee
//         </button>
//       </div>

//       <div className="space-y-3">
//         {trustees.length === 0 && (
//           <p className="text-gray-400">No trustees added yet.</p>
//         )}

//         {trustees.map((t) => (
//           <div
//             key={t}
//             className="flex justify-between items-center bg-white/5 p-4 rounded-lg"
//           >
//             <span className="text-sm">
//               {t.slice(0, 6)}...{t.slice(-4)}
//             </span>
//             <button
//               onClick={() => removeTrustee(t)}
//               className="text-red-400 text-sm"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }