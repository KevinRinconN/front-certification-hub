import {
  ProgressDescription,
  ProgressIcon,
  Stepper,
  StepperContent,
  StepperProgress,
  StepperProgressItem,
} from "@/components/layout/common/stepper/stepper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AcademicCapIcon,
  ArrowUpTrayIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { MasiveStepper } from "./stepper/masive/masive-stepper";
import { DetailsStepper } from "./stepper/details/details-stepper";
import { CourseStepper } from "./stepper/course/course-stepper";

export const MasiveExcelCertificate = () => {
  return (
    <Stepper className="mt-4">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="lg:max-w-xs w-full">
          <ProgressStepper />
        </div>
        <div className="flex-1 lg:max-w-3xl space-y-6">
          <StepperContent>
            <DetailsStepper />
            <CourseStepper />
            <MasiveStepper />
          </StepperContent>
        </div>
      </div>
    </Stepper>
  );
};

const ProgressStepper = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certificacion por estudiante</CardTitle>
        <CardDescription>Realiza los siguientes pasos</CardDescription>
      </CardHeader>
      <CardContent>
        <StepperProgress>
          <StepperProgressItem step={0}>
            <ProgressIcon classSelected="bg-secondary">
              <PencilIcon />
            </ProgressIcon>
            <ProgressDescription>Detalles del certificado</ProgressDescription>
          </StepperProgressItem>
          <StepperProgressItem step={1}>
            <ProgressIcon classSelected="bg-secondary">
              <AcademicCapIcon />
            </ProgressIcon>
            <ProgressDescription>Registrar curso</ProgressDescription>
          </StepperProgressItem>
          <StepperProgressItem step={2}>
            <ProgressIcon classSelected="bg-secondary">
              <ArrowUpTrayIcon />
            </ProgressIcon>
            <ProgressDescription>Ingreso masivo excel</ProgressDescription>
          </StepperProgressItem>
        </StepperProgress>
      </CardContent>
    </Card>
  );
};
