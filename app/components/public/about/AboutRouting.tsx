import { aboutStages } from '@/constants/common/about.constants';

const AboutRouting = () => {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          El recorrido
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
          De lo que sientes a lo que puedes contar.
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-dark/75 dark:text-light/75">
          Crear una historia no siempre comienza con una trama. A veces comienza
          con una pregunta, una imagen o una época que no deja de llamarte.
        </p>
      </div>

      <div className="space-y-4">
        {aboutStages.map((stage, index) => (
          <div
            key={stage}
            className="flex items-start gap-4 rounded-3xl border border-dark/10 bg-lightness/70 p-5 dark:border-light/10 dark:bg-darkness/70"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-light">
              0{index + 1}
            </div>
            <p className="pt-1 text-base leading-relaxed text-dark dark:text-light">
              {stage}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutRouting;
