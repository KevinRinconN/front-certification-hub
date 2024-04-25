import { certiHubApi } from "@/api/certification-hub.api";
import { ApiInterface } from "@/interfaces/api";
import { Course } from "@/interfaces/api/course/course.interface";
import { ErrorApi } from "@/interfaces/api/error.interface";
import { Pagination } from "@/interfaces/api/pagination.interface";
import { AxiosError } from "axios";

export const getCourses = async (
  token: string,
  search: string
): Promise<Pagination<Course[]>> => {
  try {
    const { data } = await certiHubApi.get<ApiInterface<Pagination<Course[]>>>(
      `courses?search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    throw new Error("No autorizado, por favor autentiquese de nuevo");
  }
};

export const saveCourse = async (
  token: string,
  course: Course
): Promise<Course> => {
  try {
    const res = await certiHubApi.post<ApiInterface<Course>>(
      `courses`,
      course,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status >= 200 && res.status < 300) {
      return res.data.data;
    }
    throw new Error("Algo salio mal");
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const responseData = axiosError.response.data as ErrorApi;
        if (responseData.message === "A course with this name already exists") {
          throw new Error(`El curso con ese nombre ya existe`);
        }
      }
    }
    throw new Error(`${error}`);
  }
};
