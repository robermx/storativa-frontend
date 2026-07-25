import { NavLink, useLocation, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { AxiosError } from 'axios';
import { LogIn } from 'lucide-react';

import { loginRequest } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import MainIso from '@/assets/logo/MainIso';
import CustomInput from '@/components/shared/CustomInput';
import CustomButton from '@/components/shared/CustomButton';
import { IFormData, InputEnumType } from '@/interfaces/input.interface';

const Login = () => {
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
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }: IFormData) => {
    if (!email || !password) return;
    try {
      const { user, token } = await loginRequest({
        email,
        password,
      });
      setAuth(user, token);
      navigate(from, { replace: true });
    } catch (e) {
      const serverMessage = 'Credenciales no válidas';
      setError('password', { type: 'manual', message: serverMessage });
      throw (new AxiosError(), e);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 lg:px-8">
      <NavLink to="/" className="mx-auto">
        <MainIso />
      </NavLink>
      <div className="my-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
            displayText={isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
            isDisabled={!isValid || isSubmitting}
            Icon={LogIn}
            size="md"
          />
        </form>

        <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          ¿No eres miembro aún?{' '}
          <NavLink to="/register" className="font-bold text-primary">
            Regístrate
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
