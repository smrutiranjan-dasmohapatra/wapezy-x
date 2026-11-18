import { useEffect } from "react";
import Lenis from "lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,

      // Desktop smooth scrolling
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.55,

      // Mobile smooth scrolling
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.5,

      infinite: false,
    });

    // GSAP synchronization
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}
