import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import {
  homeConstellationLinks,
  homeConstellationNodes,
} from '@/constants/common/home.constants';
import { useNavHeight } from '@/store/navHeightStore';

const MainSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const navHeight = useNavHeight((state) => state.navHeight);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      gsap.from('.home-hero-copy', {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 24,
        duration: prefersReducedMotion ? 0.2 : 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      if (prefersReducedMotion) {
        gsap.set('.home-constellation-node', { opacity: 0.7, scale: 1 });
        return;
      }

      gsap.from('.home-constellation-node', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });

      gsap.from('.home-constellation-line', {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
      });

      gsap.to('.home-constellation-node', {
        y: -5,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: 'sine.inOut',
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative isolate min-h-100 overflow-hidden text-center flex flex-col justify-center items-center px-6`}
      style={{ height: `calc(100vh - ${navHeight}px)`}}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-30"
        >
          {homeConstellationLinks.map((link) => {
            const from = homeConstellationNodes.find(
              (node) => node.id === link.from,
            );
            const to = homeConstellationNodes.find(
              (node) => node.id === link.to,
            );
            if (!from || !to) return null;

            return (
              <line
                key={`${link.from}-${link.to}`}
                className="home-constellation-line stroke-primary/30"
                x1={from.left}
                y1={from.top}
                x2={to.left}
                y2={to.top}
                strokeWidth="0.18"
              />
            );
          })}
        </svg>
        {homeConstellationNodes.map((node) => (
          <span
            key={node.id}
            className="home-constellation-node absolute h-2 w-2 rounded-full bg-primary/60 shadow-[0_0_18px_var(--color-primary)]"
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
          />
        ))}
      </div>

      <h1 className="home-hero-copy relative z-10 max-w-4xl text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-light tracking-tighter mb-6">
        Todos tenemos algo dentro que busca convertirse en historia...{' '}
        <span className="text-primary">
          una idea, un recuerdo o una forma distinta de mirar el mundo.
        </span>
      </h1>
      <p className="home-hero-copy relative z-10 max-w-2xl text-lg md:text-xl text-dark dark:text-light font-light leading-relaxed">
        Storativa te acompaña a transformar aquello que te inspira en una
        historia propia: explorando épocas, lugares y posibilidades para
        encontrar una voz auténtica y compartirla con los demás.
      </p>
    </section>
  );
};

export default MainSection;
