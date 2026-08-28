import { type FC } from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { createSteps } from '@/constants/common/create.constants';
import { type CreateStep, useCreateFlow } from '@/context/CreateFlowContext';

const CreateStepper: FC = () => {
  const { t } = useTranslation('create');
  const { activeStep, canOpenStep, goToStep, isLocked, isStepComplete } =
    useCreateFlow();

  return (
    <nav className="grid grid-cols-3" aria-label={t('steps.progressAriaLabel')}>
      {createSteps.map((step, index) => {
        const stepIndex = index as CreateStep;
        const isActive = activeStep === stepIndex;
        const isAvailable = canOpenStep(stepIndex);
        const isComplete = isStepComplete(stepIndex);

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => goToStep(stepIndex)}
            disabled={!isAvailable || isLocked}
            aria-current={isActive ? 'step' : undefined}
            className={`rounded-md px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed ${
              isActive
                ? 'bg-primary text-light'
                : isAvailable
                  ? 'bg-primary/10 text-dark hover:bg-primary/20 dark:text-light'
                  : 'bg-dark/5 text-dark/40 dark:bg-light/5 dark:text-light/40'
            }`}
          >
            <span className="mb-1 flex items-center gap-2 text-xs font-medium opacity-75">
              {isComplete && <Check size={14} />}
              {t('steps.progress', { current: index + 1, total: createSteps.length })}
            </span>
            {t(`steps.${step.id}`)}
          </button>
        );
      })}
    </nav>
  );
};

export default CreateStepper;
