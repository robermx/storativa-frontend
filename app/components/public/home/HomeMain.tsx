import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Trans, useTranslation } from 'react-i18next';

import {
  homeConstellationLinks,
  homeConstellationNodes,
} from '@/constants/common/home.constants';

const HomeMain = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation('home');

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set('.home-constellation-node', { opacity: 0.7, scale: 1 });
        gsap.set('.home-constellation-line, .home-hero-copy', {
          opacity: 1,
          y: 0,
        });
        gsap.set('.home-constellation-line', { strokeDashoffset: 0 });
        return;
      }

      const timeline = gsap.timeline();
      const constellationLines = gsap.utils.toArray<SVGLineElement>(
        '.home-constellation-line',
      );

      constellationLines.forEach((line) => {
        const lineLength = line.getTotalLength();

        gsap.set(line, {
          opacity: 0,
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });
      });

      timeline
        .from(
          '.home-constellation-node',
          {
            opacity: 0,
            scale: 0,
            x: (index) => (index % 2 === 0 ? -1 : 1) * (14 + index * 2),
            y: (index) => (index % 3 === 0 ? -20 : 24),
            duration: 0.5,
            stagger: 0.025,
            ease: 'back.out(2.2)',
          },
          0,
        )
        .to(
          constellationLines,
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out',
          },
          0.3,
        )
        .to(
          constellationLines,
          {
            strokeWidth: 0.32,
            duration: 0.9,
            repeat: 1,
            yoyo: true,
            ease: 'sine.inOut',
          },
          1,
        )
        .to(
          '.home-constellation-node',
          {
            scale: 1.16,
            duration: 0.5,
            repeat: 1,
            yoyo: true,
            stagger: 0.04,
            ease: 'sine.inOut',
          },
          0.5,
        )
        .from(
          '.home-hero-copy',
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
          },
          0.8,
        )
        .to(
          '.home-constellation-node',
          {
            y: -10,
            duration: 0.9,
            repeat: -1,
            yoyo: true,
            stagger: 0.25,
            ease: 'sine.inOut',
          },
          2.5,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[calc(100vh-var(--nav-height)*1px)] overflow-hidden text-center flex flex-col justify-center items-center px-6"
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
        <Trans
          ns="home"
          i18nKey="hero.title"
          components={{ highlight: <span className="text-primary" /> }}
        />
      </h1>
      <p className="home-hero-copy relative z-10 max-w-2xl text-lg md:text-xl text-dark dark:text-light font-light leading-relaxed">
        {t('hero.description')}
      </p>
    </section>
  );
};

export default HomeMain;
