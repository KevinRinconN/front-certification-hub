import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { UserAuthForm } from "@/components/auth/login/user-auth-form";

export default function LoginPage() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Bienvenido a Certification-Hub</CardTitle>
        <CardDescription>Inicia sesion para poder ingresar</CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm />
      </CardContent>
      <CardFooter className="grid">
        <p className="px-5 text-center text-sm text-muted-foreground">
          ¿Necesitas ayuda para ingresar al backoffice?
          <Link
            className="ml-2 text-secondary hover:underline underline-offset-4 hover:text-primary-accent"
            href={"https://cursos.devtalles.com/pages/contactanos"}
            target="_blank"
          >
            Contáctanos
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
