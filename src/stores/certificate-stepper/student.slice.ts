import type { StateCreator } from "zustand";

export interface StudentSlice {
  identificationNumber: string;

  setIdentificationNumber: (identificationNumber: string) => void;
}

export const createStudentSlice: StateCreator<StudentSlice> = (set) => ({
  identificationNumber: "",
  setIdentificationNumber: (identificationNumber: string) =>
    set({ identificationNumber }),
});
