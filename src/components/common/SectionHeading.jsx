
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealText from "./ScrollRevealText";

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeading({
  label = "How Wapezy Works",
  text = "We partner with businesses on automated WhatsApp flows, instant bookings, and growth that scales effortlessly.",
  className = "",
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          autoAlpha: 0,
          y: 24,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative flex w-full flex-col justify-center overflow-hidden  pt-30 text-green-950 ${className}`}
    >
      <div ref={contentRef} className="w-full max-w-2xl">
        {/* Section Label */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-green-950" />

            <span className="text-[18px] font-medium tracking-normal text-green-950">
              {label}
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <ScrollRevealText
          as="h2"
          text={text}
          className="max-w-xl text-xl font-normal leading-[1.25] tracking-[-0.03em] text-green-950 sm:text-[21px]"
        />
      </div>
    </section>
  );
}
