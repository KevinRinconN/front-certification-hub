import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { LoginButton } from "./loginButton";
import { SideBar } from "@/components/layout/sidebar/side-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SessionInfo } from "@/components/auth/session/session-info";
import { SessionDropDown } from "@/components/auth/session/drop-down/session-drop-down";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { ScrollArea } from "@/components/ui/scroll-area";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="pointer-events-none inset-0 flex fixed">
        <div className="pointer-events-auto inset-x-0 fixed top-0 left-72 flex justify-end items-center h-14 px-8 border-b bg-background/6 backdrop-blur">
          <SessionDropDown />
        </div>
        <SideBar />
      </header>
      <main className="pl-72 pt-14">
        {children}
        <Toaster />
        <Sonner position="bottom-left" richColors closeButton />
      </main>
    </>
  );
}
