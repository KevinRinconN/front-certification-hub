"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AsignCompanyForm } from "./form/asign-company-form";
import { CreateCompanyForm } from "./form/create-company-form";

export const CompanyStepper = () => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Registra una empresa</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona una empresa para asignarle al estudiante. Utiliza la
            lista desplegable para elegir la empresa adecuada. Si no existe la
            empresa podrás registrarla haciendo clic en el boton 'Añadir'.
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="asign-company" className="space-y-6">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="asign-company">Asignar</TabsTrigger>
              <TabsTrigger value="create-company">Añadir</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="asign-company">
            <AsignCompanyForm />
          </TabsContent>
          <TabsContent value="create-company">
            <CreateCompanyForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
