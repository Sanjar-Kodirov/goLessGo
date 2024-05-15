import { MutableRefObject, useEffect } from 'react';

export interface UseInfinityScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement | null>;
  wrapperRef: MutableRefObject<HTMLElement | null>;
}

export const useInfinityScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfinityScrollOptions) => {
  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback && triggerRef.current && wrapperRef.current) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerRef.current);

      return () => {
        if (observer && triggerElement) {
          observer.unobserve(triggerElement);
        }
      };
    }
  }, [callback, triggerRef, wrapperRef]);
};
