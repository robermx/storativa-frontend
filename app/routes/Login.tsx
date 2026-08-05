import { Fragment } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { LogIn } from 'lucide-react';

import { loginRequest } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useNavHeight } from '@/store/navHeightStore';
import MainIso from '@/assets/logo/MainIso';
import CustomInput from '@/components/shared/CustomInput';
import CustomButton from '@/components/shared/CustomButton';
import { IFormData, InputEnumType } from '@/interfaces/input.interface';
import CustomLink from '@/components/shared/CustomLink';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const setAuth = useAuthStore((state) => state.setAuth);
  const navHeight = useNavHeight((state) => state.navHeight);

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
    <div
      className="flex flex-col justify-center min-h-100 max-w-md mx-auto px-6"
      style={{ height: `calc(100vh - ${navHeight}px)`, top: navHeight / 2 }}
    >
      <div className="mx-auto my-8">
        <CustomLink Icon={MainIso} />
      </div>

      <Fragment>
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
      </Fragment>
    </div>
  );
};

export default Login;
