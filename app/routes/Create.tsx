import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import { Plus, Trash2 } from 'lucide-react';

import { createClientLoader } from '@/lib/createClientLoader';
import {
  getCharacterCatalog,
  getContextCatalog,
  getGenderLabelCatalog,
  getStorySizeCatalog,
} from '@/services/catalog.service';

import FormSkeleton from '../components/skeleton/FormSkeleton';
import CustomInput from '@/components/shared/CustomInput';
import CustomButton from '@/components/shared/CustomButton';
import CustomTextArea from '@/components/shared/CustomTextArea';
import CustomCalendarInput from '@/components/shared/CustomCalendarInput';
import CustomSelect from '@/components/shared/CustomSelect';
import TagsSelect from '@/components/shared/TagsSelect';
import { ICreateFormData, InputEnumType } from '@/interfaces/input.interface';

const TAGS_OPTIONS = [
  'novel',
  'short story',
  'fantasy',
  'science fiction',
  'romance',
  'mystery',
  'thriller',
  'horror',
  'adventure',
  'historical',
];

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
  const { characterCatalog, contextCatalog, storySizeCatalog } =
    useLoaderData<typeof clientLoader>();

  // console.log({ characterCatalog, contextCatalog, storySizeCatalog });

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
      contextType: 0,
      storySize: 0,
      timeToComplete: '',
      initialBasedDate: '',
      tags: [],
      content: '',
    },
  });

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
    <div className="flex justify-center">
      <div className="w-full max-w-4xl px-6 lg:px-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'El título es obligatorio' }}
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
            rules={{ required: 'La idea central es obligatoria' }}
            render={({ field }) => (
              <CustomTextArea
                {...field}
                inputName="centralIdea"
                placeholder="Idea Central"
                rows={6}
                error={errors.centralIdea?.message}
              />
            )}
          />

          <h3 className="text-lg font-semibold text-dark dark:text-light">
            Períodos Adaptados
          </h3>
          {periodFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <Controller
                name={`adaptedPeriods.${index}.from`}
                control={control}
                rules={{ required: 'La fecha de inicio es obligatoria' }}
                render={({ field }) => (
                  <CustomCalendarInput
                    {...field}
                    inputName={`period-from-${index}`}
                    placeholder="Desde"
                    error={errors.adaptedPeriods?.[index]?.from?.message}
                  />
                )}
              />
              <Controller
                name={`adaptedPeriods.${index}.to`}
                control={control}
                rules={{ required: 'La fecha de fin es obligatoria' }}
                render={({ field }) => (
                  <CustomCalendarInput
                    {...field}
                    inputName={`period-to-${index}`}
                    placeholder="Hasta"
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
              {index === periodFields.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    appendPeriod({ name: '', from: '', to: '', place: '' })
                  }
                  className="flex items-center gap-2 p-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
                >
                  <Plus />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removePeriod(index)}
                  className="flex items-center gap-2 p-1 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg transition-colors font-medium"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}

          <h3 className="text-lg font-semibold text-dark dark:text-light">
            Personajes
          </h3>
          {characterFields.map((field, index) => (
            <div key={field.id} className="flex gap-x-3">
              <div className="grid">
                <Controller
                  name={`characters.${index}.type`}
                  control={control}
                  rules={{ required: 'El tipo de personaje es obligatorio' }}
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

              <div className="grid grid-cols-2 gap-x-3 flex-1">
                <Controller
                  name={`characters.${index}.social`}
                  control={control}
                  rules={{ required: 'Rasgos sociales obligatorios' }}
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      inputName={`character-social-${index}`}
                      placeholder="Rasgos Sociales"
                      rows={2}
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
                      rows={2}
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
                      rows={2}
                      error={errors.characters?.[index]?.psychological?.message}
                    />
                  )}
                />

                <Controller
                  name={`characters.${index}.additional`}
                  control={control}
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      inputName={`character-additional-${index}`}
                      placeholder="Rasgos Adicionales (Opcional)"
                      rows={2}
                    />
                  )}
                />
              </div>
              {index === characterFields.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    appendCharacter({
                      type: 0,
                      name: '',
                      social: '',
                      physical: '',
                      psychological: '',
                    })
                  }
                  className="flex items-center gap-2 p-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
                >
                  <Plus />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeCharacter(index)}
                  className="flex items-center gap-2 p-1 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg transition-colors font-medium"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}

          <div className="">
            <Controller
              name="contextType"
              control={control}
              rules={{ required: 'El tipo de contexto es obligatorio' }}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  inputName="contextType"
                  placeholder="Tipo de Contexto"
                  options={contextCatalog}
                  error={errors.contextType?.message}
                />
              )}
            />

            <Controller
              name="storySize"
              control={control}
              rules={{ required: 'El tamaño de la historia es obligatorio' }}
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
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Solo se permiten números',
                },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputType={InputEnumType.time}
                  inputName="timeToComplete"
                  placeholder="Tiempo para Completar (minutos)"
                  error={errors.timeToComplete?.message}
                />
              )}
            />

            <Controller
              name="initialBasedDate"
              control={control}
              rules={{ required: 'La fecha inicial es obligatoria' }}
              render={({ field }) => (
                <CustomCalendarInput
                  {...field}
                  inputName="initialBasedDate"
                  placeholder="Fecha Inicial"
                  error={errors.initialBasedDate?.message}
                />
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Etiquetas
              </label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagsSelect
                    {...field}
                    inputName="tags"
                    options={TAGS_OPTIONS}
                    error={errors.tags?.message}
                  />
                )}
              />
            </div>

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

          <CustomButton
            buttonType="submit"
            bgColor="primary"
            textColor="accent"
            displayText={isSubmitting ? 'Creando...' : 'Crear Historia'}
            isDisabled={!isValid || isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Create;
