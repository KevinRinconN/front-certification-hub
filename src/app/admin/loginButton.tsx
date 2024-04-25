"use client";
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <Button variant={"ghost"} onClick={() => logout()}>
      Cerrar sesion
    </Button>
  );
};
