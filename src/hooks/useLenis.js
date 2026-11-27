
import { useEffect } from "react";
import Lenis from "lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    // Normal native scrolling on mobile
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      ScrollTrigger.refresh();
      return;
    }

    // Lenis smooth scrolling on desktop
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.55,
      infinite: false,
    });

    // GSAP synchronization
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}
