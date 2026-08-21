import { ChevronRight } from 'lucide-react';

import CustomLink from '@/components/shared/CustomLink';

const HomeConclusion = () => {
  return (
    <section className="relative isolate min-h-[calc(100vh-var(--nav-height)*1px)] overflow-hidden flex flex-col items-center justify-center px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl md:h-112 md:w-md" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <h2 className="home-final-copy text-4xl md:text-5xl lg:text-6xl font-bold text-dark dark:text-light tracking-tighter mb-6">
          Tu historia podría{' '}
          <span className="text-primary text-5xl md:text-7xl block">
            crear lazos
          </span>
        </h2>
        <p className="home-final-copy text-lg md:text-xl text-dark dark:text-light font-light leading-relaxed mb-10">
          Lo que nace de una emoción, un recuerdo o una mirada propia puede
          convertirse en una historia capaz de cruzar épocas, despertar otras
          ideas y conectar con quienes encuentran algo de sí mismos en ella.
        </p>

        <CustomLink
          to="/register"
          variant="primary"
          icon={<ChevronRight />}
          className="pl-8 pr-7"
        >
          Comenzar con mi Storativa
        </CustomLink>
      </div>
    </section>
  );
};

export default HomeConclusion;
