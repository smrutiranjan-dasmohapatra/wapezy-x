
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useBackgroundTransition(pageRef) {
  useLayoutEffect(() => {
    const page = pageRef.current;
    const story = page?.querySelector("#story-section");
    const navbar = page?.querySelector("nav");

    if (!page || !story) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top 80%",
          end: "top 10%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Page background transition
      tl.fromTo(
        page,
        {
          backgroundColor: "#84fc90",
        },
        {
          backgroundColor: "#f0fff0",
          ease: "none",
        },
        0
      );

      // Navbar background and text transition
      if (navbar) {
        tl.fromTo(
          navbar,
          {
            backgroundColor: "#84fc90",
            color: "#14532d",
          },
          {
            backgroundColor: "#f0fff0",
            color: "#86efac",
            ease: "none",
          },
          0
        );
      }
    }, page);

    return () => ctx.revert();
  }, [pageRef]);
}
