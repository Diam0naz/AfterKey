// "use client";

// import { useAccount, useProvider } from "@starknet-react/core";
// import { getLegacyContract } from "@/lib/contract";
// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const { account } = useAccount();
//   const { provider } = useProvider();
//   const contract = getLegacyContract(account ?? provider);

//   const [status, setStatus] = useState<any>(null);

//   useEffect(() => {
//     async function loadStatus() {
//       const res = await contract.get_status();
//       setStatus({
//         executed: res[0],
//         approvals: Number(res[1]),
//         required: Number(res[2]),
//         deadline: Number(res[3]),
//       });
//     }

//     loadStatus();
//   }, []);

//   if (!status) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Wallet Overview</h2>

//       <div className="grid md:grid-cols-3 gap-6">
//         <Card title="Legacy Status">
//           {status.executed ? "Executed" : "Active"}
//         </Card>

//         <Card title="Approvals">
//           {status.approvals} / {status.required}
//         </Card>

//         <Card title="Execution Deadline">
//           {new Date(status.deadline * 1000).toLocaleString()}
//         </Card>
//         <Card title="Execution Ready">
//           {status.executed
//             ? "Completed"
//             : status.approvals >= status.required
//             ? "Yes (Approvals met)"
//             : Date.now() / 1000 >= status.deadline
//             ? "Yes (Deadline reached)"
//             : "Not yet"}
//         </Card>
//       </div>
//     </div>
//   );
// }

// function Card({ title, children }: any) {
//   return (
//     <div className="p-6 bg-white/5 rounded-xl">
//       <p className="text-gray-400 text-sm">{title}</p>
//       <p className="text-xl mt-2">{children}</p>
//     </div>
//   );
// }