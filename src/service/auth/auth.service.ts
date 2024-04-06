import { certiHubApi } from "@/api/certification-hub.api";
import { ApiInterface, LoginInterface, User } from "@/interfaces/api";
import { AxiosError } from "axios";

export const getToken = async (
  username: string,
  password: string
): Promise<LoginInterface> => {
  try {
    const { data } = await certiHubApi.post<ApiInterface<LoginInterface>>(
      "/auth/login",
      { username, password }
    );
    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }
    throw new Error("Unable to login");
  }
};

export const getMe = async (token: string): Promise<User> => {
  try {
    const { data } = await certiHubApi.get<ApiInterface<User>>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
