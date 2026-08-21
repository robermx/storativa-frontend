import { type FC, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { InputEnumType } from '@/interfaces/input.interface';
import type { IReqStorativa } from '@/interfaces/storativa.interface';
import { isValidDate } from '@/utils/dateValidation';
import { useCreateFlow } from '@/context/CreateFlowContext';

import CustomInput from '@/components/shared/CustomInput';
import CustomMultiSelect from '@/components/shared/CustomMultiSelect';
import CustomSelect from '@/components/shared/CustomSelect';
import CustomTextArea from '@/components/shared/CustomTextArea';
import CustomDatePicker from '@/components/shared/CustomDatePicker';
import CustomButton from '@/components/shared/CustomButton';

const CreateGenerals: FC = () => {
  const {
    control,
    formState: { errors, isValid },
  } = useFormContext<IReqStorativa>();
  const {
    contextCatalog,
    genderLabelCatalog,
    storySizeCatalog,
    continueFromGenerals,
    isLocked,
  } = useCreateFlow();

  return (
    <Fragment>
      <div className="flex flex-col gap-y-7">
        <Controller
          name="title"
          control={control}
          rules={{
            required: 'Título obligatorio',
            minLength: { value: 4, message: 'Al menos 4 caracteres' },
          }}
          render={({ field }) => (
            <CustomInput
              {...field}
              inputType={InputEnumType.title}
              inputName="title"
              placeholder="Título"
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          name="centralIdea"
          control={control}
          rules={{
            required: 'Idea central obligatoria',
            minLength: { value: 4, message: 'Al menos 4 caracteres' },
          }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              inputName="centralIdea"
              placeholder="Idea Central"
              rows={6}
              error={errors.centralIdea?.message}
              maxChar={1000}
            />
          )}
        />

        <div className="flex flex-col gap-y-7 sm:flex-row sm:gap-y-0 sm:gap-x-6">
          <Controller
            name="contextType"
            control={control}
            rules={{ required: 'El tipo de contexto es obligatorio' }}
            render={({ field }) => (
              <CustomMultiSelect
                {...field}
                inputName="contextType"
                placeholder="Tipo de Contexto"
                options={contextCatalog}
                error={errors.contextType?.message}
              />
            )}
          />

          <Controller
            name="genderLabels"
            control={control}
            rules={{ required: 'El tipo de contexto es obligatorio' }}
            render={({ field }) => (
              <CustomMultiSelect
                {...field}
                inputName="genderLabel"
                placeholder="Géneros"
                options={genderLabelCatalog}
                error={errors.genderLabels?.message}
              />
            )}
          />
        </div>

        <div className="grid gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 ">
          <Controller
            name="initialBasedDate"
            control={control}
            rules={{
              required: 'La fecha inicial es obligatoria',
              validate: (date) => {
                if (!isValidDate(date)) {
                  return 'Fecha inválida (formato: dd/mm/aaaa)';
                }
                return true;
              },
            }}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                inputName="initialBasedDate"
                placeholder="Fecha del comienzo"
                error={errors.initialBasedDate?.message}
              />
            )}
          />

          <Controller
            name="storySize"
            control={control}
            rules={{
              required: 'El tamaño de la historia es obligatorio',
              validate: (value) =>
                value !== 0 || 'El tamaño de la historia es obligatorio',
            }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                inputName="storySize"
                placeholder="Tamaño de la Historia"
                options={storySizeCatalog}
                error={errors.storySize?.message}
              />
            )}
          />

          <Controller
            name="timeToComplete"
            control={control}
            rules={{
              required: 'El tiempo es obligatorio',
              validate: (value) =>
                /^[0-9]+$/.test(value as string) || 'Solo se permiten números',
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                value={field.value as string}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  field.onChange(numericValue);
                }}
                inputType={InputEnumType.time}
                inputName="timeToComplete"
                placeholder="Tiempo para completar (Días)"
                error={errors.timeToComplete?.message}
                maxLength={3}
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />
        </div>
      </div>
      <div className="mt-8 sm:w-60 sm:ml-auto">
        <CustomButton
          disabled={isLocked || !isValid}
          onClick={() => void continueFromGenerals()}
        >
          Continuar
        </CustomButton>
      </div>
    </Fragment>
  );
};

export default CreateGenerals;
