import { FC, Fragment } from 'react';
import {
  type FieldErrors,
  type Control,
  useFieldArray,
  Controller,
  useWatch,
} from 'react-hook-form';
import { CalendarMinus, CalendarPlus } from 'lucide-react';

import { useSettingsStore } from '@/store/settingsStore';
import CustomDatePicker from '../shared/CustomDatePicker';
import CustomInput from '../shared/CustomInput';
import CustomButton from '../shared/CustomButton';
import { validateDateField } from '@/utils/dateValidation';
import { IReqStorativa } from '@/interfaces/storativa.interface';
import { InputEnumType } from '@/interfaces/input.interface';

interface CreateAdaptedPeriodsProps {
  control: Control<IReqStorativa>;
  errors: FieldErrors<IReqStorativa>;
}

const CreateAdaptedPeriods: FC<CreateAdaptedPeriodsProps> = ({
  control,
  errors,
}) => {
  const adaptedPeriods = useWatch({ control, name: 'adaptedPeriods' });
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const {
    fields: periodFields,
    append: appendPeriod,
    remove: removePeriod,
  } = useFieldArray({
    control,
    name: 'adaptedPeriods',
  });

  return (
    <Fragment>
      <h3 className="mt-8 px-7 pt-3 rounded-tr-lg bg-primary/15 dark:bg-primary/10 max-w-fit text-md font-medium text-dark/70 dark:text-light/70">
        Períodos Adaptados
      </h3>
      <div className="bg-primary/15 dark:bg-primary/10 px-6 py-7 rounded-b-md rounded-tr-md">
        {periodFields.map((field, index) => (
          <div
            key={field.id}
            className="grid gap-y-7 md:grid-cols-2 md:gap-x-6 xl:grid-cols-4 xl:gap-y-0"
          >
            <Controller
              name={`adaptedPeriods.${index}.from`}
              control={control}
              rules={{
                required: 'Fecha inicio obligatoria',
                validate: (from) => {
                  const to = adaptedPeriods[index]?.to;
                  return validateDateField(from, to, true);
                },
              }}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  inputName={`period-from-${index}`}
                  placeholder="Desde (dd/mm/aaaa)"
                  error={errors.adaptedPeriods?.[index]?.from?.message}
                />
              )}
            />
            <Controller
              name={`adaptedPeriods.${index}.to`}
              control={control}
              rules={{
                required: 'La fecha de fin es obligatoria',
                validate: (to) => {
                  const from = adaptedPeriods[index]?.from;
                  return validateDateField(to, from, false);
                },
              }}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  inputName={`period-to-${index}`}
                  placeholder="Hasta (dd/mm/aaaa)"
                  error={errors.adaptedPeriods?.[index]?.to?.message}
                />
              )}
            />
            <Controller
              name={`adaptedPeriods.${index}.place`}
              control={control}
              rules={{ required: 'El lugar es obligatorio' }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputType={InputEnumType.place}
                  inputName={`period-place-${index}`}
                  placeholder="Lugar"
                  error={errors.adaptedPeriods?.[index]?.place?.message}
                />
              )}
            />
            <div className="flex gap-x-6 w-full">
              <Controller
                name={`adaptedPeriods.${index}.name`}
                control={control}
                rules={{ required: 'El período es obligatorio' }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputType={InputEnumType.period}
                    inputName={`period-name-${index}`}
                    placeholder="Período"
                    error={errors.adaptedPeriods?.[index]?.name?.message}
                  />
                )}
              />
              <div className="flex w-fit">
                {index === periodFields.length - 1 ? (
                  <CustomButton
                    bgColor="bg-primary/10 hover:bg-primary/20"
                    textColor="text-primary"
                    Icon={CalendarPlus}
                    onClick={() =>
                      appendPeriod({ name: '', from: '', to: '', place: '' })
                    }
                    isDisabled={areSettingsOpen}
                  />
                ) : (
                  <CustomButton
                    bgColor="bg-red-500/10 hover:bg-red-500/20"
                    textColor="text-red-500"
                    Icon={CalendarMinus}
                    onClick={() => removePeriod(index)}
                    isDisabled={areSettingsOpen}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default CreateAdaptedPeriods;
