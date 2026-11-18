
import { useEffect } from "react";
import Lenis from "lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,

      // Smooth interpolation
      lerp: 0.065,

      // Wheel control
      smoothWheel: true,
      wheelMultiplier: 0.55,

      // Touch control
      syncTouch: false,
      touchMultiplier: 1,

      // Prevent excessive scroll acceleration
      infinite: false,
    });

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    // Synchronize GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(update);

    // Keep GSAP and Lenis synchronized
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}
