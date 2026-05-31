import { useLoaderData } from 'react-router';
import { useForm } from 'react-hook-form';
import { LayersPlus } from 'lucide-react';

import { createClientLoader } from '@/lib/createClientLoader';
import {
  getCharacterCatalog,
  getContextCatalog,
  getGenderLabelCatalog,
  getStorySizeCatalog,
} from '@/services/catalog.service';
import { createUserStorativa } from '@/services/storativa.service';
import { useSettingsStore } from '@/store/settingsStore';
import CustomButton from '@/components/shared/CustomButton';
import FormSkeleton from '@/components/skeleton/FormSkeleton';
import { IReqStorativa } from '@/interfaces/storativa.interface';
import CreateGenerals from '@/components/create/CreateGenerals';
import CreateAdaptedPeriods from '@/components/create/CreateAdaptedPeriods';
import CreateCharacter from '@/components/create/CreateCharacter';

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
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IReqStorativa>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      centralIdea: '',
      adaptedPeriods: [{ name: '', from: '', to: '', place: '' }],
      characters: [
        {
          type: 0,
          name: '',
          social: '',
          physical: '',
          psychological: '',
        },
      ],
      contextType: [],
      storySize: 0,
      timeToComplete: '',
      initialBasedDate: '',
      genderLabels: [],
      content: '',
    },
  });

  const onSubmit = async (data: IReqStorativa) => {
    const created = await createUserStorativa(data);
    console.log('created', created);
  };

  return (
    <div
      aria-hidden={areSettingsOpen}
      inert={areSettingsOpen}
      className="max-w-6xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateGenerals
          control={control}
          errors={errors}
          contextCatalog={contextCatalog}
          genderLabelCatalog={genderLabelCatalog}
          storySizeCatalog={storySizeCatalog}
        />
        <CreateAdaptedPeriods control={control} errors={errors} />
        <CreateCharacter
          control={control}
          errors={errors}
          characterCatalog={characterCatalog}
        />

        <div className="py-7 px-6">
          <CustomButton
            buttonType="submit"
            bgColor="bg-primary"
            textColor="text-light"
            displayText={isSubmitting ? 'Creando...' : 'Crear Storativa'}
            isDisabled={!isValid || isSubmitting || areSettingsOpen}
            Icon={LayersPlus}
            size="md"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
