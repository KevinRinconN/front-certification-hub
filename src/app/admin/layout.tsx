import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { LoginButton } from "./loginButton";
import { SideBar } from "@/components/layout/sidebar/side-bar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // if (!session?.user) {
  //   redirect("/auth/login");
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SideBar />
    </main>
  );
}
