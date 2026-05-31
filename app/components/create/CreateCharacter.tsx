import { IReqStorativa } from '@/interfaces/storativa.interface';
import { FC, Fragment } from 'react';
import {
  type Control,
  Controller,
  type FieldErrors,
  useFieldArray,
} from 'react-hook-form';
import CustomSelect from '../shared/CustomSelect';
import { Icatalog } from '@/interfaces/catalog.interface';
import CustomInput from '../shared/CustomInput';
import { InputEnumType } from '@/interfaces/input.interface';
import CustomTextArea from '../shared/CustomTextArea';
import CustomButton from '../shared/CustomButton';
import { UserRoundMinus, UserRoundPlus } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

interface CreateCharacterProps {
  control: Control<IReqStorativa>;
  errors: FieldErrors<IReqStorativa>;
  characterCatalog: Icatalog[];
}

const CreateCharacter: FC<CreateCharacterProps> = ({
  control,
  errors,
  characterCatalog,
}) => {
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const {
    fields: characterFields,
    append: appendCharacter,
    remove: removeCharacter,
  } = useFieldArray({
    control,
    name: 'characters',
  });

  return (
    <Fragment>
      <h3 className="mt-8 px-6 pt-3 rounded-tr-lg bg-primary/15 dark:bg-primary/10 max-w-fit text-md font-medium text-dark/70 dark:text-light/70">
        Personajes
      </h3>
      <div className="bg-primary/15 dark:bg-primary/10 px-6 py-7 rounded-b-md rounded-tr-md">
        {characterFields.map((field, index) => (
          <div key={field.id} className="pb-6 last:pb-0 flex flex-col gap-y-7">
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
    </Fragment>
  );
};

export default CreateCharacter;
