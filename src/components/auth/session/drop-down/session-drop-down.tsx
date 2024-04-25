import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SessionInfo } from "../session-info";
import { auth } from "@/auth.config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutDropDown } from "./logout-drop-down";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SessionDropDown = async () => {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SessionInfo
          email={`${session?.user.email}`}
          firstName={`${session?.user.firstName}`}
          lastName={`${session?.user.lastName}`}
          rol={`${session?.user.rol}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2" align="end">
        <DropdownMenuLabel>
          <p>Mi cuenta</p>
          <DropdownMenuSeparator />
          <div className="flex items-center gap-4 py-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {session?.user.firstName.charAt(0)}
                {session?.user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-sm font-normal">
              <p className="capitalize">{`${session?.user.firstName.toLowerCase()} ${session?.user.lastName.toLowerCase()}`}</p>
              <p className="text-secondary text-xs capitalize leading-none">{`${session?.user.rol.toLowerCase()}`}</p>

              <p className="max-w-sm text-gray-500">{`${session?.user.email}`}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        {session?.user.rol == "ADMIN" && (
          <DropdownMenuItem>Registrar nuevo usuario</DropdownMenuItem>
        )}
        <LogoutDropDown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
