import { NavLink } from 'react-router';
import { ArrowRight, BadgeCheck, Layers3, Sparkles } from 'lucide-react';

const pillars = [
  {
    title: 'Organización viva',
    description:
      'Storativa reúne lo importante en un solo lugar para que cada flujo tenga orden, contexto y claridad.',
    icon: Layers3,
  },
  {
    title: 'Control sin fricción',
    description:
      'La experiencia busca ser simple: menos ruido operativo, más foco en lo que realmente mueve el trabajo.',
    icon: BadgeCheck,
  },
  {
    title: 'Una interfaz con intención',
    description:
      'El diseño acompaña la idea del proyecto: limpio, expresivo y con una sensación de avance constante.',
    icon: Sparkles,
  },
];

const stages = [
  'Entender lo que necesitas centralizar.',
  'Crear tu espacio y dar estructura a la información.',
  'Gestionar con más claridad y menos esfuerzo.',
];

const About = () => {
  return (
    <div className="relative overflow-hidden px-6 pb-16 pt-35 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,160,232,0.16),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(156,213,189,0.16),_transparent_38%)]" />

      <section className="mx-auto flex min-h-[calc(100vh-140px)] max-w-6xl flex-col justify-center gap-14 lg:gap-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:border-primary/30 dark:bg-primary/15">
              Acerca de Storativa
            </p>
            <h1 className="text-4xl font-bold tracking-tighter text-dark dark:text-light sm:text-5xl lg:text-6xl">
              Una plataforma creada para{' '}
              <span className="text-primary">dar forma</span> a lo que importa.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark/80 dark:text-light/80 sm:text-xl">
              Storativa nace con una idea simple: convertir procesos dispersos
              en una experiencia clara, ordenada y visualmente agradable.
              Queremos que la gestión se sienta menos pesada y más natural.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <NavLink
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-light transition-transform duration-300 hover:-translate-y-0.5"
              >
                Crear cuenta
                <ArrowRight className="h-4 w-4" />
              </NavLink>
              <NavLink
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-dark/10 px-6 py-3 font-semibold text-dark transition-colors duration-300 hover:border-primary/40 hover:text-primary dark:border-light/15 dark:text-light dark:hover:border-primary/40"
              >
                Iniciar sesión
              </NavLink>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-dark/10 bg-lightness/80 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur dark:border-light/10 dark:bg-darkness/80">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Lo que buscamos
              </p>
              <p className="mt-4 text-2xl font-bold tracking-tight text-dark dark:text-light">
                Un espacio que combine claridad, ritmo y propósito.
              </p>
              <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
                La interfaz acompaña el contenido en lugar de competir con él.
                Así, la experiencia se siente moderna, fluida y fácil de
                recorrer.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {['Simple', 'Cálido', 'Funcional'].map((label) => (
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
          {pillars.map(({ title, description, icon: Icon }) => (
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
              Cómo funciona
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
              Un recorrido corto, pensado para entrar en acción rápido.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-dark/75 dark:text-light/75">
              La propuesta de Storativa sigue una lógica progresiva: primero
              entiendes, luego ordenas, después gestionas con más control.
            </p>
          </div>

          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div
                key={stage}
                className="flex items-start gap-4 rounded-[1.5rem] border border-dark/10 bg-lightness/70 p-5 dark:border-light/10 dark:bg-darkness/70"
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

        <section className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-lightness/80 to-secondary/10 p-8 text-center dark:from-primary/15 dark:via-darkness/80 dark:to-secondary/10 sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
            Una experiencia hecha para crecer contigo.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-dark/75 dark:text-light/75">
            Storativa no solo organiza información: busca darle identidad,
            coherencia y una base visual que invite a usarla todos los días.
          </p>
        </section>
      </section>
    </div>
  );
};

export default About;
