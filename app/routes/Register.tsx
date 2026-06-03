import { NavLink, useLocation, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { AxiosError } from 'axios';
import { Airplay } from 'lucide-react';

import MainIso from '@/assets/logo/MainIso';
import CustomInput from '@/components/shared/CustomInput';
import { IFormData, InputEnumType } from '@/interfaces/input.interface';
import CustomButton from '@/components/shared/CustomButton';
import { registerUser } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const setAuth = useAuthStore((state) => state.setAuth);
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

  const onSubmit = async ({ email, password, fullName }: IFormData) => {
    if (!email || !password || !fullName) return;
    try {
      const { user, token } = await registerUser({
        email,
        password,
        fullName,
      });
      setAuth(user, token);
      navigate(from, { replace: true });
    } catch (e) {
      const serverMessage = 'Usuario registrado con el mismo email';
      setError('password', { type: 'manual', message: serverMessage });
      throw (new AxiosError(), e);
    }
  };

  return (
    <div className="flex flex-col justify-center h-dvh px-6 sm:px-8">
      <NavLink to="/" className="mx-auto">
        <MainIso />
      </NavLink>
      <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-dark dark:text-light">
        Ingresa datos para el registro
      </h2>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                message: 'Correo inválido',
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
            displayText={isSubmitting ? 'Cargando...' : 'Regístrame'}
            isDisabled={!isValid || isSubmitting}
            Icon={Airplay}
            size="md"
          />
        </form>

        <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          ¿Ya eres miembro?{' '}
          <NavLink to="/login" className="font-bold text-primary">
            inicia Sesión
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
