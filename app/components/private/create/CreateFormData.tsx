import { type FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { createUserStorativa } from '@/services/storativa.service';
import type {
  CatalogReference,
  CreateStorativaPayload,
  IReqStorativa,
  IResStorativa,
} from '@/interfaces/storativa.interface';
import type { ICatalog } from '@/interfaces/catalog.interface';
import CustomButton from '@/components/shared/CustomButton';
import CreateGenerals from './CreateGenerals';
import CreateAdaptedPeriods from './CreateAdaptedPeriods';
import CreateCharacter from './CreateCharacter';
import CreateAlert from './CreateAlert';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { LayersPlus } from 'lucide-react';
import { useCreateFlow } from '@/context/CreateFlowContext';
import { useLanguageStore } from '@/store/languageStore';
import CustomDialog from '@/components/shared/CustomDialog';
import { isAiFeatureEnabled } from '@/utils/aiFeature';

const CreateFormData: FC = () => {
  const { t } = useTranslation('create');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdStorativa, setCreatedStorativa] =
    useState<IResStorativa | null>(null);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const generatePanoramaRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const language = useLanguageStore((state) => state.language);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<IReqStorativa>();
  const {
    activeStep,
    goToStep,
    isLocked,
    characterCatalog,
    contextCatalog,
    storySizeCatalog,
    genderLabelCatalog,
  } = useCreateFlow();
  const characters = useWatch({ control, name: 'characters' }) ?? [];

  const navigateToEdition = (requestInitialPanorama = false) => {
    if (!createdStorativa) return;

    setIsAiDialogOpen(false);
    navigate(`/edition/${createdStorativa._id}`, {
      replace: true,
      ...(requestInitialPanorama
        ? { state: { initialPanoramaRequested: true } }
        : {}),
    });
  };

  const onSubmit = async (data: IReqStorativa) => {
    setSubmitError(null);
    if (data.adaptedPeriods.length === 0) {
      goToStep(1);
      return;
    }
    if (data.characters.length === 0) {
      goToStep(2);
      return;
    }

    const toIsoDate = (date: string) => {
      const [day, month, year] = date.split('/');
      return day && month && year ? `${year}-${month}-${day}` : date;
    };

    const getCatalogReference = (
      catalog: ICatalog[],
      value: number,
      catalogName: string,
    ): CatalogReference => {
      const entry = catalog.find((item) => item.value === value);
      if (!entry) {
        throw new Error(`La opción seleccionada no existe en ${catalogName}.`);
      }

      return { key: entry.key, value: entry.value };
    };

    try {
      const adaptedData: CreateStorativaPayload = {
        ...data,
        timeToComplete: Number(data.timeToComplete),
        initialBasedDate: toIsoDate(data.initialBasedDate),
        language,
        contextType: data.contextType.map((value) =>
          getCatalogReference(contextCatalog, value, 'tipos de contexto'),
        ),
        storySize: getCatalogReference(
          storySizeCatalog,
          data.storySize,
          'tamaños de historia',
        ),
        genderLabels: data.genderLabels.map((value) =>
          getCatalogReference(genderLabelCatalog, value, 'géneros'),
        ),
        adaptedPeriods: data.adaptedPeriods.map((period) => {
          // useFieldArray adds an internal `id` for rendering. It is not part
          // of the API contract for a new adapted period.
          const { id: _fieldId, ...periodData } = period as typeof period & {
            id?: string;
          };

          return {
            ...periodData,
            from: toIsoDate(period.from),
            to: toIsoDate(period.to),
          };
        }),
        characters: data.characters.map((character) => {
          const { id: _fieldId, ...characterData } =
            character as typeof character & {
              id?: string;
            };

          return {
            ...characterData,
            typeKey: getCatalogReference(
              characterCatalog,
              character.type,
              'tipos de personaje',
            ).key,
          };
        }),
      };
      const storativa = await createUserStorativa(adaptedData);
      if (isAiFeatureEnabled) {
        setCreatedStorativa(storativa);
        setIsAiDialogOpen(true);
        return;
      }

      navigate(`/edition/${storativa._id}`, { replace: true });
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error, t('submit.failed')));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, () => goToStep(0))} noValidate>
        <CreateAlert submitError={submitError} />
        <div className={activeStep === 0 ? 'py-6 px-4 min-h-140' : 'hidden'}>
          <CreateGenerals />
        </div>

        <div className={activeStep === 1 ? 'py-6 px-4 min-h-140' : 'hidden'}>
          <CreateAdaptedPeriods />
        </div>

        <div className={activeStep === 2 ? 'py-6 px-4 min-h-140' : 'hidden'}>
          <>
            <CreateCharacter />
            <div className="py-7">
              <CustomButton
                type="submit"
                variant="primary"
                disabled={!isValid || characters.length === 0 || isLocked}
                icon={<LayersPlus />}
                size="md"
              >
                {isSubmitting ? t('submit.creating') : t('submit.create')}
              </CustomButton>
            </div>
          </>
        </div>
      </form>

      <CustomDialog
        openDialog={isAiDialogOpen}
        onCloseDialog={() => navigateToEdition()}
        initialFocus={generatePanoramaRef}
        title={t('aiDialog.title')}
        subtitle={t('aiDialog.description')}
        closeLabel={t('aiDialog.notNow')}
      >
        <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
          <CustomButton onClick={() => navigateToEdition()} variant="outline">
            {t('aiDialog.notNow')}
          </CustomButton>
          <CustomButton
            ref={generatePanoramaRef}
            onClick={() => navigateToEdition(true)}
          >
            {t('aiDialog.generate')}
          </CustomButton>
        </div>
      </CustomDialog>
    </>
  );
};

export default CreateFormData;
