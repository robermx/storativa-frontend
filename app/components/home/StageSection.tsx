import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { homeStages, homeSvgPaths } from '@/constants/home/home.constants';
import { useThemeStore } from '@/store/themeStore';

const StageSection = () => {
  const { smoother } = useSmoothScroll();
  const svgPathRef = useRef<SVGPathElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useGSAP(
    () => {
      if (!smoother || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${homeStages.length * 100}%`,
          pin: true,
          scrub: 1,
        },
      });

      homeStages.forEach((stage, index) => {
        const section = stageRefs.current[index];
        if (!section) return;

        // Morph SVG path
        if (svgPathRef.current && index < homeSvgPaths.length - 1) {
          tl.to(
            svgPathRef.current,
            {
              morphSVG: {
                shape: homeSvgPaths[index + 1],
                type: 'rotational',
                shapeIndex: 2,
              },
              duration: 1,
            },
            index,
          );
        }

        // Entry animation for text
        tl.fromTo(
          `[data-stage="${stage.id}"] .stage-title`,
          { opacity: 0, y: 80, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
          index,
        )
          .fromTo(
            `[data-stage="${stage.id}"] .stage-subtitle`,
            { opacity: 0, y: 50 },
            { opacity: 0.8, y: 0, duration: 0.4 },
            index + 0.15,
          )
          .fromTo(
            `[data-stage="${stage.id}"] .stage-desc`,
            { opacity: 0, y: 40 },
            { opacity: 0.6, y: 0, duration: 0.4 },
            index + 0.25,
          );

        // Exit animation for text (except last stage)
        if (index < homeStages.length - 1) {
          tl.to(
            `[data-stage="${stage.id}"] .stage-title`,
            { opacity: 0, y: -60, scale: 1.1, duration: 0.4 },
            index + 0.7,
          )
            .to(
              `[data-stage="${stage.id}"] .stage-subtitle`,
              { opacity: 0, y: -40, duration: 0.3 },
              index + 0.75,
            )
            .to(
              `[data-stage="${stage.id}"] .stage-desc`,
              { opacity: 0, y: -30, duration: 0.3 },
              index + 0.8,
            );
        }
      });
    },
    {
      dependencies: [smoother],
    },
  );

  return (
    <section ref={sectionRef} className="relative h-screen p-6">
      <div className="absolute inset-0 flex items-start lg:items-center mt-20 lg:mt-0 justify-center pointer-events-none">
        <div className="w-78 h-78 lg:w-100 lg:h-100">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="grad-sticky" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor={
                    isDarkMode ? 'var(--color-primary)' : 'var(--color-primary)'
                  }
                  stopOpacity="0.9"
                />
                <stop
                  offset="90%"
                  stopColor={
                    isDarkMode ? 'var(--color-dark)' : 'var(--color-light)'
                  }
                  stopOpacity="0.2"
                />
              </radialGradient>
              <filter id="glow-sticky">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={svgPathRef}
              d={homeSvgPaths[0]}
              fill="url(#grad-sticky)"
              filter="url(#glow-sticky)"
            />
          </svg>
        </div>
      </div>

      {homeStages.map((stage, index) => (
        <div
          key={stage.id}
          data-stage={stage.id}
          ref={(el) => {
            stageRefs.current[index] = el;
          }}
          className="absolute inset-0 flex items-center z-20 mt-30 lg:mt-0"
        >
          <div
            className={`w-full flex ${
              index % 2 === 1
                ? 'justify-end pl-8 md:pl-16 lg:pl-32'
                : 'justify-start pr-8 md:pr-16 lg:pr-32'
            }`}
          >
            <div
              className={`px-6 md:px-12 max-w-md ${
                index % 2 === 1 ? 'text-left' : 'text-right'
              }`}
            >
              <h2 className="stage-title text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-1">
                {stage.title}
              </h2>
              <p className="stage-subtitle text-xl md:text-2xl text-dark dark:text-light font-medium mb-5 tracking-wide">
                {stage.subtitle}
              </p>
              <p className="stage-desc text-base md:text-lg text-dark dark:text-light leading-relaxed">
                {stage.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StageSection;
