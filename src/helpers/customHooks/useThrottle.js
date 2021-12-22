import { useEffect, useCallback, useRef } from 'react'
import { throttle } from 'underscore'


export const useThrottle = (cb, delay) => {
  const options = { leading: false, trailing: true }; // pass custom lodash options
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
}
