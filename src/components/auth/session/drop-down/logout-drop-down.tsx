"use client";
import { logout } from "@/actions/auth/logout";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export const LogoutDropDown = () => {
  return (
    <DropdownMenuItem onClick={() => logout()}>
      Cerrar sesion
      <DropdownMenuShortcut>
        <ArrowLeftStartOnRectangleIcon className="w-4" />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};
