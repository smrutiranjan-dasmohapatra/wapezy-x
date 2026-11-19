
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LogoSection() {
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    const logo = logoRef.current;

    if (!logo) return;

    const ctx = gsap.context(() => {
      gsap.set(logo, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap.to(logo, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: "#footer",
          start: "bottom bottom",
          end: "bottom+=50vh bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={logoRef}
      id="logo-section"
      className="
        fixed bottom-0 left-0 z-0
        flex h-[45vh] min-h-[260px] w-full
        items-center justify-center
        overflow-hidden bg-green-400
        pointer-events-none
        sm:h-[55vh] lg:h-[60vh]
      "
    >
      <h1
        className="
          whitespace-nowrap text-[21vw]
          font-bold leading-[0.8]
          tracking-[-0.09em] text-[#193006]
        "
      >
        WAPEZY
      </h1>
    </section>
  );
}
