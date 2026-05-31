import { FC, Fragment } from 'react';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';

import CustomInput from '../shared/CustomInput';
import CustomMultiSelect from '../shared/CustomMultiSelect';
import CustomSelect from '../shared/CustomSelect';
import { InputEnumType } from '@/interfaces/input.interface';
import { IReqStorativa } from '@/interfaces/storativa.interface';
import CustomTextArea from '../shared/CustomTextArea';
import { Icatalog } from '@/interfaces/catalog.interface';
import { isValidDate } from '@/utils/dateValidation';
import CustomDatePicker from '../shared/CustomDatePicker';

interface CreateGeneralsProps {
  control: Control<IReqStorativa>;
  errors: FieldErrors<IReqStorativa>;
  contextCatalog: Icatalog[];
  genderLabelCatalog: Icatalog[];
  storySizeCatalog: Icatalog[];
}

const CreateGenerals: FC<CreateGeneralsProps> = ({
  control,
  errors,
  contextCatalog,
  genderLabelCatalog,
  storySizeCatalog,
}) => {
  return (
    <Fragment>
      <h3 className="mt-7 px-6 pt-3 rounded-tr-lg bg-primary/15 dark:bg-primary/10 max-w-fit text-md font-medium text-dark/70 dark:text-light/70">
        Datos Generales
      </h3>
      <div className="bg-primary/15 dark:bg-primary/10 px-6 py-7 rounded-b-md rounded-tr-md">
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
                  /^[0-9]+$/.test(value as string) ||
                  'Solo se permiten números',
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
                />
              )}
            />

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
                  placeholder="Fecha adatada a la obra"
                  error={errors.initialBasedDate?.message}
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <input
                  type="hidden"
                  {...field}
                  value="Are you ready for this?"
                />
              )}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateGenerals;
