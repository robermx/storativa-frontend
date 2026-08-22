import { NavLink } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { Fragment, useRef, useState } from 'react';
import { Airplay } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import MainIso from '@/assets/logo/MainIso';
import CustomInput from '@/components/shared/CustomInput';
import { IFormData, InputEnumType } from '@/interfaces/input.interface';
import CustomButton from '@/components/shared/CustomButton';
import { registerUser } from '@/services/auth.service';
import { PendingRegistration } from '@/interfaces/auth.interface';

import CustomDialog from '@/components/shared/CustomDialog';
import { getErrorMessage } from '@/utils/getErrorMessage';
import CustomFormCode from '@/components/shared/CustomFormCode';
import CustomLink from '@/components/shared/CustomLink';

const Register = () => {
  const { t } = useTranslation('auth');
  const firstCodeInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingRegistration, setPendingRegistration] =
    useState<PendingRegistration | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

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
        message: getErrorMessage(e, t('register.registrationFailed')),
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto px-6">
        <div className="mx-auto mb-8">
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
              name="fullName"
              control={control}
              rules={{
                required: t('validation.fullNameRequired'),
                minLength: {
                  value: 4,
                  message: t('validation.minimumCharacters', { count: 4 }),
                },
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  inputType={InputEnumType.fullName}
                  inputName="fullName"
                  placeholder={t('fields.fullName')}
                  error={errors.fullName?.message}
                />
              )}
            />

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
              icon={<Airplay />}
              size="md"
            >
              {isSubmitting ? t('common.loading') : t('register.submit')}
            </CustomButton>
          </form>

          <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
            {t('register.hasAccount')}{' '}
            <NavLink to="/login" className="font-bold text-primary">
              {t('register.loginLink')}
            </NavLink>
          </p>
        </Fragment>
      </div>
      <CustomDialog
        openDialog={isVerificationModalOpen && Boolean(pendingRegistration)}
        onCloseDialog={() => setIsVerificationModalOpen(false)}
        initialFocus={firstCodeInputRef}
        title={t('verification.dialog.title')}
        subtitle={t('verification.dialog.subtitle', {
          name:
            pendingRegistration?.fullName.split(' ')[0] ||
            t('verification.dialog.defaultName'),
          email:
            pendingRegistration?.email || t('verification.dialog.defaultEmail'),
        })}
        closeLabel={t('verification.dialog.closeLabel')}
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
