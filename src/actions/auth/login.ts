"use server";

import { signIn } from "@/auth.config";
import { FormSchema } from "@/components/auth/login/user-auth-form";
import { AuthError } from "next-auth";
import { z } from "zod";

export type authenticateResponse =
  | "Success"
  | "Invalid credentials"
  | "Pending"
  | "Something went wrong"
  | "Unknown Error";

export async function authenticate(
  formData: z.infer<typeof FormSchema>
): Promise<authenticateResponse> {
  try {
    await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }

    return "Unknown Error";
  }
}
