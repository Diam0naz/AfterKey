import { Contract, Abi, AccountInterface } from "starknet";
import legacyAbi from "./legacyAbi.json";

export const LEGACY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LEGACY_CONTRACT_ADDRESS || "";

export function getLegacyContract(account: AccountInterface) {
  if (!account || !LEGACY_CONTRACT_ADDRESS) return null;
  
  return new Contract(legacyAbi as Abi, LEGACY_CONTRACT_ADDRESS, account);
}