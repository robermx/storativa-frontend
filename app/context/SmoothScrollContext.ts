import { createContext, useContext, RefObject } from 'react';
import type { ScrollSmoother } from 'gsap/ScrollSmoother';

interface SmoothScrollContextValue {
  smoother: ScrollSmoother | null;
  wrapperRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  smoother: null,
  wrapperRef: { current: null },
  contentRef: { current: null },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);
