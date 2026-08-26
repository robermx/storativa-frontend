import { Fragment } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { loginRequest } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import MainIso from '@/assets/logo/MainIso';
import CustomInput from '@/components/shared/CustomInput';
import CustomButton from '@/components/shared/CustomButton';
import { IFormData, InputEnumType } from '@/interfaces/input.interface';
import CustomLink from '@/components/shared/CustomLink';

const Login = () => {
  const { t } = useTranslation('auth');
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
      const serverMessage = t('login.invalidCredentials');
      setError('password', { type: 'manual', message: serverMessage });
      throw (new AxiosError(), e);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto px-6">
      <div className="mx-auto my-8">
        <CustomLink
          to="/"
          icon={<MainIso />}
          iconSize="none"
          aria-label={t('common.homeAriaLabel')}
        />
      </div>

      <Fragment>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Controller
            name="email"
            control={control}
            rules={{
                required: t('validation.emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.emailInvalid'),
              },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                inputType={InputEnumType.Email}
                inputName="email"
                placeholder={t('fields.email')}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
                required: t('validation.passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('validation.minimumCharacters', { count: 6 }),
                },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                inputType={InputEnumType.Password}
                inputName="password"
                placeholder={t('fields.password')}
                error={errors.password?.message}
              />
            )}
          />

          <CustomButton
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
            icon={<LogIn />}
            size="md"
            className="cursor-pointer"
          >
            {isSubmitting ? t('common.loading') : t('login.submit')}
          </CustomButton>
        </form>

        <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          {t('login.notMember')}{' '}
          <NavLink to="/register" className="font-bold text-primary">
            {t('login.registerLink')}
          </NavLink>
        </p>
      </Fragment>
    </div>
  );
};

export default Login;
