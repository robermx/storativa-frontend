import { aboutPillars } from '@/constants/common/about.constants';

const AboutPillars = () => {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {aboutPillars.map(({ title, description, icon: Icon }) => (
        <article
          key={title}
          className="rounded-[1.75rem] border border-dark/10 bg-lightness/75 p-6 shadow-sm backdrop-blur dark:border-light/10 dark:bg-darkness/75"
        >
          <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-3 text-primary dark:bg-primary/15">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-dark dark:text-light">
            {title}
          </h2>
          <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
            {description}
          </p>
        </article>
      ))}
    </div>
  );
};

export default AboutPillars;
