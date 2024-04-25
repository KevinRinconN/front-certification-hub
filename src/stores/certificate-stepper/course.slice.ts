import type { StateCreator } from "zustand";

export interface CourseSlice {
  course: string;

  setCourse: (course: string) => void;
}

export const createCourseSlice: StateCreator<CourseSlice> = (set) => ({
  course: "",
  setCourse: (course: string) => set({ course }),
});
