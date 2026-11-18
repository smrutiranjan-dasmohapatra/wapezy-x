import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.12,
  duration = 1.2,
}) {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
      });

      gsap.fromTo(
        split.lines,
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration,
          delay,
          stagger,
          ease: "power4.out",
        }
      );

      return () => split.revert();
    }, textRef);

    return () => ctx.revert();
  }, [delay, stagger, duration]);

  return (
    <div
      ref={textRef}
      className={`text-reveal ${className}`}
    >
      {children}
    </div>
  );
}