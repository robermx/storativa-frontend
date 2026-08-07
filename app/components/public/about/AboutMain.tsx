import CustomLink from '@/components/shared/CustomLink';
import { aboutLinks } from '@/constants/common/about.constants';
import { useNavHeight } from '@/store/navHeightStore';

const AboutMain = () => {
  const navHeight = useNavHeight((state) => state.navHeight);
  return (
    <div className={`grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:h-[calc(100vh-${navHeight}px)]`}>
      <div className="max-w-3xl">
        <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:border-primary/30 dark:bg-primary/15">
          La razón de Storativa
        </p>
        <h1 className="text-4xl font-bold tracking-tighter text-dark dark:text-light sm:text-5xl lg:text-6xl">
          La forma de interpretar tu entorno...{' '}
          <span className="text-primary">merece una historia.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark/80 dark:text-light/80 sm:text-xl">
          Storativa nace para acompañar el ímpetu que aparece cuando algo nos
          conmueve, nos inquieta o despierta nuestra curiosidad. Aquí puedes
          explorar épocas, lugares y posibilidades para transformar una idea
          personal en una narrativa propia.
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
            La historia comienza cuando algo del mundo encuentra algo dentro de
            ti.
          </p>
          <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
            Storativa une emoción, contexto e imaginación para ayudarte a
            construir una obra con identidad, sin reemplazar la voz de quien la
            escribe.
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
  );
};

export default AboutMain;
