import {
  FC,
  PropsWithChildren,
  useRef,
  useState,
  useEffect,
  Fragment,
} from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import { SmoothScrollContext } from '@/context/SmoothScrollContext';

gsap.registerPlugin(ScrollSmoother);

interface SmoothScrollProviderProps extends PropsWithChildren {
  enabled: boolean;
}

const SmoothScrollProvider: FC<SmoothScrollProviderProps> = ({
  enabled,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useEffect(() => {
    if (!enabled || !wrapperRef.current || !contentRef.current) {
      return;
    }

    const smootherInstance = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      smoothTouch: 0.5,
      effects: true,
      normalizeScroll: true,
    });

    setSmoother(smootherInstance);

    return () => {
      smootherInstance.kill();
      setSmoother(null);
    };
  }, [enabled]);

  return (
    <SmoothScrollContext.Provider value={{ smoother, wrapperRef, contentRef }}>
      {enabled ? (
        <div ref={wrapperRef} id="smooth-wrapper">
          <div ref={contentRef} id="smooth-content">
            {children}
          </div>
        </div>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
