import { useLoaderData } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';

import { IReqStorativa } from '@/interfaces/storativa.interface';
import { useSettingsStore } from '@/store/settingsStore';
import CreateStepper from '@/components/private/create/CreateStepper';
import CreateFormData from '@/components/private/create/CreateFormData';
import {
  CreateFlowProvider,
  type CreateCatalogs,
} from '@/context/CreateFlowContext';

import { createClientLoader } from '@/lib/createClientLoader';
import {
  getCharacterCatalog,
  getContextCatalog,
  getGenderLabelCatalog,
  getStorySizeCatalog,
} from '@/services/catalog.service';
import FormSkeleton from '@/components/skeleton/FormSkeleton';

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
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  const methods = useForm<IReqStorativa>({
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
  const catalogs: CreateCatalogs = {
    characterCatalog,
    contextCatalog,
    storySizeCatalog,
    genderLabelCatalog,
  };

  return (
    <FormProvider {...methods}>
      <CreateFlowProvider catalogs={catalogs}>
        <div
          aria-hidden={areSettingsOpen}
          inert={areSettingsOpen}
          className="max-w-7xl mx-auto min-h-[calc(100vh-var(--nav-height))]"
        >
          <CreateStepper />
          <CreateFormData />
        </div>
      </CreateFlowProvider>
    </FormProvider>
  );
};

export default Create;
