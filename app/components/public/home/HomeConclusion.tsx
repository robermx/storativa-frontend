import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  homeFinalConstellationLinks,
  homeFinalConstellationNodes,
} from '@/constants/common/home.constants';
import CustomLink from '@/components/shared/CustomLink';

// gsap.registerPlugin(ScrollTrigger);

const HomeConclusion = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set('.home-final-node', { opacity: 0.45, scale: 1 });
        gsap.set('.home-final-line, .home-final-copy', {
          opacity: 1,
          scaleX: 1,
          y: 0,
        });
        return;
      }

      gsap.set('.home-final-node', { opacity: 0, scale: 0 });
      gsap.set('.home-final-line', {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left center',
      });
      gsap.set('.home-final-copy', { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 20%',
        once: true,
        onEnter: () => {
          const timeline = gsap.timeline();

          timeline
            .to(
              '.home-final-node',
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.7)',
              },
              0,
            )
            .to(
              '.home-final-line',
              {
                opacity: 1,
                scaleX: 1,
                duration: 0.4,
                ease: 'power2.out',
              },
              0,
            )
            .to(
              '.home-final-copy',
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power3.out',
              },
              0.4,
            )
            .to(
              '.home-final-node',
              {
                x: 4,
                y: -4,
                duration: 2.6,
                repeat: -1,
                yoyo: true,
                stagger: 0.25,
                ease: 'sine.inOut',
              },
              0.8,
            );
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[calc(100vh-var(--nav-height))] overflow-hidden flex flex-col items-center justify-center px-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl md:h-112 md:w-md" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-30"
        >
          {homeFinalConstellationLinks.map((link) => {
            const from = homeFinalConstellationNodes.find(
              (node) => node.id === link.from,
            );
            const to = homeFinalConstellationNodes.find(
              (node) => node.id === link.to,
            );
            if (!from || !to) return null;

            return (
              <line
                key={`${link.from}-${link.to}`}
                className="home-final-line stroke-primary/30"
                x1={from.left}
                y1={from.top}
                x2={to.left}
                y2={to.top}
                strokeWidth="0.18"
              />
            );
          })}
        </svg>
        {homeFinalConstellationNodes.map((node) => (
          <span
            key={node.id}
            className="home-final-node absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60 shadow-[0_0_18px_var(--color-primary)]"
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
          />
        ))}
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

        <CustomLink to="/register" variant="primary" icon={<ChevronRight />}>
          Comenzar con mi Storativa
        </CustomLink>
      </div>
    </section>
  );
};

export default HomeConclusion;
