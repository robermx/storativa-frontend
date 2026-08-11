import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';

import { IReqStorativa } from '@/interfaces/storativa.interface';
import { useSettingsStore } from '@/store/settingsStore';
import CreateStepper from '@/components/private/create/CreateStepper';
import CreateFormData from '@/components/private/create/CreateFormData';

import { createClientLoader } from '@/lib/createClientLoader';
import {
  getCharacterCatalog,
  getContextCatalog,
  getGenderLabelCatalog,
  getStorySizeCatalog,
} from '@/services/catalog.service';
import FormSkeleton from '@/components/skeleton/FormSkeleton';

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  services: [
    { key: 'characterCatalog', fn: getCharacterCatalog },
    { key: 'contextCatalog', fn: getContextCatalog },
    { key: 'storySizeCatalog', fn: getStorySizeCatalog },
    { key: 'genderLabelCatalog', fn: getGenderLabelCatalog },
  ],
});

export const HydrateFallback = () => <FormSkeleton />;

const Create = () => {
  const {
    characterCatalog,
    contextCatalog,
    storySizeCatalog,
    genderLabelCatalog,
  } = useLoaderData<typeof clientLoader>();

  const [activeStep, setActiveStep] = useState(0);
  const [hasCompletedGenerals, setHasCompletedGenerals] = useState(false);
  const [hasCompletedPeriods, setHasCompletedPeriods] = useState(false);
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IReqStorativa>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      centralIdea: '',
      adaptedPeriods: [],
      characters: [],
      contextType: [],
      storySize: 0,
      timeToComplete: '',
      initialBasedDate: '',
      genderLabels: [],
      content: '',
    },
  });
  const periods = useWatch({ control, name: 'adaptedPeriods' }) ?? [];
  const characters = useWatch({ control, name: 'characters' }) ?? [];
  const isLocked = areSettingsOpen || isSubmitting;

  return (
    <div
      aria-hidden={areSettingsOpen}
      inert={areSettingsOpen}
      className="max-w-7xl mx-auto min-h-[calc(100vh-var(--nav-height))]"
    >
      <CreateStepper
        activeStep={activeStep}
        characters={characters}
        periods={periods}
        isLocked={isLocked}
        setActiveStep={setActiveStep}
        hasCompletedGenerals={hasCompletedGenerals}
        hasCompletedPeriods={hasCompletedPeriods}
      />

      <CreateFormData
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        control={control}
        errors={errors}
        isValid={isValid}
        isSubmitting={isSubmitting}
        isLocked={isLocked}
        periods={periods}
        characters={characters}
        setValue={setValue}
        trigger={trigger}
        handleSubmit={handleSubmit}
        hasCompletedGenerals={hasCompletedGenerals}
        setHasCompletedGenerals={setHasCompletedGenerals}
        setHasCompletedPeriods={setHasCompletedPeriods}
        characterCatalog={characterCatalog}
        contextCatalog={contextCatalog}
        storySizeCatalog={storySizeCatalog}
        genderLabelCatalog={genderLabelCatalog}
      />
    </div>
  );
};

export default Create;
