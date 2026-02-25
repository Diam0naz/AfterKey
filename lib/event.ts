// import { RpcProvider } from "starknet";
// // import legacyAbi from "./legacyAbi.json";
// // import { LEGACY_CONTRACT_ADDRESS } from "./contract";

// export async function fetchEvents() {
//   const provider = new RpcProvider({
//     nodeUrl: "https://starknet-goerli.public.blastapi.io",
//   });

//   const events = await provider.getEvents({
//     // address: LEGACY_CONTRACT_ADDRESS,
//     from_block: { block_number: 0 },
//     to_block: "latest",
//     keys: [],
//     chunk_size: 50,
//   });

//   return events.events;
// }