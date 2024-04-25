import { create } from "zustand";
import { StudentSlice, createStudentSlice } from "./student.slice";
import { CourseSlice, createCourseSlice } from "./course.slice";
import { CompanySlice, createCompanySlice } from "./company.slice";

type ShareState = StudentSlice & CourseSlice & CompanySlice;

export const useIndividualStepperStore = create<ShareState>()((...a) => ({
  ...createStudentSlice(...a),
  ...createCourseSlice(...a),
  ...createCompanySlice(...a),
}));
