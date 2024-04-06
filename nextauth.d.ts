import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      acces_token: string;
      image?: string;
    } & DefaultSession["user"];
  }
}
