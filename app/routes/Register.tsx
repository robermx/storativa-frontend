import { NavLink } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { Fragment, useRef, useState } from 'react';
import { Airplay } from 'lucide-react';

import MainIso from '@/assets/logo/MainIso';
import CustomInput from '@/components/shared/CustomInput';
import { IFormData, InputEnumType } from '@/interfaces/input.interface';
import CustomButton from '@/components/shared/CustomButton';
import { registerUser } from '@/services/auth.service';
import { PendingRegistration } from '@/interfaces/auth.interface';

import CustomDialog from '@/components/shared/CustomDialog';
import { getErrorMessage } from '@/utils/getErrorMessage';
import CustomFormCode from '@/components/shared/CustomFormCode';
import { useNavHeight } from '@/store/navHeightStore';
import CustomLink from '@/components/shared/CustomLink';

const Register = () => {
  const firstCodeInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingRegistration, setPendingRegistration] =
    useState<PendingRegistration | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const navHeight = useNavHeight((state) => state.navHeight);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const normalizeEmail = (email: string) => email.trim().toLowerCase();
  const normalizeFullName = (fullName: string) => fullName.trim();

  const onSubmit = async ({ email, password, fullName }: IFormData) => {
    if (!email || !password || !fullName) return;

    if (
      pendingRegistration &&
      pendingRegistration.email === normalizeEmail(email) &&
      pendingRegistration.fullName === normalizeFullName(fullName) &&
      pendingRegistration.password === password
    ) {
      setIsVerificationModalOpen(true);
      return;
    }

    try {
      const registration = await registerUser({
        email,
        password,
        fullName,
      });
      setPendingRegistration({
        email: registration.email,
        fullName: normalizeFullName(fullName),
        password,
        expiresAt: new Date(registration.expiresAt),
        resendAvailableAt: new Date(registration.resendAvailableAt),
      });
      setIsVerificationModalOpen(true);
    } catch (e) {
      setError('password', {
        type: 'server',
        message: getErrorMessage(e, 'No fue posible completar el registro'),
      });
    }
  };

  return (
    <>
      <div
        className="flex flex-col justify-center min-h-120 max-w-md mx-auto px-6"
        style={{ height: `calc(100vh - ${navHeight}px)`, top: navHeight / 2 }}
      >
        <div className="mx-auto mb-8">
          <CustomLink Icon={MainIso} />
        </div>

        <Fragment>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: 'El nombre es obligatorio',
                minLength: { value: 4, message: 'Mínimo 4 caracteres' },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputType={InputEnumType.fullName}
                  inputName="fullName"
                  placeholder="Nombre Completo"
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo no válido',
                },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputType={InputEnumType.Email}
                  inputName="email"
                  placeholder="Correo Electrónico"
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'La contraseña es obligatoria',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputType={InputEnumType.Password}
                  inputName="password"
                  placeholder="Contraseña"
                  error={errors.password?.message}
                />
              )}
            />

            <CustomButton
              buttonType="submit"
              bgColor="bg-primary"
              textColor="text-light"
              displayText={isSubmitting ? 'Cargando...' : 'Registrarse'}
              isDisabled={!isValid || isSubmitting}
              Icon={Airplay}
              size="md"
            />
          </form>

          <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
            ¿Tienes una cuenta activa?{' '}
            <NavLink to="/login" className="font-bold text-primary">
              inicia Sesión
            </NavLink>
          </p>
        </Fragment>
      </div>
      <CustomDialog
        openDialog={isVerificationModalOpen && Boolean(pendingRegistration)}
        onCloseDialog={() => setIsVerificationModalOpen(false)}
        initialFocus={firstCodeInputRef}
        title="Revisa tu correo"
        subtitle={`Hola, ${pendingRegistration?.fullName.split(' ')[0] || 'User'}. Enviamos un código a ${pendingRegistration?.email || 'email@example.com'}.`}
      >
        <CustomFormCode
          firstCodeInputRef={firstCodeInputRef}
          pendingRegistration={pendingRegistration as PendingRegistration}
          setPendingRegistration={setPendingRegistration}
          onClose={() => setIsVerificationModalOpen(false)}
        />
      </CustomDialog>
    </>
  );
};

export default Register;
