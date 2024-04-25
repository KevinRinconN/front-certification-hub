import { useState } from "react";

export const useStepper = () => {
  const [currentStep, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<React.ReactElement[]>([]);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStep,
    step: steps[currentStep],
    stepsLength: steps.length,
    setSteps,
    goTo,
    next,
    back,
  };
};
