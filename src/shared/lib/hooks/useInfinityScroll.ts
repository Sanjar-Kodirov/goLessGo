import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfinityScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfinityScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfinityScrollOptions) => {
  useEffect(() => {
    if (callback) {
      let options = {
        root: document.querySelector('#scrollArea'),
        rootMargin: '0px',
        threshold: 1.0,
      };

      let observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerRef.current);

      return () => {
        if (observer) {
          observer.unobserve(triggerRef.current);
        }
      };
    }
  }, []);
};
