import { type FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useFormContext, useWatch } from 'react-hook-form';

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

const CreateFormData: FC = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<IReqStorativa>();
  const { activeStep, continueFromGenerals, goToStep, isLocked } =
    useCreateFlow();
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
    <form onSubmit={handleSubmit(onSubmit, () => goToStep(0))} noValidate>
      <CreateAlert submitError={submitError} />
      <div className={activeStep === 0 ? undefined : 'hidden'}>
        <>
          <CreateGenerals />
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
        <CreateAdaptedPeriods />
      </div>

      <div className={activeStep === 2 ? undefined : 'hidden'}>
        <>
          <CreateCharacter />
          <div className="px-6 py-7">
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
