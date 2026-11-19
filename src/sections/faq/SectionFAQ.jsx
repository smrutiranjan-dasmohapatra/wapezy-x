
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import SectionHeading from "../../components/common/SectionHeading";

/* ================= FAQ DATA ================= */

const faqs = [
  {
    question: "Can I take appointments and orders?",
    answer:
      "Yes. When you sign up you choose Take appointments or Take orders, and the Wapezy app and your WhatsApp flows match that choice. The price is the same either way.",
  },
  {
    question: "Do my customers need to download an app?",
    answer:
      "No. They book or order inside the WhatsApp they already use, or from your online store link, in English, Hindi, Kannada and more languages as we add them.",
  },
  {
    question: "How do I manage bookings and orders?",
    answer:
      "From the Wapezy app on your Android phone: see today's bookings and orders, update statuses, add appointments yourself and reply to customers on WhatsApp. Everything also works on the web at app.wapezy.com.",
  },
  {
    question: "Do you take a commission on my orders?",
    answer:
      "No. Wapezy never takes a cut of your sales. Customers pay you directly, by cash or your own UPI. You only pay the Wapezy plan.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The first 15 days are free. After that Basic is ₹2,999 once (usually ₹4,999), which covers setup and your first year, then ₹1,499 a year from the second year. Smart costs the same, plus ₹5 for each order or appointment the AI handles. There is no monthly fee, and you can cancel anytime.",
  },
  {
    question: "What does AI-powered mean?",
    answer:
      "On Smart, the AI understands what a customer wants, answers their questions, and takes the order or booking for you. Basic covers booking, orders and day-to-day work without AI. To pay for AI you add balance to your Wapezy wallet; if it runs out, the AI pauses and everything else keeps working.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes, anytime, from Settings → Billing in the Wapezy app. You keep using Wapezy until the end of the period you paid for, and nothing more is charged.",
  },
  {
    question: "Can customers pay in advance?",
    answer:
      "Yes. Turn on prepayment and customers pay online by UPI or card when they book or order, or choose cash if you allow it. Wapezy takes no commission on payments.",
  },
];

/* ================= FAQ SECTION ================= */

export default function SectionFAQ() {
  const sectionRef = useRef(null);
  const answerRefs = useRef([]);
  const contentRefs = useRef([]);
  const timelinesRef = useRef([]);

  const [activeIndexes, setActiveIndexes] = useState([0]);

  /* ================= GSAP INITIALIZATION ================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      answerRefs.current.forEach((answer, index) => {
        const content = contentRefs.current[index];

        if (!answer || !content) return;

        const isOpen = activeIndexes.includes(index);

        gsap.set(answer, {
          height: isOpen ? "auto" : 0,
          autoAlpha: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        });

        gsap.set(content, {
          clipPath: isOpen
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
          y: 0,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ================= ACCORDION ANIMATION ================= */

  const animateFAQ = (index, shouldOpen) => {
    const answer = answerRefs.current[index];
    const content = contentRefs.current[index];

    if (!answer || !content) return;

    timelinesRef.current[index]?.kill();

    const tl = gsap.timeline();
    timelinesRef.current[index] = tl;

    if (shouldOpen) {
      gsap.set(answer, {
        visibility: "visible",
        height: 0,
        autoAlpha: 1,
      });

      gsap.set(content, {
        clipPath: "inset(0% 0% 100% 0%)",
        y: 14,
      });

      tl.to(
        answer,
        {
          height: "auto",
          duration: 0.6,
          ease: "power3.inOut",
        },
        0,
      );

      tl.to(
        content,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        0.12,
      );
    } else {
      tl.to(content, {
        clipPath: "inset(0% 0% 100% 0%)",
        y: -8,
        duration: 0.28,
        ease: "power2.inOut",
      });

      tl.to(
        answer,
        {
          height: 0,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(answer, {
              visibility: "hidden",
            });
          },
        },
        "-=0.12",
      );
    }
  };

  /* ================= FAQ TOGGLE ================= */

  const handleToggle = (index) => {
    const isCurrentlyOpen = activeIndexes.includes(index);

    setActiveIndexes((prev) =>
      isCurrentlyOpen
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );

    animateFAQ(index, !isCurrentlyOpen);
  };

  /* ================= CLEANUP ================= */

  useLayoutEffect(() => {
    return () => {
      timelinesRef.current.forEach((timeline) => {
        timeline?.kill();
      });
    };
  }, []);

  /* ================= JSX ================= */

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28"
    >
      <div className="w-full">
        {/* SECTION HEADING */}
        <SectionHeading
          label="FAQs"
          text="Have questions about Wapezy? Find answers to the most common questions about getting started, managing orders, and growing your business."
          className="px-[3.5vw] pb-0"
        />

        {/* FAQ CONTENT */}
        <div className="mt-30 grid w-full grid-cols-1 border-t border-b border-black/20 lg:grid-cols-[0.78fr_1fr]">

          {/* LEFT SIDE - HEADING (HIDDEN ON SMALL MOBILE) */}
          <div className="hidden border-b border-black/20 p-8 sm:block sm:p-10 md:p-14 lg:border-b-0 lg:border-r lg:p-12 xl:p-16">
            <div>
              <h2 className="max-w-lg text-3xl font-medium leading-[1.05] tracking-[-0.045em] text-[#1b350d] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                FAQs
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-green-950 sm:text-base">
                Everything you need to know about managing your business with
                Wapezy.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - ACCORDION */}
          <div className="w-full">
            {faqs.map((faq, index) => {
              const isOpen = activeIndexes.includes(index);

              return (
                <div
                  key={index}
                  className="border-b border-black/20 last:border-b-0"
                >
                  {/* QUESTION */}
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-5 px-5 py-6 text-left sm:px-8 sm:py-9 md:px-10 md:py-10"
                  >
                    <span className="max-w-3xl text-base font-normal leading-[1.3] tracking-[-0.03em] text-green-950 sm:text-xl">
                      {faq.question}
                    </span>

                    {/* SMALL PLUS / MINUS ICON */}
                    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                      <span className="absolute h-[1.3px] w-[18px] bg-[#1b350d]" />

                      <span
                        className={`absolute h-[18px] w-[1.3px] bg-[#1b350d] transition-transform duration-300 ${
                          isOpen
                            ? "rotate-90 scale-y-0"
                            : "rotate-0 scale-y-100"
                        }`}
                      />
                    </span>
                  </button>

                  {/* ANSWER */}
                  <div
                    id={`faq-answer-${index}`}
                    ref={(el) => (answerRefs.current[index] = el)}
                    className="overflow-hidden"
                    style={{
                      height: index === 0 ? "auto" : 0,
                      opacity: index === 0 ? 1 : 0,
                      visibility: index === 0 ? "visible" : "hidden",
                    }}
                  >
                    <div
                      ref={(el) => (contentRefs.current[index] = el)}
                      className="max-w-4xl px-5 pb-7 sm:px-8 sm:pb-10 md:px-10"
                    >
                      <p className="text-[13px] font-medium leading-relaxed text-green-950 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
