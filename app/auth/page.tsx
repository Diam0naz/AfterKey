// "use client";

// import { usePrivy } from "@privy-io/react-auth";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AuthPage() {
//   const { login, authenticated, ready } = usePrivy();
//   const router = useRouter();

//   useEffect(() => {
//     if (ready && authenticated) {
//       router.replace("/bootstrap");
//     }
//   }, [ready, authenticated]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <button
//         onClick={login}
//         className="bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 rounded-xl font-semibold hover:opacity-90"
//       >
//         Login / Signup with Email OTP
//       </button>
//     </div>
//   );
// }