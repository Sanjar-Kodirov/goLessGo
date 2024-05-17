import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any) => void, delay: number) {
  const throttleRed = useRef(false);

  return useCallback(
    (...args: any) => {
      if (!throttleRed.current) {
        callback(...args);
        throttleRed.current = true;

        setTimeout(() => {
          throttleRed.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
}
