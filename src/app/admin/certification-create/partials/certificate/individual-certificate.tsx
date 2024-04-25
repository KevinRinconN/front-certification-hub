import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ProgressDescription,
  ProgressIcon,
  Stepper,
  StepperContent,
  StepperProgress,
  StepperProgressItem,
} from "@/components/layout/common/stepper/stepper";
import { CourseStepper } from "./stepper/course/course-stepper";
import { StudentStepper } from "./stepper/student/student-stepper";
import { CompanyStepper } from "./stepper/company/company-stepper";
import { DetailsStepper } from "./stepper/details/details-stepper";
import { MasiveStepper } from "./stepper/masive/masive-stepper";

export const IndividualCertificate = () => {
  return (
    <Stepper className="mt-4">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="lg:max-w-xs w-full">
          <ProgressStepper />
        </div>
        <div className="flex-1 lg:max-w-3xl space-y-6">
          <StepperContent>
            <StudentStepper />
            <CompanyStepper />
            <CourseStepper />
            <DetailsStepper />
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
            <ProgressIcon>
              <UserIcon />
            </ProgressIcon>
            <ProgressDescription>Selecciona un estudiante</ProgressDescription>
          </StepperProgressItem>
          <StepperProgressItem step={1}>
            <ProgressIcon>
              <BriefcaseIcon />
            </ProgressIcon>
            <ProgressDescription>Asigna una empresa</ProgressDescription>
          </StepperProgressItem>
          <StepperProgressItem step={2}>
            <ProgressIcon>
              <AcademicCapIcon />
            </ProgressIcon>
            <ProgressDescription>Registrar curso</ProgressDescription>
          </StepperProgressItem>
          <StepperProgressItem step={3}>
            <ProgressIcon>
              <PencilIcon />
            </ProgressIcon>
            <ProgressDescription>Detalles del certificado</ProgressDescription>
          </StepperProgressItem>
        </StepperProgress>
      </CardContent>
    </Card>
  );
};
