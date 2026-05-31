import { useLoaderData } from 'react-router';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import {
  CalendarMinus,
  CalendarPlus,
  LayersPlus,
  UserRoundMinus,
  UserRoundPlus,
} from 'lucide-react';

import { createClientLoader } from '@/lib/createClientLoader';
import {
  getCharacterCatalog,
  getContextCatalog,
  getGenderLabelCatalog,
  getStorySizeCatalog,
} from '@/services/catalog.service';
import { useSettingsStore } from '@/store/settingsStore';
import CustomInput from '@/components/shared/CustomInput';
import CustomButton from '@/components/shared/CustomButton';
import CustomTextArea from '@/components/shared/CustomTextArea';
import CustomDatePicker from '@/components/shared/CustomDatePicker';
import CustomSelect from '@/components/shared/CustomSelect';
import CustomMultiSelect from '@/components/shared/CustomMultiSelect';
import FormSkeleton from '@/components/skeleton/FormSkeleton';
import { isValidDate, validateDateField } from '@/utils/dateValidation';
import { ICreateFormData, InputEnumType } from '@/interfaces/input.interface';

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

const Create = () => {
  const {
    characterCatalog,
    contextCatalog,
    storySizeCatalog,
    genderLabelCatalog,
  } = useLoaderData<typeof clientLoader>();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ICreateFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      centralIdea: '',
      adaptedPeriods: [{ name: '', from: '', to: '', place: '' }],
      characters: [
        {
          type: 0,
          name: '',
          social: '',
          physical: '',
          psychological: '',
        },
      ],
      contextType: [],
      storySize: 0,
      timeToComplete: '',
      initialBasedDate: '',
      genderLabels: [],
      content: '',
    },
  });

  const adaptedPeriods = useWatch({ control, name: 'adaptedPeriods' });

  const {
    fields: periodFields,
    append: appendPeriod,
    remove: removePeriod,
  } = useFieldArray({
    control,
    name: 'adaptedPeriods',
  });

  const {
    fields: characterFields,
    append: appendCharacter,
    remove: removeCharacter,
  } = useFieldArray({
    control,
    name: 'characters',
  });

  const onSubmit = async (data: ICreateFormData) => {
    console.log(data);
  };

  return (
    <div
      aria-hidden={areSettingsOpen}
      inert={areSettingsOpen}
      className="max-w-6xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    /^[0-9]+$/.test(value) || 'Solo se permiten números',
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        '',
                      );
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

        <h3 className="mt-8 px-6 pt-3 rounded-tr-lg bg-primary/15 dark:bg-primary/10 max-w-fit text-md font-medium text-dark/70 dark:text-light/70">
          Personajes
        </h3>
        <div className="bg-primary/15 dark:bg-primary/10 px-6 py-7 rounded-b-md rounded-tr-md">
          {characterFields.map((field, index) => (
            <div
              key={field.id}
              className="pb-6 last:pb-0 flex flex-col gap-y-7"
            >
              <div className="flex flex-col gap-y-7 sm:flex-row sm:gap-x-6 sm:gap-y-0">
                <Controller
                  name={`characters.${index}.type`}
                  control={control}
                  rules={{
                    required: 'El tipo de personaje es obligatorio',
                    validate: (value) =>
                      value !== 0 || 'El tipo de personaje es obligatorio',
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      inputName={`character-type-${index}`}
                      placeholder="Tipo de Personaje"
                      options={characterCatalog}
                      error={errors.characters?.[index]?.type?.message}
                    />
                  )}
                />

                <Controller
                  name={`characters.${index}.name`}
                  control={control}
                  rules={{
                    required: 'El nombre del personaje es obligatorio',
                  }}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      inputType={InputEnumType.characterName}
                      inputName={`character-name-${index}`}
                      placeholder="Nombre del Personaje"
                      error={errors.characters?.[index]?.name?.message}
                    />
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 sm:gap-x-6 gap-y-7">
                <Controller
                  name={`characters.${index}.social`}
                  control={control}
                  rules={{ required: 'Rasgos sociales obligatorios' }}
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      inputName={`character-social-${index}`}
                      placeholder="Rasgos Sociales"
                      rows={3}
                      error={errors.characters?.[index]?.social?.message}
                    />
                  )}
                />

                <Controller
                  name={`characters.${index}.physical`}
                  control={control}
                  rules={{ required: 'Rasgos físicos obligatorios' }}
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      inputName={`character-physical-${index}`}
                      placeholder="Rasgos Físicos"
                      rows={3}
                      error={errors.characters?.[index]?.physical?.message}
                    />
                  )}
                />

                <Controller
                  name={`characters.${index}.psychological`}
                  control={control}
                  rules={{ required: 'Rasgos psicológicos obligatorios' }}
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      inputName={`character-psychological-${index}`}
                      placeholder="Rasgos Psicológicos"
                      rows={3}
                      error={errors.characters?.[index]?.psychological?.message}
                    />
                  )}
                />

                <div className="flex gap-x-6">
                  <Controller
                    name={`characters.${index}.additional`}
                    control={control}
                    render={({ field }) => (
                      <CustomTextArea
                        {...field}
                        inputName={`character-additional-${index}`}
                        placeholder="Rasgos Adicionales (Opcional)"
                        rows={3}
                      />
                    )}
                  />
                  <div className="w-fit flex">
                    {index === characterFields.length - 1 ? (
                      <CustomButton
                        bgColor="bg-primary/10 hover:bg-primary/20"
                        textColor="text-primary"
                        Icon={UserRoundPlus}
                        onClick={() =>
                          appendCharacter({
                            type: 0,
                            name: '',
                            social: '',
                            physical: '',
                            psychological: '',
                          })
                        }
                        isDisabled={areSettingsOpen}
                      />
                    ) : (
                      <CustomButton
                        bgColor="bg-red-500/10 hover:bg-red-500/20"
                        textColor="text-red-500"
                        Icon={UserRoundMinus}
                        onClick={() => removeCharacter(index)}
                        isDisabled={areSettingsOpen}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-7 px-6">
          <CustomButton
            buttonType="submit"
            bgColor="bg-primary"
            textColor="text-light"
            displayText={isSubmitting ? 'Creando...' : 'Crear Storativa'}
            isDisabled={!isValid || isSubmitting || areSettingsOpen}
            Icon={LayersPlus}
            size="md"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
