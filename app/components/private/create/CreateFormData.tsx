import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

import { createUserStorativa } from '@/services/storativa.service';
import {
  AdaptedPeriod,
  Character,
  IReqStorativa,
} from '@/interfaces/storativa.interface';
import CustomButton from '@/components/shared/CustomButton';
import CreateGenerals from './CreateGenerals';
import CreateAdaptedPeriods from './CreateAdaptedPeriods';
import CreateCharacter from './CreateCharacter';
import CreateAlert from './CreateAlert';
import { generalFields } from '@/constants/common/create.constants';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { LayersPlus } from 'lucide-react';
import { ICatalog } from '@/interfaces/catalog.interface';

interface CreateFormDataProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  control: Control<IReqStorativa, any, IReqStorativa>;
  errors: FieldErrors<IReqStorativa>;
  isValid: boolean;
  isSubmitting: boolean;
  isLocked: boolean;
  periods: AdaptedPeriod[];
  characters: Character[];
  setValue: UseFormSetValue<IReqStorativa>;
  trigger: UseFormTrigger<IReqStorativa>;
  handleSubmit: UseFormHandleSubmit<IReqStorativa, IReqStorativa>;
  hasCompletedGenerals: boolean;
  setHasCompletedGenerals: Dispatch<SetStateAction<boolean>>;
  setHasCompletedPeriods: Dispatch<SetStateAction<boolean>>;
  characterCatalog: ICatalog[];
  contextCatalog: ICatalog[];
  storySizeCatalog: ICatalog[];
  genderLabelCatalog: ICatalog[];
}

const CreateFormData: FC<CreateFormDataProps> = ({
  activeStep,
  setActiveStep,
  control,
  errors,
  isValid,
  isSubmitting,
  isLocked,
  periods,
  characters,
  setValue,
  trigger,
  handleSubmit,
  hasCompletedGenerals,
  setHasCompletedGenerals,
  setHasCompletedPeriods,
  characterCatalog,
  contextCatalog,
  storySizeCatalog,
  genderLabelCatalog,
}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const navigate = useNavigate();

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

  return (
    <form onSubmit={handleSubmit(onSubmit, () => setActiveStep(0))} noValidate>
      <CreateAlert submitError={submitError} />
      <div className={activeStep === 0 ? undefined : 'hidden'}>
        <>
          <CreateGenerals
            control={control}
            errors={errors}
            contextCatalog={contextCatalog}
            genderLabelCatalog={genderLabelCatalog}
            storySizeCatalog={storySizeCatalog}
          />
          <div className="py-8 px-6 sm:w-50 sm:ml-auto">
            <CustomButton
              variant="primary"
              disabled={isLocked}
              onClick={() => void continueFromGenerals()}
            >
              Continuar
            </CustomButton>
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
            updatePeriods(periods.filter((_, itemIndex) => itemIndex !== index))
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
            onAdd={(character) => updateCharacters([...characters, character])}
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
              type="submit"
              variant="primary"
              disabled={!isValid || characters.length === 0 || isLocked}
              icon={<LayersPlus />}
              size="md"
            >
              {isSubmitting ? 'Creando...' : 'Crear Storativa'}
            </CustomButton>
          </div>
        </>
      </div>
    </form>
  );
};

export default CreateFormData;
