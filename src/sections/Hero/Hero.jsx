import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "../../components/common/Button.jsx";

const languages = ["language", "भाषा", "ଭାଷା", "ভाषা"];

const eyebrowText = "AI-powered WhatsApp for local business";

// Split text into individual letters
function SplitText({ children, className = "" }) {
  return (
    <span className={className}>
      {Array.from(children).map((char, index) => {
        if (char === " ") {
          return (
            <span
              key={index}
              className="reveal-space inline-block whitespace-pre"
              aria-hidden="true"
            >
              {"\u00A0"}
            </span>
          );
        }

        return (
          <span
            key={index}
            className="reveal-letter inline-block origin-center will-change-[opacity,transform]"
            aria-hidden="true"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const wordRef = useRef(null);
  const animationRef = useRef(null);

  // Animate only WhatsApp and 24×7
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // WhatsApp animation
      const whatsappLetters = gsap.utils.toArray(
        ".hero-whatsapp .reveal-letter"
      );

      tl.fromTo(
        whatsappLetters,
        {
          opacity: 0,
          y: 25,
          rotation: (i) =>
            [25, -15, 35, -25, 15, -30, 20, -20][i % 8],
          scale: (i) =>
            [0.7, 1.2, 0.8, 1.15, 0.75, 1.1, 0.9, 1.2][i % 8],
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.055,
          ease: "back.out(1.5)",
        }
      );

      // 24×7 animation
      const timeLetters = gsap.utils.toArray(
        ".hero-time .reveal-letter"
      );

      tl.fromTo(
        timeLetters,
        {
          opacity: 0,
          y: 20,
          rotation: (i) =>
            [35, -25, 20, -35, 25, -15][i % 6],
          scale: 0.7,
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.065,
          ease: "back.out(1.7)",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Automatically change language
  useEffect(() => {
    const interval = setInterval(() => {
      const word = wordRef.current;
      if (!word) return;

      animationRef.current?.kill();

      animationRef.current = gsap.to(word, {
        yPercent: -110,
        autoAlpha: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % languages.length);
        },
      });
    }, 2600);

    return () => {
      clearInterval(interval);
      animationRef.current?.kill();
    };
  }, []);

  // Reveal new language
  useLayoutEffect(() => {
    const word = wordRef.current;
    if (!word) return;

    animationRef.current?.kill();

    animationRef.current = gsap.fromTo(
      word,
      {
        yPercent: 110,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.55,
        ease: "power4.out",
        clearProps: "transform",
      }
    );

    return () => animationRef.current?.kill();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden px-[4vw] text-green-950 max-sm:min-h-[100svh] max-sm:px-5 max-sm:pt-24 sm:px-7 sm:pt-20 lg:px-[4vw] lg:pt-16"
    >
      {/* Top-left eyebrow */}
      <div className="absolute left-5 top-6 z-10 sm:left-7 sm:top-8 lg:left-[4vw]">
        <p className="flex flex-wrap items-center text-xs font-semibold  text-green-950 sm:text-[15px]">
          {Array.from(eyebrowText).map((char, index) => (
            <span
              key={index}
              className={`inline-block whitespace-pre ${
                index < 2
                  ? "text-[1.65em] font-semibold tracking-[0.04em] text-green-700"
                  : ""
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center pb-16 text-center max-sm:pb-10 sm:pb-14 lg:pb-16">
        {/* Main heading */}
        <h1 className="hero-heading w-full max-w-6xl text-5xl font-medium leading-[1.12] tracking-[-0.045em] text-green-950 max-sm:text-[clamp(2.35rem,9vw,3.5rem)] max-sm:leading-[1.16] max-sm:tracking-[-0.045em] sm:text-5xl sm:leading-[1.12] md:text-6xl lg:text-7xl">
          <SplitText className="hero-main">
            Let your customers book
          </SplitText>

          <br className="max-sm:hidden" />

          <span className="hidden max-sm:block" />

          <SplitText className="hero-main">
            on{" "}
          </SplitText>

          <span className="hero-whatsapp inline-block whitespace-nowrap text-[#00c347]">
            <SplitText>WhatsApp</SplitText>
          </span>

          <SplitText className="hero-time">
            , 24×7
          </SplitText>
        </h1>

        {/* Description */}
        <p className="hero-description w-full max-w-4xl text-xl font-medium leading-[1.2] tracking-[-0.03em] text-green-950 max-sm:mt-6 max-sm:max-w-[36rem] max-sm:text-[clamp(1.05rem,4.4vw,1.4rem)] max-sm:leading-[1.45] max-sm:tracking-[-0.025em] sm:mt-7 sm:text-2xl md:text-3xl lg:mt-8 lg:text-4xl">
          <SplitText>
            Appointments, orders and updates — in your customers'
          </SplitText>

          {" "}

          {/* Language animation */}
          <span className="relative inline-block h-[1.35em] w-[5.2em] overflow-hidden align-middle leading-[1.35]">
            <span
              ref={wordRef}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[1.12em] font-semibold leading-[1.3] text-green-950 will-change-transform"
            >
              {languages[activeIndex]}
            </span>
          </span>

          <SplitText>
            , on the app they already use.
          </SplitText>
        </p>
      </div>

      {/* Bottom content */}
      <div className="flex w-full items-center justify-between gap-4 pb-30 sm:gap-6 sm:pb-12 lg:pb-20">
        <p className="w-full max-w-sm text-sm font-medium leading-relaxed text-green-950 max-sm:max-w-[65%] max-sm:text-[12px] max-sm:leading-[1.5] sm:text-base">
          Book appointments, take orders and keep customers updated — all on
          WhatsApp.
        </p>

        <div className="shrink-0">
          <Button
            className="bg-green-900 text-white max-sm:!px-4 max-sm:!py-2 max-sm:!text-xs"
            as="a"
            href="#section-one"
          >
            Start Free
          </Button>
        </div>
      </div>
    </section>
  );
}