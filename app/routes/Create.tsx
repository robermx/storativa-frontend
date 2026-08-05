import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import { Check, LayersPlus, Sparkles } from 'lucide-react';

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
import {
  AdaptedPeriod,
  Character,
  IReqStorativa,
} from '@/interfaces/storativa.interface';
import CreateGenerals from '@/components/create/CreateGenerals';
import CreateAdaptedPeriods from '@/components/create/CreateAdaptedPeriods';
import CreateCharacter from '@/components/create/CreateCharacter';
import { getErrorMessage } from '@/utils/getErrorMessage';

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

const generalFields = [
  'title',
  'centralIdea',
  'contextType',
  'storySize',
  'timeToComplete',
  'initialBasedDate',
  'genderLabels',
] as const;

const steps = ['Datos generales', 'Períodos adaptados', 'Personajes'] as const;

const Create = () => {
  const navigate = useNavigate();
  const {
    characterCatalog,
    contextCatalog,
    storySizeCatalog,
    genderLabelCatalog,
  } = useLoaderData<typeof clientLoader>();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const [activeStep, setActiveStep] = useState(0);
  const [hasCompletedGenerals, setHasCompletedGenerals] = useState(false);
  const [hasCompletedPeriods, setHasCompletedPeriods] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const updatePeriods = (nextPeriods: AdaptedPeriod[]) => {
    setValue('adaptedPeriods', nextPeriods, { shouldDirty: true });
  };

  const updateCharacters = (nextCharacters: Character[]) => {
    setValue('characters', nextCharacters, { shouldDirty: true });
  };

  const continueFromGenerals = async () => {
    const areGeneralsValid = await trigger([...generalFields]);
    if (!areGeneralsValid) return;
    setHasCompletedGenerals(true);
    setActiveStep(1);
  };

  const continueFromPeriods = () => {
    if (periods.length === 0) return;
    setHasCompletedPeriods(true);
    setActiveStep(2);
  };

  const onSubmit = async (data: IReqStorativa) => {
    setSubmitError(null);
    if (periods.length === 0) {
      setActiveStep(1);
      return;
    }
    if (characters.length === 0) {
      setActiveStep(2);
      return;
    }

    const toIsoDate = (date: string) => {
      const [day, month, year] = date.split('/');
      return day && month && year ? `${year}-${month}-${day}` : date;
    };

    const adaptedData: IReqStorativa = {
      ...data,
      timeToComplete: Number(data.timeToComplete),
      initialBasedDate: toIsoDate(data.initialBasedDate),
      adaptedPeriods: data.adaptedPeriods.map((period) => ({
        ...period,
        from: toIsoDate(period.from),
        to: toIsoDate(period.to),
      })),
    };
    try {
      const storativa = await createUserStorativa(adaptedData);
      navigate(`/edition/${storativa._id}`, { replace: true });
    } catch (error: unknown) {
      setSubmitError(
        getErrorMessage(
          error,
          'No pudimos crear tu Storativa. Intenta de nuevo.',
        ),
      );
    }
  };

  const canOpenStep = (stepIndex: number) => {
    if (stepIndex === 0) return true;
    if (stepIndex === 1) return hasCompletedGenerals;
    return hasCompletedGenerals && hasCompletedPeriods && periods.length > 0;
  };

  return (
    <div
      aria-hidden={areSettingsOpen}
      inert={areSettingsOpen}
      className="max-w-7xl pt-8"
    >
      <div className="mx-6 mb-8 flex gap-4 rounded-md bg-primary/10 p-5 text-dark dark:text-light">
        <Sparkles className="mt-0.5 shrink-0 text-primary" size={23} />
        <div>
          <h1 className="text-lg font-semibold">
            Construye la base de tu Storativa
          </h1>
          <p className="mt-1 text-sm text-dark/70 dark:text-light/70">
            Estos detalles guían la historia, el ritmo y sus personajes. Solo
            toma unos minutos; avanzarás por etapas y podrás revisar cada
            elemento antes de crearla.
          </p>
        </div>
      </div>

      <div
        className="mx-6 mb-8 grid gap-3 sm:grid-cols-3"
        aria-label="Progreso del formulario"
      >
        {steps.map((step, index) => {
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

      <form
        onSubmit={handleSubmit(onSubmit, () => setActiveStep(0))}
        noValidate
      >
        {submitError && (
          <div
            role="alert"
            className="mx-6 mb-6 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
          >
            {submitError}
          </div>
        )}
        <div className={activeStep === 0 ? undefined : 'hidden'}>
          <>
            <CreateGenerals
              control={control}
              errors={errors}
              contextCatalog={contextCatalog}
              genderLabelCatalog={genderLabelCatalog}
              storySizeCatalog={storySizeCatalog}
            />
            <div className="px-6 py-7 sm:w-44">
              <CustomButton
                bgColor="bg-primary"
                textColor="text-light"
                displayText="Continuar"
                isDisabled={isLocked}
                onClick={() => void continueFromGenerals()}
              />
            </div>
          </>
        </div>

        <div className={activeStep === 1 ? undefined : 'hidden'}>
          <CreateAdaptedPeriods
            periods={periods}
            onAdd={(period) => updatePeriods([...periods, period])}
            onUpdate={(index, period) =>
              updatePeriods(
                periods.map((item, itemIndex) =>
                  itemIndex === index ? period : item,
                ),
              )
            }
            onRemove={(index) =>
              updatePeriods(
                periods.filter((_, itemIndex) => itemIndex !== index),
              )
            }
            onContinue={continueFromPeriods}
            canContinue={hasCompletedGenerals && periods.length > 0}
            isDisabled={isLocked}
          />
        </div>

        <div className={activeStep === 2 ? undefined : 'hidden'}>
          <>
            <CreateCharacter
              characters={characters}
              characterCatalog={characterCatalog}
              onAdd={(character) =>
                updateCharacters([...characters, character])
              }
              onUpdate={(index, character) =>
                updateCharacters(
                  characters.map((item, itemIndex) =>
                    itemIndex === index ? character : item,
                  ),
                )
              }
              onRemove={(index) =>
                updateCharacters(
                  characters.filter((_, itemIndex) => itemIndex !== index),
                )
              }
              isDisabled={isLocked}
            />
            <div className="px-6 py-7 sm:w-56">
              <CustomButton
                buttonType="submit"
                bgColor="bg-primary"
                textColor="text-light"
                displayText={isSubmitting ? 'Creando...' : 'Crear Storativa'}
                isDisabled={!isValid || characters.length === 0 || isLocked}
                Icon={LayersPlus}
                size="md"
              />
            </div>
          </>
        </div>
      </form>
    </div>
  );
};

export default Create;
