// import type { AuthStatus, User } from "@/interfaces/api/auth";
// import { devtools, persist } from "zustand/middleware";
// import { getMe, getToken } from "@/service/auth/auth.service";
// import { StateCreator, create } from "zustand";
// import { deleteCookie, setCookie } from "cookies-next";

// export interface AuthState {
//   status: AuthStatus;
//   token?: string;
//   user?: User;

//   login: (email: string, password: string) => Promise<void>;
//   setUser: (user: User) => void;
// }

// export const authStore: StateCreator<AuthState> = (set) => ({
//   status: "Unauthorized",
//   token: undefined,
//   user: undefined,

//   login: async (email: string, password: string) => {
//     try {
//       console.log("--2");
//       const { access_token } = await getToken(email, password);
//       set({ token: access_token });
//       console.log("--");
//       const user = await getMe(access_token);
//       set({ status: "Authorized", user: user });
//       setCookie("token", access_token);
//     } catch (error) {
//       deleteCookie("token");
//       set({ status: "Unauthorized", token: undefined, user: undefined });
//     }
//   },

//   setUser: (user: User) => {
//     set({ user });
//   },
// });

// export const useAuthStore = create<AuthState>()(
//   persist(devtools(authStore), { name: "auth-storage" })
// );
