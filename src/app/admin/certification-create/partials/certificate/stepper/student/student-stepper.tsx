"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AsignStudentForm } from "./form/asign-student-form";
import { CreateStudentForm } from "./form/create-student-form";

export const StudentStepper = () => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Estudiante</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona un estudiante para asignarle un certificado. Utiliza la
            lista desplegable para elegir al estudiante adecuado y haz clic en
            Agregar para completar el proceso. Si no existe el estudiante podrás
            registrarlo haciendo clic en el boton Añadir
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="asign-student" className="space-y-6">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="asign-student">Asignar</TabsTrigger>
              <TabsTrigger value="create-student">Añadir</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="asign-student">
            <AsignStudentForm />
          </TabsContent>
          <TabsContent value="create-student">
            <CreateStudentForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
