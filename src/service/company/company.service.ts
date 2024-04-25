import { certiHubApi } from "@/api/certification-hub.api";
import { ApiInterface } from "@/interfaces/api";
import { Company } from "@/interfaces/api/company/company.interface";
import { ErrorApi } from "@/interfaces/api/error.interface";
import { Pagination } from "@/interfaces/api/pagination.interface";
import { AxiosError } from "axios";

export const getCompanies = async (
  token: string,
  search: string
): Promise<Pagination<Company[]>> => {
  try {
    const { data } = await certiHubApi.get<ApiInterface<Pagination<Company[]>>>(
      `companies?search=${search}`,
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

export const saveCompany = async (
  token: string,
  company: Company
): Promise<Company> => {
  try {
    const res = await certiHubApi.post<ApiInterface<Company>>(
      `companies`,
      company,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const responseData = axiosError.response.data as ErrorApi;
        if (responseData.message === "A company with this nit already exists") {
          throw new Error(`Una empresa con ese nit ya existe`);
        }
      }
    }
    throw new Error(`${error}`);
  }
};
