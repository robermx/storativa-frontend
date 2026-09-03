import { Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import CustomLink from '@/components/shared/CustomLink';

const PublicAccessPaused = () => {
  const { t } = useTranslation('common');

  return (
    <section className="mx-auto flex min-h-dvh max-w-3xl items-center px-6 py-10 lg:px-8">
      <div className="rounded-4xl border border-primary/20 bg-linear-to-br from-primary/10 via-lightness to-secondary/20 p-8 shadow-sm dark:border-primary/25 dark:via-darkness dark:to-secondary/10 sm:p-10">
        <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary dark:bg-primary/15">
          <Scale className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t('publicAccess.eyebrow')}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
          {t('publicAccess.title')}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-dark/75 dark:text-light/75">
          {t('publicAccess.description')}
        </p>
        <CustomLink to="/legal" variant="outline" className="mt-8">
          {t('publicAccess.legalLink')}
        </CustomLink>
      </div>
    </section>
  );
};

export default PublicAccessPaused;
