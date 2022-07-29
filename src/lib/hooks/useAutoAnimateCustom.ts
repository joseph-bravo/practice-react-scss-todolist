import autoAnimate from '@formkit/auto-animate';
import { useRef, useEffect } from 'react';

export default function useAutoAnimateCustom() {
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  return parent;
}
