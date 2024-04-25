import { Separator } from "@/components/ui/separator";
import { DetailsForm } from "./form/details-form";

export const DetailsStepper = () => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Detalles del certificado</h3>
          <p className="text-sm text-muted-foreground">
            Completa los siguientes campos para realizar un nuevo certificado
          </p>
        </div>
        <Separator />
        <DetailsForm />
      </div>
    </>
  );
};
