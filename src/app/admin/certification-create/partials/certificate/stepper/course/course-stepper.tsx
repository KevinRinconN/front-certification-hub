"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AsignCourseForm } from "./form/asgin-course-form";
import { CreateCourseForm } from "./form/create-course-form";

export const CourseStepper = () => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Selecciona un curso</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona un curso para asignarle al certificado. Utiliza la lista
            desplegable para elegir el curso adecuado y haz clic en 'Agregar'
            para completar el proceso. Si no existe el curso podrás registrarlo
            haciendo clic en el boton 'Añadir'
          </p>
        </div>

        <Separator />
        <Tabs defaultValue="asign-course" className="space-y-6">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="asign-course">Asignar</TabsTrigger>
              <TabsTrigger value="create-course">Añadir</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="asign-course">
            <AsignCourseForm />
          </TabsContent>
          <TabsContent value="create-course">
            <CreateCourseForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
