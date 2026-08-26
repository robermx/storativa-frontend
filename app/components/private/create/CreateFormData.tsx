import { type FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { createUserStorativa } from '@/services/storativa.service';
import type { IReqStorativa } from '@/interfaces/storativa.interface';
import CustomButton from '@/components/shared/CustomButton';
import CreateGenerals from './CreateGenerals';
import CreateAdaptedPeriods from './CreateAdaptedPeriods';
import CreateCharacter from './CreateCharacter';
import CreateAlert from './CreateAlert';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { LayersPlus } from 'lucide-react';
import { useCreateFlow } from '@/context/CreateFlowContext';
import { useLanguageStore } from '@/store/languageStore';

const CreateFormData: FC = () => {
  const { t } = useTranslation('create');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const language = useLanguageStore((state) => state.language);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<IReqStorativa>();
  const { activeStep, goToStep, isLocked } = useCreateFlow();
  const characters = useWatch({ control, name: 'characters' }) ?? [];

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

    const adaptedData: IReqStorativa = {
      ...data,
      timeToComplete: Number(data.timeToComplete),
      initialBasedDate: toIsoDate(data.initialBasedDate),
      language,
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

        return characterData;
      }),
    };
    try {
      const storativa = await createUserStorativa(adaptedData);
      navigate(`/edition/${storativa._id}`, { replace: true });
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error, t('submit.failed')));
    }
  };

  return (
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
  );
};

export default CreateFormData;
