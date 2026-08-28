import { type FC } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import EditionSkeleton from '@/components/skeleton/EditionSkeleton';

interface EditionInitializationStateProps {
  error: string | null;
  onRetry: () => void;
}

const EditionInitializationState: FC<EditionInitializationStateProps> = ({
  error,
  onRetry,
}) => {
  const { t } = useTranslation('editor');
  if (!error) return <EditionSkeleton />;

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl items-center px-6">
      <div className="w-full rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
        <AlertCircle className="mx-auto text-red-500" size={36} />
        <h1 className="mt-3 text-xl font-semibold">
          {t('initialization.title')}
        </h1>
        <p className="mt-2 text-sm text-dark/65 dark:text-light/65">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-light"
        >
          <RotateCcw size={18} /> {t('initialization.retry')}
        </button>
      </div>
    </div>
  );
};

export default EditionInitializationState;
