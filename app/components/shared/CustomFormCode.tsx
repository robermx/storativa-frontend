import {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { useAuthStore } from '@/store/authStore';
import {
  resendRegistrationCode,
  verifyRegistration,
} from '@/services/auth.service';
import {
  PendingRegistration,
  VerificationCodeData,
} from '@/interfaces/auth.interface';
import { getErrorMessage } from '@/utils/getErrorMessage';
import CustomButton from './CustomButton';

const CODE_LENGTH = 6;
const emptyCode = () => Array.from({ length: CODE_LENGTH }, () => '');

interface CustomFormCodeProps {
  pendingRegistration: PendingRegistration;
  setPendingRegistration: Dispatch<SetStateAction<PendingRegistration | null>>;
  firstCodeInputRef: RefObject<HTMLInputElement | null>;
  onClose: () => void;
}

const CustomFormCode: FC<CustomFormCodeProps> = ({
  pendingRegistration,
  setPendingRegistration,
  firstCodeInputRef,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const from = location.state?.from?.pathname || '/dashboard';
  const [isResending, setIsResending] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerificationCodeData>({
    defaultValues: { code: emptyCode() },
  });
  const codeDigits = watch('code');

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    reset({ code: emptyCode() });
    clearErrors();
  }, [pendingRegistration, reset, clearErrors]);

  const onVerify = async ({ code }: VerificationCodeData) => {
    const verificationCode = code.join('');
    if (verificationCode.length !== CODE_LENGTH) return;

    clearErrors('root');
    try {
      const { user, token } = await verifyRegistration({
        email: pendingRegistration.email,
        code: verificationCode,
      });
      setAuth(user, token);
      navigate(from, { replace: true });
    } catch (error) {
      setError('root.server', {
        message: getErrorMessage(error, 'No fue posible verificar el código'),
      });
    }
  };

  const onResend = async () => {
    setIsResending(true);
    clearErrors('root');
    try {
      const registration = await resendRegistrationCode(
        pendingRegistration.email,
      );
      setPendingRegistration({
        ...pendingRegistration,
        email: registration.email,
        expiresAt: new Date(registration.expiresAt),
        resendAvailableAt: new Date(registration.resendAvailableAt),
      });
      codeInputRefs.current[0]?.focus();
    } catch (error) {
      setError('root.server', {
        message: getErrorMessage(error, 'No fue posible reenviar el código'),
      });
    } finally {
      setIsResending(false);
    }
  };

  const updateCodeDigits = (value: string, startIndex: number) => {
    const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH - startIndex);
    if (!digits) {
      setValue(`code.${startIndex}`, '', { shouldValidate: true });
      clearErrors('root');
      return;
    }

    digits.split('').forEach((digit, offset) => {
      setValue(`code.${startIndex + offset}`, digit, { shouldValidate: true });
    });
    clearErrors('root');

    const nextIndex = Math.min(startIndex + digits.length, CODE_LENGTH - 1);
    codeInputRefs.current[nextIndex]?.focus();
  };

  const handleCodeKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace' && !codeDigits[index] && index > 0) {
      event.preventDefault();
      setValue(`code.${index - 1}`, '', { shouldValidate: true });
      codeInputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      codeInputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      event.preventDefault();
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const resendSeconds = Math.max(
    0,
    Math.ceil((pendingRegistration.resendAvailableAt.getTime() - now) / 1000),
  );
  const expiresMinutes = Math.max(
    0,
    Math.ceil((pendingRegistration.expiresAt.getTime() - now) / 60000),
  );
  const isCodeComplete = codeDigits.every((digit) => digit.length === 1);

  return (
    <form onSubmit={handleSubmit(onVerify)} className="mt-7 space-y-5">
      <div
        className="flex justify-between gap-1"
        aria-label="Código de verificación"
      >
        {codeDigits.map((digit, index) => (
          <Controller
            key={index}
            name={`code.${index}`}
            control={control}
            rules={{ required: true, pattern: /^\d$/ }}
            render={({ field }) => (
              <input
                ref={(element) => {
                  codeInputRefs.current[index] = element;
                  if (index === 0) firstCodeInputRef.current = element;
                }}
                aria-label={`Dígito ${index + 1} del código`}
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                inputMode="numeric"
                maxLength={CODE_LENGTH}
                value={field.value ?? digit}
                onChange={(event) =>
                  updateCodeDigits(event.target.value, index)
                }
                onKeyDown={(event) => handleCodeKeyDown(event, index)}
                onPaste={(event) => {
                  event.preventDefault();
                  updateCodeDigits(event.clipboardData.getData('text'), index);
                }}
                className="size-11 rounded-lg border border-dark/15 bg-transparent text-center text-2xl font-bold text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-light/20 dark:text-light sm:size-12"
              />
            )}
          />
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        El código vence en {expiresMinutes} minuto
        {expiresMinutes === 1 ? '' : 's'}.
      </p>

      {errors.root?.server?.message && (
        <p className="text-center text-sm text-red-500">
          {errors.root.server.message}
        </p>
      )}

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        ¿No recibiste el código?{' '}
        <button
          type="button"
          onClick={onResend}
          disabled={resendSeconds > 0 || isResending}
          className="font-bold text-primary underline underline-offset-2 disabled:text-gray-400 disabled:no-underline"
        >
          {isResending
            ? 'Reenviando...'
            : resendSeconds > 0
              ? `Reenviar en ${resendSeconds}s`
              : 'Reenviar'}
        </button>
      </p>
      <div className="flex gap-3 pt-1">
        <CustomButton
          displayText="Cancelar"
          onClick={onClose}
          bgColor="bg-transparent"
          textColor="text-dark dark:text-light"
        />
        <CustomButton
          buttonType="submit"
          bgColor="bg-primary"
          textColor="text-light"
          displayText={isSubmitting ? 'Verificando...' : 'Verificar'}
          isDisabled={!isCodeComplete || isSubmitting}
        />
      </div>
    </form>
  );
};

export default CustomFormCode;
