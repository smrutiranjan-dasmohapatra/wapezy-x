import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function useGsapAnimation(animate) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    if (!animate) return undefined;

    const context = gsap.context(() => animate(gsap), scope);
    return () => context.revert();
  }, [animate]);

  return scope;
}
