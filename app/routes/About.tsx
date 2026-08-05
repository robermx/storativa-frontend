import {
  aboutLinks,
  aboutPillars,
  aboutStages,
} from '@/constants/common/about.constants';
import CustomLink from '@/components/shared/CustomLink';
import { useNavHeight } from '@/store/navHeightStore';

const About = () => {
  const navHeight = useNavHeight((state) => state.navHeight);
  return (
    <div className="relative overflow-hidden px-6 py-10 lg:py-0 md:px-8">
      {/* <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,160,232,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(156,213,189,0.16),transparent_38%)]" /> */}

      <section className="mx-auto flex  max-w-6xl flex-col justify-center gap-14 lg:gap-20">
        <div className={`grid h-[calc(100vh-${navHeight}px)] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:border-primary/30 dark:bg-primary/15">
              La razón de Storativa
            </p>
            <h1 className="text-4xl font-bold tracking-tighter text-dark dark:text-light sm:text-5xl lg:text-6xl">
              Tu forma de mirar el mundo también merece una{' '}
              <span className="text-primary">historia.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark/80 dark:text-light/80 sm:text-xl">
              Storativa nace para acompañar ese impulso que aparece cuando algo
              nos conmueve, nos inquieta o despierta nuestra curiosidad. Aquí
              puedes explorar épocas, lugares y posibilidades para transformar
              una idea personal en una narrativa propia.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {aboutLinks.map((link) => (
                <CustomLink
                  key={link.id}
                  path={link.path}
                  displayName={link.displayName}
                  variant={link.variant}
                  Icon={link.icon}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-4xl border border-dark/10 bg-lightness/80 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur dark:border-light/10 dark:bg-darkness/80">
            <div className="rounded-3xl bg-linear-to-br from-primary/20 via-transparent to-secondary/20 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Nuestra mirada
              </p>
              <p className="mt-4 text-2xl font-bold tracking-tight text-dark dark:text-light">
                La historia comienza cuando algo del mundo encuentra algo dentro
                de ti.
              </p>
              <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
                Storativa une emoción, contexto e imaginación para ayudarte a
                construir una obra con identidad, sin reemplazar la voz de quien
                la escribe.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {['Emoción', 'Contexto', 'Voz propia'].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-dark/10 bg-light px-4 py-5 text-center text-sm font-semibold text-dark dark:border-light/10 dark:bg-dark dark:text-light"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

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

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              El recorrido
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
              De lo que sientes a lo que puedes contar.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-dark/75 dark:text-light/75">
              Crear una historia no siempre comienza con una trama. A veces
              comienza con una pregunta, una imagen o una época que no deja de
              llamarte.
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

        <section className="rounded-4xl border border-primary/15 bg-linear-to-br from-primary/10 via-lightness/80 to-secondary/10 p-8 text-center dark:from-primary/15 dark:via-darkness/80 dark:to-secondary/10 sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
            Una historia puede comenzar con una sola mirada.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-dark/75 dark:text-light/75">
            Storativa está aquí para ayudarte a descubrir qué quieres contar,
            encontrar las palabras y convertir tu visión en una obra que
            conserve tu voz y establezca lazos con otras personas.
          </p>
        </section>
      </section>
    </div>
  );
};

export default About;
