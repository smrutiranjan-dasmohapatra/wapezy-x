
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealText({
  text,
  lines,
  as: Component = "div",
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words =
        containerRef.current?.querySelectorAll(".word-reveal");

      if (!words?.length) return;

      gsap.fromTo(
        words,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // If manual lines are provided
  if (lines) {
    return (
      <Component
        ref={containerRef}
        lang="en"
        className={className}
      >
        {/* DESKTOP / TABLET */}
        <div className="hidden md:flex flex-col w-full">
          {lines.map((line, lineIndex) => {
            const words = line.split(" ");

            return (
              <div
                key={lineIndex}
                className="flex w-full justify-between"
              >
                {words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="word-reveal inline-block will-change-opacity"
                  >
                    {word}
                  </span>
                ))}
              </div>
            );
          })}
        </div>

        {/* MOBILE — normal text flow */}
        <div className="md:hidden">
          {text}
        </div>
      </Component>
    );
  }

  // Normal text mode
  const words = text.split(" ");

  return (
    <Component
      ref={containerRef}
      lang="en"
      className={className}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="word-reveal inline will-change-opacity">
            {word}
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </Component>
  );
}
