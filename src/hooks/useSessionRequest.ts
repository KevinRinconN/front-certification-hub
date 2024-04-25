// import { certiHubApi } from "@/api/certification-hub.api";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// export const useSessionRequest = () => {
//   const { data: session } = useSession();
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = async (apiRoute: string) => {
//     setIsLoading(true);
//     try {
//       const token = session?.user.access_token;
//       if (token) {
//         const { data } = await certiHubApi.get(apiRoute, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(data);
//       }
//     } catch (error) {
//       throw new Error("Invalid token");
//     //
//     setIsLoading(false);
//   };

//   return { data, isLoading, fetchData };
// };
