
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealText from "../../components/common/ScrollRevealText.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef(null);
  const storyRef = useRef(null);

  const messageOneRef = useRef(null);
  const messageTwoRef = useRef(null);
  const messageThreeRef = useRef(null);
  const messageFourRef = useRef(null);
  const confirmedRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const messages = [
        messageOneRef.current,
        messageTwoRef.current,
        messageThreeRef.current,
        messageFourRef.current,
        confirmedRef.current,
      ];

      gsap.set(messages, {
        autoAlpha: 0,
        y: 18,
        scale: 0.96,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(storyRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "center center",
        force3D: true,
      });

      const mm = gsap.matchMedia();

      // MOBILE ANIMATION
      mm.add("(max-width: 639px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=45%",
            toggleActions: "play none none none",
            once: true,
            pin: false,
            invalidateOnRefresh: true,
          },
        });

        tl.to(storyRef.current, {
          scale: 0.78,
          x: 0,
          y: "-22vh",
          duration: 0.18,
          ease: "none",
        }, 0)

        .to(messageOneRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.18)

        .to(messageTwoRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.32)

        .to(messageThreeRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.46)

        .to(messageFourRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.60)

        .to(confirmedRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: "power2.out",
        }, 0.74);
      });

      // DESKTOP ANIMATION
      mm.add("(min-width: 640px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=45%",
            toggleActions: "play none none none",
            once: true,
            pin: false,
            invalidateOnRefresh: true,
          },
        });

        tl.to(storyRef.current, {
          scale: 0.52,
          x: "-27vw",
          y: "-14vh",
          duration: 0.18,
          ease: "none",
        }, 0)

        .to(messageOneRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.18)

        .to(messageTwoRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.32)

        .to(messageThreeRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.46)

        .to(messageFourRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        }, 0.60)

        .to(confirmedRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: "power2.out",
        }, 0.74);
      });

      ScrollTrigger.refresh();

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story-section"
      className="relative h-[100svh] min-h-[100svh] w-full overflow-visible px-[8vw] text-green-950 max-sm:px-5"
    >
      {/* MAIN STORY HEADING */}
      <div
        ref={storyRef}
        className="absolute left-1/2 top-1/2 z-0 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 transform-gpu max-sm:max-w-[90vw]"
      >
        <ScrollRevealText
          text="It starts with a simple Hi 👋"
          as="h2"
          className="text-4xl font-medium leading-[0.98] tracking-[-0.05em] text-green-950 max-sm:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl"
        />
      </div>

      {/* WHATSAPP CONVERSATION */}
      <div className="absolute right-[9vw] top-[68%] z-10 flex w-[min(38vw,460px)] -translate-y-1/2 flex-col gap-3 max-sm:left-1/2 max-sm:right-auto max-sm:top-[60%] max-sm:w-[min(88vw,390px)] max-sm:-translate-x-1/2 max-sm:translate-y-0 max-sm:gap-2 sm:max-md:right-[6vw] sm:max-md:w-[min(48vw,420px)]">

        {/* 01 - CUSTOMER */}
        <div
          ref={messageOneRef}
          className="ml-auto max-w-[80%] rounded-[18px] rounded-tr-[4px] bg-[#d9fdd3] px-5 py-3.5 text-base font-medium leading-snug max-sm:max-w-[82%] max-sm:rounded-[15px] max-sm:px-4 max-sm:py-2.5 max-sm:text-[13px]"
        >
          Hi 👋
        </div>

        {/* 02 - WAPEZY */}
        <div
          ref={messageTwoRef}
          className="max-w-[88%] rounded-[18px] rounded-tl-[4px] border border-green-950/10 bg-white px-5 py-3.5 text-base font-medium leading-snug max-sm:max-w-[90%] max-sm:rounded-[15px] max-sm:px-4 max-sm:py-2.5 max-sm:text-[13px]"
        >
          Hi! 👋 How can I help you today?
        </div>

        {/* 03 - CUSTOMER */}
        <div
          ref={messageThreeRef}
          className="ml-auto max-w-[88%] rounded-[18px] rounded-tr-[4px] bg-[#d9fdd3] px-5 py-3.5 text-base font-medium leading-snug max-sm:max-w-[88%] max-sm:rounded-[15px] max-sm:px-4 max-sm:py-2.5 max-sm:text-[13px]"
        >
          I'd like to book an appointment for tomorrow.
        </div>

        {/* 04 - WAPEZY */}
        <div
          ref={messageFourRef}
          className="max-w-[88%] rounded-[18px] rounded-tl-[4px] border border-green-950/10 bg-white px-5 py-3.5 text-base font-medium leading-snug max-sm:max-w-[94%] max-sm:rounded-[15px] max-sm:px-4 max-sm:py-2.5 max-sm:text-[13px]"
        >
          Great! I have a slot available at 11:00 AM. Would that work for you?
        </div>

        {/* 05 - CONFIRMATION */}
        <div
          ref={confirmedRef}
          className="mt-2 max-w-[92%] rounded-[18px] rounded-tl-[4px] border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-4 max-sm:mt-1 max-sm:max-w-[96%] max-sm:rounded-[15px] max-sm:px-4 max-sm:py-3"
        >
          <p className="text-[10px] font-semibold text-green-950/50 max-sm:text-[9px]">
            Appointment confirmed
          </p>

          <div className="mt-2 flex items-center gap-2 max-sm:mt-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-xs font-bold text-green-950 max-sm:h-5 max-sm:w-5 max-sm:text-[10px]">
              ✓
            </span>

            <p className="text-base font-semibold max-sm:text-[13px]">
              Tomorrow · 11:00 AM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
