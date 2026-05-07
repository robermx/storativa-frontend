import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

import {
  homeEndParticles,
  homeHeroParticles,
  homeStages,
  homeSvgPaths,
} from '@/constants/home/home.constants';
import { useSmoothScroll } from '@/context/SmoothScrollContext';

gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);

const Home = () => {
  const { smoother } = useSmoothScroll();
  const svgPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!smoother) return;

      svgPathRefs.current.forEach((path, index) => {
        if (!path) return;

        const nextIndex = Math.min(index + 1, homeSvgPaths.length - 1);

        gsap.to(path, {
          morphSVG: {
            shape: homeSvgPaths[nextIndex],
            type: 'rotational',
            shapeIndex: 1,
          },
          scrollTrigger: {
            trigger: stageRefs.current[index],
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });
      });

      homeStages.forEach((stage, index) => {
        const section = stageRefs.current[index];
        if (!section) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'center center',
            scrub: 1,
          },
        });

        tl.fromTo(
          `[data-stage="${stage.id}"] .stage-title`,
          { opacity: 0, y: 80, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
        )
          .fromTo(
            `[data-stage="${stage.id}"] .stage-subtitle`,
            { opacity: 0, y: 50 },
            { opacity: 0.8, y: 0, duration: 0.4 },
            0.15,
          )
          .fromTo(
            `[data-stage="${stage.id}"] .stage-desc`,
            { opacity: 0, y: 40 },
            { opacity: 0.6, y: 0, duration: 0.4 },
            0.25,
          )
          .fromTo(
            `[data-stage="${stage.id}"] .stage-number`,
            { opacity: 0, scale: 0.3, rotation: -20 },
            { opacity: 0.08, scale: 1, rotation: 0, duration: 0.5 },
            0.1,
          )
          .fromTo(
            `[data-stage="${stage.id}"] .stage-svg-wrap`,
            { opacity: 0, scale: 0.4, rotation: -20 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: 'back.out(1.2)',
            },
            0.1,
          );

        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'center center',
            end: 'bottom 25%',
            scrub: 1,
          },
        });

        exitTl
          .to(`[data-stage="${stage.id}"] .stage-title`, {
            opacity: 0,
            y: -60,
            scale: 1.1,
            duration: 0.4,
          })
          .to(
            `[data-stage="${stage.id}"] .stage-subtitle`,
            { opacity: 0, y: -40, duration: 0.3 },
            0.1,
          )
          .to(
            `[data-stage="${stage.id}"] .stage-desc`,
            { opacity: 0, y: -30, duration: 0.3 },
            0.15,
          )
          .to(
            `[data-stage="${stage.id}"] .stage-svg-wrap`,
            { opacity: 0, scale: 1.4, rotation: 15, duration: 0.4 },
            0.1,
          );
      });

      gsap.to('.floating-particle', {
        y: 'random(-40, 40)',
        x: 'random(-30, 30)',
        opacity: 'random(0.15, 0.5)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.2,
          from: 'random',
        },
      });
    },
    {
      dependencies: [smoother],
    },
  );

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {homeHeroParticles.map((p, i) => (
            <div
              key={i}
              className="floating-particle absolute w-1 h-1 bg-amber-400/30 rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-light tracking-tighter mb-6">
            Todos tenemos algo que contar...{' '}
            <span className="text-primary">
              algo que conecte e inspire de manera positiva a nuestra audiencia.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-dark dark:text-light max-w-2xl mx-auto font-light leading-relaxed">
            Con base en el recuerdo de nuestros mejores y peores momentos,
            incursionamos en situaciones, lugares y tiempos, buscando ser
            escuchados con el propósito de establecer lazos.
          </p>
          <div className="mt-16 flex flex-col items-center gap-3 text-slate-500">
            <span className="text-xs text-primary/80 uppercase">
              scroll para comenzar
            </span>
            <div className="w-px h-16 bg-linear-to-b from-primary/80 to-transparent" />
          </div>
        </div>
      </div>

      {homeStages.map((stage, index) => (
        <div
          key={stage.id}
          data-stage={stage.id}
          ref={(el) => {
            stageRefs.current[index] = el;
          }}
          className="min-h-screen flex items-center relative px-6 md:px-12 py-20"
        >
          <div className={`absolute inset-0 bg-linear-to-b`} />

          <div className="absolute top-8 right-8 md:top-16 md:right-16 text-8xl md:text-[10rem] font-bold text-white/5 stage-number select-none leading-none">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div
                className={`order-2 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}
              >
                <h2
                  className={`stage-title text-4xl md:text-5xl lg:text-7xl font-bold ${stage.textColor} tracking-tight mb-4`}
                >
                  {stage.title}
                </h2>
                <p
                  className={`stage-subtitle text-lg md:text-xl ${stage.accentColor} font-medium mb-6 tracking-wide`}
                >
                  {stage.subtitle}
                </p>
                <p className="stage-desc text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
                  {stage.description}
                </p>

                <div className="mt-10 flex items-center gap-3">
                  {homeStages.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === index
                          ? 'w-8 bg-white/60'
                          : i < index
                            ? 'w-4 bg-white/30'
                            : 'w-4 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div
                className={`order-1 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'} flex items-center justify-center`}
              >
                <div className="stage-svg-wrap w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient
                        id={`grad-${stage.id}`}
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop
                          offset="0%"
                          stopColor={stage.svgColor}
                          stopOpacity="0.9"
                        />
                        <stop
                          offset="100%"
                          stopColor={stage.svgColor}
                          stopOpacity="0.2"
                        />
                      </radialGradient>
                      <filter id={`glow-${stage.id}`}>
                        <feGaussianBlur
                          stdDeviation="2.5"
                          result="coloredBlur"
                        />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      ref={(el) => {
                        svgPathRefs.current[index] = el;
                      }}
                      d={homeSvgPaths[index]}
                      fill={`url(#grad-${stage.id})`}
                      filter={`url(#glow-${stage.id})`}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="min-h-screen flex flex-col items-center justify-center relative px-6 bg-linear-to-b from-slate-950 via-amber-950/20 to-slate-950">
        <div className="absolute inset-0">
          {homeEndParticles.map((p, i) => (
            <div
              key={i}
              className="floating-particle absolute w-1.5 h-1.5 bg-amber-400/40 rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-3xl">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter mb-6">
            El Ciclo{' '}
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Continúa
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12">
            Cada idea que nace lleva dentro el potencial de transformar. Lo que
            comenzó como un destello ahora es una experiencia que trasciende.
          </p>
          <div className="flex justify-center gap-3">
            {homeStages.map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-amber-400/40 hover:bg-amber-400/70 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
