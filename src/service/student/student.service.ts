import { certiHubApi } from "@/api/certification-hub.api";
import { ApiInterface } from "@/interfaces/api";
import { ErrorApi } from "@/interfaces/api/error.interface";
import { Pagination } from "@/interfaces/api/pagination.interface";
import { Student } from "@/interfaces/api/student/student.interface";
import { AxiosError } from "axios";

export const getStudents = async (
  token: string,
  search: string
): Promise<Pagination<Student[]>> => {
  try {
    const { data } = await certiHubApi.get<ApiInterface<Pagination<Student[]>>>(
      `students?search=${search}`,
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

export const saveStudent = async (
  token: string,
  student: Student
): Promise<Student> => {
  try {
    const res = await certiHubApi.post<ApiInterface<Student>>(
      `students`,
      student,
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
        if (
          responseData.message === "A student with this username already exists"
        ) {
          throw new Error(
            `Un estudiante con ese numero de documento ya existe`
          );
        }
      }
    }
    throw new Error(`${error}`);
  }
};
