"use client";
import React, { ReactElement, createContext, useEffect } from "react";
import { useStepper } from "./useStepper";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/24/outline";

interface StepperContextProps {
  currentStep: number;
  step: ReactElement;
  stepsLength: number;
  next(): void;
  back(): void;
  setSteps(step: ReactElement[]): void;
  goTo(step: number): void;
}

const StepperContext = React.createContext({} as StepperContextProps);

const useContextStepper = () => {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error("useContextStepper must be used within a <Stepper />");
  }

  return context;
};

export const Stepper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const stepper = useStepper();
  return (
    <StepperContext.Provider value={{ ...stepper }}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </StepperContext.Provider>
  );
});

export const StepperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { step, setSteps } = useContextStepper();
  useEffect(() => {
    setSteps(children as ReactElement[]);
  }, []);

  return (
    <div ref={ref} {...props}>
      {step}
    </div>
  );
});

export const StepperProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { currentStep } = useContextStepper();
  const stepSelectedIndex = currentStep;
  const stepProgressItem = children as ReactElement<
    typeof StepperProgressItem
  >[];
  return (
    <div ref={ref} className={cn("flex flex-col ", className)} {...props}>
      {stepProgressItem.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item}
            {index + 1 < stepProgressItem.length && (
              <div
                className={cn(
                  "border-l-2 h-6 ml-5",
                  stepSelectedIndex <= index && "border-dashed"
                )}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
});

interface ProgreessItemContextProps {
  currentStep: number;
  step: number;
}

const ProgressItemContext = React.createContext(
  {} as ProgreessItemContextProps
);

const useContextProgressItem = () => {
  const context = React.useContext(ProgressItemContext);

  if (!context) {
    throw new Error(
      "useContextProgressItem must be used within a <StepperProgressItem />"
    );
  }

  return context;
};

interface ProgressItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
}

export const StepperProgressItem = React.forwardRef<
  HTMLDivElement,
  ProgressItemProps
>(({ className, children, step = 0, ...props }, ref) => {
  const { currentStep } = useContextStepper();
  return (
    <div
      ref={ref}
      className={cn("flex gap-4 items-center", className)}
      {...props}
    >
      <ProgressItemContext.Provider
        value={{
          currentStep,
          step,
        }}
      >
        {children}
      </ProgressItemContext.Provider>
    </div>
  );
});

interface StepperIconProps extends React.HTMLAttributes<HTMLDivElement> {
  classSelected?: string;
  classCompleted?: string;
}

export const ProgressIcon = React.forwardRef<HTMLDivElement, StepperIconProps>(
  ({ className, classCompleted, classSelected, children, ...props }, ref) => {
    const { currentStep, step } = useContextProgressItem();
    const isSelected = currentStep == step;
    const isCompleted = currentStep > step;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center text-lg font-bold bg-muted text-muted-foreground rounded-md w-10 h-10 p-3",
          className,
          isSelected && cn("bg-primary text-white", classSelected),
          isCompleted && cn("bg-muted text-primary", classCompleted)
        )}
        {...props}
      >
        {isCompleted ? <CheckIcon className="w-full" /> : children}
      </div>
    );
  }
);

export const ProgressDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children }, ref) => {
  const { stepsLength } = useContextStepper();
  const { currentStep, step } = useContextProgressItem();
  const isSelected = currentStep == step;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col justify-center text-secondary", className)}
    >
      <span className={cn("text-xs  font-bold", !isSelected && "hidden")}>
        Paso {step + 1}/{stepsLength}
      </span>
      <p
        className={cn(
          "text-sm font-medium text-muted-foreground",
          isSelected && "text-card-foreground"
        )}
      >
        {children}
      </p>
    </div>
  );
});

interface StepperControlProps {
  children: ({}: childrenProps) => JSX.Element;
}
interface childrenProps {
  next(): void;
}

export const StepperControl = ({ children }: StepperControlProps) => {
  const { next } = useContextStepper();
  return <>{children({ next })}</>;
};

export const StepperNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ onClick, variant = "default", ...props }, ref) => {
  const { next } = useContextStepper();
  return <Button ref={ref} {...props} variant={variant} onClick={next} />;
});

export const StepperPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", ...props }, ref) => {
  const context = useContextStepper();
  return (
    <Button ref={ref} {...props} variant={variant} onClick={context.back} />
  );
});
