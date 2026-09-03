import { BookOpenCheck, FileText, LockKeyhole, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const legalTopics = [
  { id: 'use', icon: FileText },
  { id: 'privacy', icon: LockKeyhole },
  { id: 'authorship', icon: BookOpenCheck },
];

const Legal = () => {
  const { t } = useTranslation('legal');

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-10 lg:gap-20 lg:px-8 lg:py-16">
      <header className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:border-primary/30 dark:bg-primary/15">
            {t('hero.eyebrow')}
          </p>
          <h1 className="text-4xl font-bold tracking-tighter text-dark dark:text-light sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark/80 dark:text-light/80 sm:text-xl">
            {t('hero.description')}
          </p>
        </div>

        <aside className="rounded-4xl border border-primary/20 bg-linear-to-br from-primary/15 via-lightness to-secondary/25 p-7 shadow-sm dark:border-primary/25 dark:via-darkness dark:to-secondary/10">
          <Scale className="h-7 w-7 text-primary" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-dark dark:text-light">
            {t('notice.title')}
          </h2>
          <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
            {t('notice.description')}
          </p>
        </aside>
      </header>

      <section aria-labelledby="legal-topics" className="space-y-7">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {t('topics.eyebrow')}
          </p>
          <h2
            id="legal-topics"
            className="mt-3 text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl"
          >
            {t('topics.title')}
          </h2>
          <p className="mt-4 leading-relaxed text-dark/75 dark:text-light/75">
            {t('topics.description')}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {legalTopics.map(({ id, icon: Icon }) => (
            <article
              key={id}
              className="rounded-[1.75rem] border border-dark/10 bg-lightness/75 p-6 shadow-sm backdrop-blur dark:border-light/10 dark:bg-darkness/75"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-3 text-primary dark:bg-primary/15">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-dark dark:text-light">
                {t(`topics.items.${id}.title`)}
              </h3>
              <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
                {t(`topics.items.${id}.description`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-4xl border border-dark/10 bg-lightness/70 p-7 text-light dark:border-light/10 dark:bg-darkness/70 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {t('consultation.eyebrow')}
          </p>
          <h2 className="mt-4 text-dark dark:text-light text-3xl font-bold tracking-tight sm:text-4xl">
            {t('consultation.title')}
          </h2>
        </div>
        <div>
          <p className="leading-relaxed text-dark/80 dark:text-light/80">
            {t('consultation.description')}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {(['terms', 'data', 'content', 'account'] as const).map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-light/15 bg-secondary/25 px-4 py-3 leading-relaxed text-dark/80 dark:bg-accent/10 dark:text-light/80"
              >
                {t(`consultation.items.${item}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-4xl border border-dark/10 bg-lightness/70 p-7 dark:border-light/10 dark:bg-darkness/70 lg:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-dark dark:text-light">
          {t('support.title')}
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-dark/75 dark:text-light/75">
          {t('support.description')}
        </p>
      </section>
    </section>
  );
};

export default Legal;
