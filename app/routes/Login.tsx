import { NavLink, useLocation, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { AxiosError } from 'axios';

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
      const { user, token, refreshToken } = await loginRequest({
        email,
        password,
      });
      setAuth(user, token, refreshToken);
      navigate(from, { replace: true });
    } catch (e) {
      const serverMessage = 'Credenciales no válidas';
      setError('password', { type: 'manual', message: serverMessage });
      throw (new AxiosError(), e);
    }
  };

  return (
    <div className="flex flex-col justify-center h-dvh px-6 lg:px-8">
      <NavLink to="/" className="mx-auto">
        <MainIso />
      </NavLink>
      <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-dark dark:text-light">
        Inicia sesión con tu cuenta
      </h2>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            bgColor="primary"
            textColor="accent"
            displayText={isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
            isDisabled={!isValid || isSubmitting}
          />
        </form>

        <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          ¿No eres miembro aún?{' '}
          <NavLink to="/register" className="font-bold text-primary">
            Registrate
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
