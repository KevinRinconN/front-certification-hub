// import { useAuthStore } from "@/stores/auth/auth.store";
import { BASE_API } from "@/utils/constants";
import axios from "axios";

const certiHubApi = axios.create({
  baseURL: BASE_API,
});

// certiHubApi.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

export { certiHubApi };
