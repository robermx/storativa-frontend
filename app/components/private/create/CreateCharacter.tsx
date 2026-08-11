import { type FC, Fragment, useState } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Check, Pencil, Trash2, UserRoundPlus, X } from 'lucide-react';

import type {
  Character,
  IReqStorativa,
} from '@/interfaces/storativa.interface';
import { InputEnumType } from '@/interfaces/input.interface';
import { useCreateFlow } from '@/context/CreateFlowContext';

import CustomButton from '@/components/shared/CustomButton';
import CustomInput from '@/components/shared/CustomInput';
import CustomSelect from '@/components/shared/CustomSelect';
import CustomTextArea from '@/components/shared/CustomTextArea';

const emptyCharacter: Character = {
  type: 0,
  name: '',
  social: '',
  physical: '',
  psychological: '',
  additional: '',
};

const CreateCharacter: FC = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<number | null>(null);
  const { control: createControl } = useFormContext<IReqStorativa>();
  const {
    fields: characters,
    append,
    remove,
    update,
  } = useFieldArray({
    control: createControl,
    name: 'characters',
  });
  const { characterCatalog, isLocked } = useCreateFlow();
  const {
    control: characterControl,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Character>({
    mode: 'onChange',
    defaultValues: emptyCharacter,
  });

  const saveCharacter = (character: Character) => {
    if (editingIndex === null) {
      append(character);
    } else {
      update(editingIndex, character);
      setEditingIndex(null);
    }
    reset(emptyCharacter);
  };

  const startEditing = (index: number) => {
    const character = characters[index];
    if (!character) return;

    setPendingRemoval(null);
    setEditingIndex(index);
    reset(character);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    reset(emptyCharacter);
  };

  const confirmRemoval = (index: number) => {
    remove(index);
    setPendingRemoval(null);
    if (editingIndex === index) cancelEditing();
    if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const characterType = (type: number) =>
    characterCatalog.find((item) => item.value === type)?.name ?? 'Sin tipo';

  return (
    <Fragment>
      <div className="bg-primary/15 dark:bg-primary/10 px-6 py-7 rounded-b-md rounded-tr-md">
        <p className="mb-6 text-sm text-dark/65 dark:text-light/65">
          Añade un personaje a la vez para mantener la historia clara y
          manejable.
        </p>

        {characters.length > 0 && (
          <div className="mb-7 divide-y divide-primary/15 dark:divide-light/10">
            {characters.map((character, index) => (
              <div
                key={character.id}
                className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-dark dark:text-light">
                    {character.name}
                  </p>
                  <p className="text-sm text-dark/65 dark:text-light/65">
                    {characterType(character.type)} · rasgos completos
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
                      Eliminar
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-md bg-dark/10 px-3 py-2 text-sm font-semibold text-dark hover:bg-dark/20 dark:bg-light/10 dark:text-light dark:hover:bg-light/20 disabled:cursor-not-allowed"
                      onClick={() => setPendingRemoval(null)}
                      disabled={isLocked}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 sm:w-28">
                    <button
                      type="button"
                      aria-label={`Editar ${character.name}`}
                      className="flex-1 rounded-md bg-primary/10 p-2 text-primary hover:bg-primary/20 disabled:cursor-not-allowed"
                      onClick={() => startEditing(index)}
                      disabled={isLocked}
                    >
                      <Pencil size={18} className="mx-auto" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Eliminar ${character.name}`}
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
            {editingIndex === null ? 'Añadir personaje' : 'Editar personaje'}
          </p>
          <div className="flex flex-col gap-y-7">
            <div className="flex flex-col gap-y-7 sm:flex-row sm:gap-x-6 sm:gap-y-0">
              <Controller
                name="type"
                control={characterControl}
                rules={{
                  required: 'El tipo de personaje es obligatorio',
                  validate: (value) =>
                    value !== 0 || 'El tipo de personaje es obligatorio',
                }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    inputName="character-type"
                    placeholder="Tipo de Personaje"
                    options={characterCatalog}
                    error={errors.type?.message}
                  />
                )}
              />
              <Controller
                name="name"
                control={characterControl}
                rules={{ required: 'El nombre del personaje es obligatorio' }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputType={InputEnumType.characterName}
                    inputName="character-name"
                    placeholder="Nombre del Personaje"
                    error={errors.name?.message}
                  />
                )}
              />
            </div>
            <div className="grid gap-y-7 sm:grid-cols-2 sm:gap-x-6">
              <Controller
                name="social"
                control={characterControl}
                rules={{ required: 'Rasgos sociales obligatorios' }}
                render={({ field }) => (
                  <CustomTextArea
                    {...field}
                    inputName="character-social"
                    placeholder="Rasgos Sociales"
                    rows={3}
                    error={errors.social?.message}
                  />
                )}
              />
              <Controller
                name="physical"
                control={characterControl}
                rules={{ required: 'Rasgos físicos obligatorios' }}
                render={({ field }) => (
                  <CustomTextArea
                    {...field}
                    inputName="character-physical"
                    placeholder="Rasgos Físicos"
                    rows={3}
                    error={errors.physical?.message}
                  />
                )}
              />
              <Controller
                name="psychological"
                control={characterControl}
                rules={{ required: 'Rasgos psicológicos obligatorios' }}
                render={({ field }) => (
                  <CustomTextArea
                    {...field}
                    inputName="character-psychological"
                    placeholder="Rasgos Psicológicos"
                    rows={3}
                    error={errors.psychological?.message}
                  />
                )}
              />
              <Controller
                name="additional"
                control={characterControl}
                render={({ field }) => (
                  <CustomTextArea
                    {...field}
                    inputName="character-additional"
                    placeholder="Rasgos Adicionales (Opcional)"
                    rows={3}
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="sm:w-56">
              <CustomButton
                variant="soft"
                icon={editingIndex === null ? <UserRoundPlus /> : <Check />}
                onClick={() => void handleSubmit(saveCharacter)()}
                disabled={!isValid || isLocked}
              >
                {editingIndex === null ? 'Añadir personaje' : 'Guardar cambios'}
              </CustomButton>
            </div>
            {editingIndex !== null && (
              <div className="sm:w-32">
                <CustomButton
                  variant="ghost"
                  icon={<X />}
                  onClick={cancelEditing}
                  disabled={isLocked}
                >
                  Cancelar
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateCharacter;
