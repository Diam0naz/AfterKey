// "use client";

// import { useState } from "react";
// import { useAppStore } from "@/lib/store";

// export default function AddTrusteeModal({
//   onClose,
// }: {
//   onClose: () => void;
// }) {
//   const { addTrustee, addNotification } = useAppStore();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [hours, setHours] = useState(24);

//   const submit = () => {
//     if (!name || !email || !walletAddress || hours <= 0) return;

//     const unlockAt = Date.now() + hours * 60 * 60 * 1000;

//     addTrustee({ name, email, walletAddress, unlockAt });
//     addNotification(`Trustee ${name} added`);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
//       <div className="bg-gray-900 w-full max-w-md rounded-xl p-6 space-y-4">
//         <h2 className="text-xl font-semibold">Add Trustee</h2>

//         <input
//           className="w-full bg-gray-800 p-3 rounded"
//           placeholder="Full name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           className="w-full bg-gray-800 p-3 rounded"
//           placeholder="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="w-full bg-gray-800 p-3 rounded"
//           placeholder="Wallet address"
//           value={walletAddress}
//           onChange={(e) => setWalletAddress(e.target.value)}
//         />

//         <div>
//           <label className="text-sm text-gray-400">
//             Unlock after (hours)
//           </label>
//           <input
//             type="number"
//             min={1}
//             className="w-full bg-gray-800 p-3 rounded mt-1"
//             value={hours}
//             onChange={(e) => setHours(Number(e.target.value))}
//           />
//         </div>

//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded bg-gray-700"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={submit}
//             className="px-4 py-2 rounded bg-purple-600"
//           >
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }