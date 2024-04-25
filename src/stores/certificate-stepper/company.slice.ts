import type { StateCreator } from "zustand";

export interface CompanySlice {
  nit: string;

  setNit: (nit: string) => void;
}

export const createCompanySlice: StateCreator<CompanySlice> = (set) => ({
  nit: "",
  setNit: (nit: string) => set({ nit }),
});
