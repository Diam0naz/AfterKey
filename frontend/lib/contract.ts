import { Contract, Abi, AccountInterface, ProviderInterface } from "starknet";
import legacyAbi from "./legacyAbi.json";

export const LEGACY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LEGACY_CONTRACT_ADDRESS || "";

export function getLegacyContract(accountOrProvider: AccountInterface | ProviderInterface) {
  if (!accountOrProvider || !LEGACY_CONTRACT_ADDRESS || LEGACY_CONTRACT_ADDRESS === "") {
    return null;
  }
  
  try {
    return new Contract({
  abi: legacyAbi as Abi,
  address: LEGACY_CONTRACT_ADDRESS,
  providerOrAccount: accountOrProvider,
});
  } catch (error) {
    console.error("Contract initialization failed:", error);
    return null;
  }
}
// import { Contract, Abi, AccountInterface } from "starknet";import legacyAbi from "./legacyAbi.json";export const LEGACY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LEGACY_CONTRACT_ADDRESS || "";export function getLegacyContract(account: AccountInterface) { if (!account || !LEGACY_CONTRACT_ADDRESS) return null; return new Contract(legacyAbi as Abi, LEGACY_CONTRACT_ADDRESS, account);}
