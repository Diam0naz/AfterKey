// "use client";

// import { useAccount, useProvider } from "@starknet-react/core";
// import { getLegacyContract } from "@/lib/contract";
// import { useState } from "react";

// export default function RulesPage() {
//   const { account } = useAccount();
//   const { provider } = useProvider();
//   const contract = getLegacyContract(account ?? provider);

//   const [loading, setLoading] = useState(false);

//   async function executeLegacy() {
//     if (!account) return;
//     setLoading(true);

//     try {
//       await contract.execute_legacy();
//       alert("Legacy executed successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Conditions not met");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function pingActivity() {
//     if (!account) return;
//     setLoading(true);

//     try {
//       await contract.ping_activity();
//       alert("Activity updated");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update activity");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-xl">
//       <h1 className="text-2xl font-bold mb-6">Legacy Rules</h1>

//       <div className="bg-white/5 p-6 rounded-xl space-y-4">
//         <button
//           onClick={pingActivity}
//           className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600"
//         >
//           Ping Owner Activity
//         </button>

//         <button
//           onClick={executeLegacy}
//           className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700"
//         >
//           Execute Legacy
//         </button>
//       </div>
//     </div>
//   );
// }