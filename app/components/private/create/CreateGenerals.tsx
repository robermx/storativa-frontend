import { type FC, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('create');
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
            required: t('general.validation.titleRequired'),
            minLength: {
              value: 4,
              message: t('general.validation.minimumCharacters', { count: 4 }),
            },
          }}
          render={({ field }) => (
            <CustomInput
              {...field}
              inputType={InputEnumType.title}
              inputName="title"
              placeholder={t('general.fields.title')}
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          name="centralIdea"
          control={control}
          rules={{
            required: t('general.validation.centralIdeaRequired'),
            minLength: {
              value: 4,
              message: t('general.validation.minimumCharacters', { count: 4 }),
            },
          }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              inputName="centralIdea"
              placeholder={t('general.fields.centralIdea')}
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
            rules={{ required: t('general.validation.contextRequired') }}
            render={({ field }) => (
              <CustomMultiSelect
                {...field}
                inputName="contextType"
                placeholder={t('general.fields.contextType')}
                options={contextCatalog}
                error={errors.contextType?.message}
              />
            )}
          />

          <Controller
            name="genderLabels"
            control={control}
            rules={{ required: t('general.validation.genresRequired') }}
            render={({ field }) => (
              <CustomMultiSelect
                {...field}
                inputName="genderLabel"
                placeholder={t('general.fields.genres')}
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
              required: t('general.validation.initialDateRequired'),
              validate: (date) => {
                if (!isValidDate(date)) {
                  return t('general.validation.invalidDate');
                }
                return true;
              },
            }}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                inputName="initialBasedDate"
                placeholder={t('general.fields.initialDate')}
                error={errors.initialBasedDate?.message}
              />
            )}
          />

          <Controller
            name="storySize"
            control={control}
            rules={{
              required: t('general.validation.storySizeRequired'),
              validate: (value) =>
                value !== 0 || t('general.validation.storySizeRequired'),
            }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                inputName="storySize"
                placeholder={t('general.fields.storySize')}
                options={storySizeCatalog}
                error={errors.storySize?.message}
              />
            )}
          />

          <Controller
            name="timeToComplete"
            control={control}
            rules={{
              required: t('general.validation.timeRequired'),
              validate: (value) =>
                /^[0-9]+$/.test(value as string) ||
                t('general.validation.numbersOnly'),
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
                placeholder={t('general.fields.timeToComplete')}
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
          {t('general.continue')}
        </CustomButton>
      </div>
    </Fragment>
  );
};

export default CreateGenerals;
