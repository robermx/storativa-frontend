import { type FC, Fragment, useState } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { CalendarPlus, Check, Pencil, Trash2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type {
  AdaptedPeriod,
  IReqStorativa,
} from '@/interfaces/storativa.interface';
import { InputEnumType } from '@/interfaces/input.interface';
import { validateDateField } from '@/utils/dateValidation';
import { useCreateFlow } from '@/context/CreateFlowContext';

import CustomButton from '@/components/shared/CustomButton';
import CustomDatePicker from '@/components/shared/CustomDatePicker';
import CustomInput from '@/components/shared/CustomInput';

const emptyPeriod: AdaptedPeriod = {
  name: '',
  from: '',
  to: '',
  place: '',
};

const CreateAdaptedPeriods: FC = () => {
  const { t } = useTranslation('create');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<number | null>(null);
  const { control: createControl } = useFormContext<IReqStorativa>();
  const {
    fields: periods,
    append,
    remove,
    update,
  } = useFieldArray({
    control: createControl,
    name: 'adaptedPeriods',
  });
  const { canOpenStep, continueFromPeriods, isLocked } = useCreateFlow();
  const {
    control: periodControl,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<AdaptedPeriod>({
    mode: 'onChange',
    defaultValues: emptyPeriod,
  });
  const draft = useWatch({ control: periodControl });

  const savePeriod = (period: AdaptedPeriod) => {
    if (editingIndex === null) {
      append(period);
    } else {
      update(editingIndex, period);
      setEditingIndex(null);
    }
    reset(emptyPeriod);
  };

  const startEditing = (index: number) => {
    const period = periods[index];
    if (!period) return;

    setPendingRemoval(null);
    setEditingIndex(index);
    reset(period);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    reset(emptyPeriod);
  };

  const confirmRemoval = (index: number) => {
    remove(index);
    setPendingRemoval(null);
    if (editingIndex === index) cancelEditing();
    if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <Fragment>
      <p className="mb-6 text-sm text-dark/65 dark:text-light/65">
        {t('periods.description')}
      </p>

      {periods.length > 0 && (
        <div className="mb-7 divide-y divide-primary/15 dark:divide-light/10">
          {periods.map((period, index) => (
            <div
              key={period.id}
              className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-dark dark:text-light">
                  {period.name}
                </p>
                <p className="text-sm text-dark/65 dark:text-light/65">
                  {period.from} — {period.to} · {period.place}
                </p>
              </div>
              {pendingRemoval === index ? (
                <div className="flex gap-2 sm:w-52">
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-500/20 disabled:cursor-not-allowed"
                    onClick={() => confirmRemoval(index)}
                    disabled={isLocked}
                  >
                    {t('periods.delete')}
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-dark/10 px-3 py-2 text-sm font-semibold text-dark hover:bg-dark/20 dark:bg-light/10 dark:text-light dark:hover:bg-light/20 disabled:cursor-not-allowed"
                    onClick={() => setPendingRemoval(null)}
                    disabled={isLocked}
                  >
                    {t('periods.cancel')}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 sm:w-28">
                  <button
                    type="button"
                    aria-label={t('periods.editAriaLabel', { name: period.name })}
                    className="flex-1 rounded-md bg-primary/10 p-2 text-primary hover:bg-primary/20 disabled:cursor-not-allowed"
                    onClick={() => startEditing(index)}
                    disabled={isLocked}
                  >
                    <Pencil size={18} className="mx-auto" />
                  </button>
                  <button
                    type="button"
                    aria-label={t('periods.deleteAriaLabel', { name: period.name })}
                    className="flex-1 rounded-md bg-red-500/10 p-2 text-red-500 hover:bg-red-500/20 disabled:cursor-not-allowed"
                    onClick={() => setPendingRemoval(index)}
                    disabled={isLocked}
                  >
                    <Trash2 size={18} className="mx-auto" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-primary/15 pt-6 dark:border-light/10">
        <p className="mb-4 text-sm font-semibold text-dark dark:text-light">
          {editingIndex === null ? t('periods.add') : t('periods.edit')}
        </p>
        <div className="grid gap-y-7 md:grid-cols-2 md:gap-x-6 xl:grid-cols-4 xl:gap-y-0">
          <Controller
            name="from"
            control={periodControl}
            rules={{
              required: t('periods.validation.startRequired'),
              validate: (from) =>
                validateDateField(from, draft.to, true, {
                  invalidDate: t('periods.validation.invalidDate'),
                  startBeforeEnd: t('periods.validation.startBeforeEnd'),
                  endAfterStart: t('periods.validation.endAfterStart'),
                }),
            }}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                inputName="period-from"
                placeholder={t('periods.fields.from')}
                error={errors.from?.message}
              />
            )}
          />
          <Controller
            name="to"
            control={periodControl}
            rules={{
              required: t('periods.validation.endRequired'),
              validate: (to) =>
                validateDateField(to, draft.from, false, {
                  invalidDate: t('periods.validation.invalidDate'),
                  startBeforeEnd: t('periods.validation.startBeforeEnd'),
                  endAfterStart: t('periods.validation.endAfterStart'),
                }),
            }}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                inputName="period-to"
                placeholder={t('periods.fields.to')}
                error={errors.to?.message}
              />
            )}
          />
          <Controller
            name="place"
            control={periodControl}
            rules={{ required: t('periods.validation.placeRequired') }}
            render={({ field }) => (
              <CustomInput
                {...field}
                inputType={InputEnumType.place}
                inputName="period-place"
                placeholder={t('periods.fields.place')}
                error={errors.place?.message}
              />
            )}
          />
          <Controller
            name="name"
            control={periodControl}
            rules={{ required: t('periods.validation.periodRequired') }}
            render={({ field }) => (
              <CustomInput
                {...field}
                inputType={InputEnumType.period}
                inputName="period-name"
                placeholder={t('periods.fields.name')}
                error={errors.name?.message}
              />
            )}
          />
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="sm:w-56">
            <CustomButton
              variant="soft"
              icon={editingIndex === null ? <CalendarPlus /> : <Check />}
              onClick={() => void handleSubmit(savePeriod)()}
              disabled={!isValid || isLocked}
            >
              {editingIndex === null ? t('periods.add') : t('periods.saveChanges')}
            </CustomButton>
          </div>
          <div className="flex gap-3 sm:w-auto">
            {editingIndex !== null && (
              <div className="flex-1 sm:w-32">
                <CustomButton
                  variant="ghost"
                  icon={<X />}
                  onClick={cancelEditing}
                  disabled={isLocked}
                >
                  {t('periods.cancel')}
                </CustomButton>
              </div>
            )}
            <div className="flex-1 sm:w-44">
              <CustomButton
                variant="primary"
                disabled={
                  !canOpenStep(1) || periods.length === 0 || isDirty || isLocked
                }
                onClick={continueFromPeriods}
              >
                {t('periods.continue')}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateAdaptedPeriods;
