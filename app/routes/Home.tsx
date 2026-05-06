import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, MorphSVGPlugin);

const stages = [
  {
    id: 'chispa',
    title: 'La Chispa',
    subtitle: 'Todo comienza con una idea',
    description:
      'En la quietud de la mente, un destello apenas perceptible. Una pregunta sin respuesta, un deseo sin nombre. Así nace todo lo grande.',
    bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
    textColor: 'text-amber-400',
    accentColor: 'text-amber-300/60',
    svgColor: '#fbbf24',
  },
  {
    id: 'pensamiento',
    title: 'El Pensamiento',
    subtitle: 'La idea toma forma',
    description:
      'Lo que era invisible comienza a delinearse. Contornos suaves, posibilidades infinitas. La mente trabaja en silencio, tejiendo conexiones.',
    bgGradient: 'from-indigo-950 via-slate-900 to-indigo-950',
    textColor: 'text-indigo-400',
    accentColor: 'text-indigo-300/60',
    svgColor: '#818cf8',
  },
  {
    id: 'forma',
    title: 'La Forma',
    subtitle: 'Estructura y propósito',
    description:
      'El caos se organiza. Líneas que convergen, ángulos que definen. Lo abstracto se vuelve tangible, lo etéreo cobra solidez.',
    bgGradient: 'from-emerald-950 via-slate-900 to-emerald-950',
    textColor: 'text-emerald-400',
    accentColor: 'text-emerald-300/60',
    svgColor: '#34d399',
  },
  {
    id: 'conexion',
    title: 'La Conexión',
    subtitle: 'Nada existe aislado',
    description:
      'Las formas se encuentran, se entrelazan. Cada conexión genera nuevas posibilidades. La red crece, se fortalece, se vuelve viva.',
    bgGradient: 'from-rose-950 via-slate-900 to-rose-950',
    textColor: 'text-rose-400',
    accentColor: 'text-rose-300/60',
    svgColor: '#fb7185',
  },
  {
    id: 'expansion',
    title: 'La Expansión',
    subtitle: 'Más allá de los límites',
    description:
      'Lo que era pequeño ahora se extiende. Colores que explotan, patrones que emergen. La creación trasciende su origen.',
    bgGradient: 'from-violet-950 via-slate-900 to-violet-950',
    textColor: 'text-violet-400',
    accentColor: 'text-violet-300/60',
    svgColor: '#a78bfa',
  },
  {
    id: 'obra',
    title: 'La Obra',
    subtitle: 'Algo que cautiva',
    description:
      'El viaje se completa. Lo que comenzó como un destello ahora es una experiencia que transforma a quien la contempla.',
    bgGradient: 'from-amber-950 via-slate-900 to-amber-950',
    textColor: 'text-amber-400',
    accentColor: 'text-amber-300/60',
    svgColor: '#fbbf24',
  },
];

const svgPaths = [
  'M50,10 L55,40 L85,40 L60,55 L70,85 L50,65 L30,85 L40,55 L15,40 L45,40 Z',
  'M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z',
  'M50,5 C70,20 90,40 90,50 C90,60 70,80 50,95 C30,80 10,60 10,50 C10,40 30,20 50,5 Z',
  'M50,10 C65,10 80,20 85,35 C90,50 85,65 70,80 C55,90 45,90 30,80 C15,65 10,50 15,35 C20,20 35,10 50,10 Z',
  'M50,5 C58,5 65,15 70,30 C80,25 90,30 90,40 C90,50 80,55 70,50 C65,65 58,75 50,75 C42,75 35,65 30,50 C20,55 10,50 10,40 C10,30 20,25 30,30 C35,15 42,5 50,5 Z',
  'M50,10 C60,10 70,15 75,25 C85,20 95,25 95,35 C95,45 85,50 75,45 C80,55 85,65 75,75 C65,85 55,90 50,90 C45,90 35,85 25,75 C15,65 20,55 25,45 C15,50 5,45 5,35 C5,25 15,20 25,25 C30,15 40,10 50,10 Z',
];

const heroParticles = Array.from({ length: 20 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

const endParticles = Array.from({ length: 30 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

const Home = () => {
  const smootherWrapperRef = useRef<HTMLDivElement>(null);
  const smootherContentRef = useRef<HTMLDivElement>(null);
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);
  const svgPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const smootherInstance = ScrollSmoother.create({
      wrapper: smootherWrapperRef.current,
      content: smootherContentRef.current,
      smooth: 1.5,
      smoothTouch: 0.5,
      effects: true,
      normalizeScroll: true,
    });
    setSmoother(smootherInstance);

    return () => {
      smootherInstance.kill();
    };
  }, []);

  useGSAP(
    () => {
      if (!smoother) return;

      svgPathRefs.current.forEach((path, index) => {
        if (!path) return;

        const nextIndex = Math.min(index + 1, svgPaths.length - 1);

        gsap.to(path, {
          morphSVG: {
            shape: svgPaths[nextIndex],
            type: 'rotational',
            shapeIndex: 3,
          },
          scrollTrigger: {
            trigger: stageRefs.current[index],
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });
      });

      stages.forEach((stage, index) => {
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
      scope: smootherContentRef,
      dependencies: [smoother],
    },
  );

  return (
    <div ref={smootherWrapperRef} className="relative">
      <div ref={smootherContentRef} className="relative">
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0">
            {heroParticles.map((p, i) => (
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
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter mb-6">
              El Viaje de una{' '}
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Idea
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Una historia de transformación, desde un destello invisible hasta
              algo que cautiva el alma
            </p>
            <div className="mt-16 flex flex-col items-center gap-3 text-slate-500">
              <span className="text-xs tracking-widest uppercase">
                Desplázate para comenzar
              </span>
              <div className="w-px h-16 bg-linear-to-b from-amber-400/60 to-transparent" />
            </div>
          </div>
        </div>

        {stages.map((stage, index) => (
          <div
            key={stage.id}
            data-stage={stage.id}
            ref={(el) => {
              stageRefs.current[index] = el;
            }}
            className="min-h-screen flex items-center relative px-6 md:px-12 py-20"
          >
            <div
              className={`absolute inset-0 bg-linear-to-b ${stage.bgGradient}`}
            />

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
                    {stages.map((_, i) => (
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
                        d={svgPaths[index]}
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
            {endParticles.map((p, i) => (
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
              Cada idea que nace lleva dentro el potencial de transformar. Lo
              que comenzó como un destello ahora es una experiencia que
              trasciende.
            </p>
            <div className="flex justify-center gap-3">
              {stages.map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-amber-400/40 hover:bg-amber-400/70 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
