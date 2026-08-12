import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { ICatalog } from '@/interfaces/catalog.interface';
import type { IReqStorativa } from '@/interfaces/storativa.interface';
import { generalFields } from '@/constants/common/create.constants';
import { useOverlayPanelStore } from '@/store/overlayPanelStore';

export type CreateStep = 0 | 1 | 2;

export interface CreateCatalogs {
  characterCatalog: ICatalog[];
  contextCatalog: ICatalog[];
  storySizeCatalog: ICatalog[];
  genderLabelCatalog: ICatalog[];
}

interface CreateFlowContextValue extends CreateCatalogs {
  activeStep: CreateStep;
  isLocked: boolean;
  periodsCount: number;
  charactersCount: number;
  canOpenStep: (step: CreateStep) => boolean;
  isStepComplete: (step: CreateStep) => boolean;
  goToStep: (step: CreateStep) => void;
  continueFromGenerals: () => Promise<void>;
  continueFromPeriods: () => void;
}

interface CreateFlowProviderProps extends PropsWithChildren {
  catalogs: CreateCatalogs;
}

const CreateFlowContext = createContext<CreateFlowContextValue | null>(null);

export const CreateFlowProvider: FC<CreateFlowProviderProps> = ({
  catalogs,
  children,
}) => {
  const { control, trigger, formState } = useFormContext<IReqStorativa>();
  const isSettingsPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'settings',
  );
  const [activeStep, setActiveStep] = useState<CreateStep>(0);
  const [hasCompletedGenerals, setHasCompletedGenerals] = useState(false);
  const [hasCompletedPeriods, setHasCompletedPeriods] = useState(false);
  const periods = useWatch({ control, name: 'adaptedPeriods' }) ?? [];
  const characters = useWatch({ control, name: 'characters' }) ?? [];
  const isLocked = isSettingsPanelOpen || formState.isSubmitting;

  const canOpenStep = useCallback(
    (step: CreateStep) => {
      if (step === 0) return true;
      if (step === 1) return hasCompletedGenerals;

      return hasCompletedGenerals && hasCompletedPeriods && periods.length > 0;
    },
    [hasCompletedGenerals, hasCompletedPeriods, periods.length],
  );

  const isStepComplete = useCallback(
    (step: CreateStep) => {
      if (step === 0) return hasCompletedGenerals;
      if (step === 1) return hasCompletedPeriods;

      return characters.length > 0;
    },
    [characters.length, hasCompletedGenerals, hasCompletedPeriods],
  );

  const goToStep = useCallback(
    (step: CreateStep) => {
      if (!canOpenStep(step)) return;
      setActiveStep(step);
    },
    [canOpenStep],
  );

  const continueFromGenerals = useCallback(async () => {
    if (isLocked) return;

    const areGeneralsValid = await trigger([...generalFields]);
    if (!areGeneralsValid) return;

    setHasCompletedGenerals(true);
    setActiveStep(1);
  }, [isLocked, trigger]);

  const continueFromPeriods = useCallback(() => {
    if (isLocked || !canOpenStep(1) || periods.length === 0) return;

    setHasCompletedPeriods(true);
    setActiveStep(2);
  }, [canOpenStep, isLocked, periods.length]);

  const value = useMemo<CreateFlowContextValue>(
    () => ({
      ...catalogs,
      activeStep,
      isLocked,
      periodsCount: periods.length,
      charactersCount: characters.length,
      canOpenStep,
      isStepComplete,
      goToStep,
      continueFromGenerals,
      continueFromPeriods,
    }),
    [
      activeStep,
      canOpenStep,
      catalogs,
      characters.length,
      continueFromGenerals,
      continueFromPeriods,
      goToStep,
      isLocked,
      isStepComplete,
      periods.length,
    ],
  );

  return (
    <CreateFlowContext.Provider value={value}>
      {children}
    </CreateFlowContext.Provider>
  );
};

export const useCreateFlow = () => {
  const context = useContext(CreateFlowContext);

  if (!context) {
    throw new Error('useCreateFlow debe usarse dentro de CreateFlowProvider.');
  }

  return context;
};
