import { create } from "zustand";

interface WalletData {
  address: string;
  privateKey: string;
  mnemonic: string;
}

export interface Trustee {
  id: number;
  name: string;
  email: string;
  walletAddress: string;
  unlockAt: number; // timestamp (ms)
  executed: boolean;
}

interface Notification {
  id: number;
  message: string;
  time: string;
}

interface AppState {
  wallet: WalletData | null;
  initialized: boolean;
  notifications: Notification[];
  sidebarOpen: boolean;
  trustees: Trustee[];

  setWallet: (wallet: WalletData) => void;
  addNotification: (message: string) => void;
  toggleSidebar: () => void;

  addTrustee: (t: Omit<Trustee, "id" | "executed">) => void;
  removeTrustee: (id: number) => void;
  markExecuted: (id: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  wallet: null,
  initialized: false,
  notifications: [],
  sidebarOpen: false,
  trustees: [],

  setWallet: (wallet) => set({ wallet, initialized: true }),

  addNotification: (message) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), message, time: new Date().toLocaleTimeString() },
      ],
    })),

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  addTrustee: (t) =>
    set((state) => ({
      trustees: [
        ...state.trustees,
        { ...t, id: Date.now(), executed: false },
      ],
    })),

  removeTrustee: (id) =>
    set((state) => ({
      trustees: state.trustees.filter((t) => t.id !== id),
    })),

  markExecuted: (id) =>
    set((state) => ({
      trustees: state.trustees.map((t) =>
        t.id === id ? { ...t, executed: true } : t
      ),
    })),
}));