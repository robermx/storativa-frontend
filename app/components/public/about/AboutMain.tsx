import { useState } from 'react';

import CustomLink from '@/components/shared/CustomLink';
import CustomButton from '@/components/shared/CustomButton';
import {
  aboutDynamicContent,
  aboutLinks,
} from '@/constants/common/about.constants';

const AboutMain = () => {
  const [activeContentId, setActiveContentId] = useState(
    aboutDynamicContent[0].id,
  );
  const activeContent =
    aboutDynamicContent.find(({ id }) => id === activeContentId) ??
    aboutDynamicContent[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:min-h-[calc(100vh-var(--nav-height)*1px)]">
      <div className="max-w-3xl">
        <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:border-primary/30 dark:bg-primary/15">
          La razón de Storativa
        </p>
        <h1 className="text-4xl font-bold tracking-tighter text-dark dark:text-light sm:text-5xl lg:text-6xl">
          La forma de interpretar tu entorno...{' '}
          <span className="text-primary">merece una historia.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark/80 dark:text-light/80 sm:text-xl">
          Storativa nace para desarrollar el ímpetu que aparece cuando algo nos
          conmueve, nos inquieta o despierta nuestra curiosidad. Aquí puedes
          transformar una idea personal en una historia para compartir.
        </p>

        <div className="mt-8 space-y-8 sm:space-x-8">
          {aboutLinks.map(({ id, to, label, variant, icon: Icon }) => (
            <CustomLink
              key={id}
              to={to}
              variant={variant}
              icon={Icon ? <Icon /> : undefined}
              className="px-7"
            >
              {label}
            </CustomLink>
          ))}
        </div>
      </div>

      <div className="grid gap-4 rounded-4xl border border-dark/10 bg-lightness/80 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur dark:border-light/10 dark:bg-darkness/80">
        <div className="rounded-3xl bg-linear-to-br from-primary/20 via-transparent to-secondary/20 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Nuestra atención
          </p>
          <p className="mt-4 text-2xl font-bold tracking-tight text-dark dark:text-light">
            {activeContent.heading}
          </p>
          <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
            {activeContent.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {aboutDynamicContent.map(({ id, title }) => (
            <CustomButton
              key={id}
              variant="outline"
              selected={id === activeContent.id}
              onClick={() => setActiveContentId(id)}
              size="lg"
              className="cursor-pointer"
            >
              {title}
            </CustomButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMain;
