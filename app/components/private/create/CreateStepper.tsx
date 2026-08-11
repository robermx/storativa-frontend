import { Dispatch, FC, SetStateAction } from 'react';
import { Check } from 'lucide-react';

import { AdaptedPeriod, Character } from '@/interfaces/storativa.interface';
import { createSteps } from '@/constants/common/create.constants';

interface CreateStepperProps {
  activeStep: number;
  characters: Character[];
  periods: AdaptedPeriod[];
  isLocked: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
  hasCompletedGenerals: boolean;
  hasCompletedPeriods: boolean;
}

const CreateStepper: FC<CreateStepperProps> = ({
  activeStep,
  characters,
  periods,
  isLocked,
  setActiveStep,
  hasCompletedGenerals,
  hasCompletedPeriods,
}) => {
  const canOpenStep = (stepIndex: number) => {
    if (stepIndex === 0) return true;
    if (stepIndex === 1) return hasCompletedGenerals;
    return hasCompletedGenerals && hasCompletedPeriods && periods.length > 0;
  };

  return (
    <div className="grid grid-cols-3" aria-label="Progreso del formulario">
      {createSteps.map((step, index) => {
        const isActive = activeStep === index;
        const isAvailable = canOpenStep(index);
        const isComplete =
          index === 0
            ? hasCompletedGenerals
            : index === 1
              ? hasCompletedPeriods
              : characters.length > 0;

        return (
          <button
            key={step}
            type="button"
            onClick={() => setActiveStep(index)}
            disabled={!isAvailable || isLocked}
            aria-current={isActive ? 'step' : undefined}
            className={`rounded-md px-4 py-3 text-left text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
              isActive
                ? 'bg-primary text-light'
                : isAvailable
                  ? 'bg-primary/10 text-dark hover:bg-primary/20 dark:text-light'
                  : 'bg-dark/5 text-dark/40 dark:bg-light/5 dark:text-light/40'
            }`}
          >
            <span className="mb-1 flex items-center gap-2 text-xs font-medium opacity-75">
              {isComplete && <Check size={14} />}
              {index + 1} de 3
            </span>
            {step}
          </button>
        );
      })}
    </div>
  );
};

export default CreateStepper;
