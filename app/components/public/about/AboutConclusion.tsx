import { useTranslation } from 'react-i18next';

const AboutConclusion = () => {
  const { t } = useTranslation('about');

  return (
    <section className="rounded-4xl border border-primary/15 bg-linear-to-br from-primary/10 via-lightness/80 to-secondary/10 p-8 text-center dark:from-primary/15 dark:via-darkness/80 dark:to-secondary/10 sm:p-10">
      <h2 className="text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
        {t('conclusion.title')}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-dark/75 dark:text-light/75">
        {t('conclusion.description')}
      </p>
    </section>
  );
};

export default AboutConclusion;
