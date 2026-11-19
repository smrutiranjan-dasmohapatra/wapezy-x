import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionHeading from "../../components/common/SectionHeading.jsx";

gsap.registerPlugin(ScrollTrigger);

/* ================= FEATURE DATA ================= */

const features = [
  {
    id: 1,
    type: "whatsapp",
    title: "Your customers are already on WhatsApp",
    description:
      "No new app for them to learn. They message your number like they always do, and connecting your WhatsApp to Wapezy takes a few taps.",
  },
  {
    id: 2,
    type: "store",
    title: "Free online store",
    description:
      "Every Wapezy business gets its own store link with photos, prices and a cart. Orders land in your WhatsApp. No website or developer needed.",
  },
  {
    id: 3,
    type: "language",
    title: "Your customers' language",
    description:
      "Your customers order and book in multiple languages: English, Hindi, Kannada and more. Wapezy replies in theirs, so nobody gets stuck.",
  },
  {
    id: 4,
    type: "payment",
    title: "Prepayment built in",
    description:
      "Take payment before the visit or delivery by UPI or card, or let customers pay cash. Fewer no-shows, no chasing money.",
  },
];

/* ================= ANIMATED SVG ICONS ================= */

function FeatureIcon({ type }) {
  switch (type) {
    /* WHATSAPP */

    case "whatsapp":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          <g className="icon-main">
            <path
              d="M60 12C34 12 14 29 14 51C14 73 34 90 60 90C67 90 74 89 80 86L99 99L96 78C104 70 108 61 108 51C108 29 86 12 60 12Z"
              fill="#183C08"
            />
          </g>

          <g className="icon-dots" fill="#F1FFF0">
            <circle cx="43" cy="52" r="4" />
            <circle cx="60" cy="52" r="4" />
            <circle cx="77" cy="52" r="4" />
          </g>

          <g className="icon-secondary">
            <path
              d="M10 81C10 64 23 56 43 56H71C91 56 104 66 104 82C104 98 91 108 71 108H31L17 118L19 104C13 99 10 91 10 81Z"
              fill="#58D77C"
            />

            <path
              d="M34 77H75M34 87H66"
              stroke="#183C08"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    /* ONLINE STORE */

    case "store":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          <g className="icon-main">
            <path d="M18 39H102V94H18V39Z" fill="#183C08" />

            <path
              d="M12 39L19 16H101L108 39C108 48 100 54 93 49C90 47 88 43 88 39C88 48 82 53 75 53C68 53 63 48 63 39C63 48 57 53 50 53C43 53 37 48 37 39C37 48 31 53 24 53C17 53 12 47 12 39Z"
              fill="#58D77C"
            />

            <path
              d="M43 94V74C43 67 48 62 55 62H66C73 62 78 67 78 74V94"
              fill="#F1FFF0"
            />

            <circle cx="65" cy="79" r="2" fill="#183C08" />
          </g>

          <g className="icon-sparkle">
            <path
              d="M102 11V23M96 17H108"
              stroke="#58D77C"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    /* LANGUAGE */

    case "language":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          <g className="icon-main">
            <path
              d="M60 10C37 10 20 23 20 43C20 63 37 76 60 76H82L101 91L99 68C105 61 108 53 108 43C108 23 88 10 60 10Z"
              fill="#183C08"
            />

            <circle cx="45" cy="43" r="4" fill="#F1FFF0" />
            <circle cx="62" cy="43" r="4" fill="#F1FFF0" />
            <circle cx="79" cy="43" r="4" fill="#F1FFF0" />
          </g>

          <g className="icon-secondary">
            <path
              d="M10 82C10 65 24 57 44 57H68C88 57 103 67 103 83C103 99 88 109 68 109H31L17 120L19 105C13 100 10 92 10 82Z"
              fill="#58D77C"
            />

            <path
              d="M34 77H75M34 87H65"
              stroke="#183C08"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    /* PAYMENT */

    case "payment":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          <g className="icon-main">
            <rect x="12" y="19" width="96" height="69" rx="13" fill="#183C08" />

            <path d="M12 38H108" stroke="#58D77C" strokeWidth="7" />

            <path
              d="M28 62H52"
              stroke="#F1FFF0"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          <g className="icon-coin">
            <circle cx="91" cy="91" r="23" fill="#58D77C" />

            <circle cx="91" cy="91" r="17" stroke="#183C08" strokeWidth="2.5" />

            <path
              d="M98 82C95 77 83 78 83 85C83 91 99 89 99 97C99 104 86 106 82 99M91 74V108"
              stroke="#183C08"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    default:
      return null;
  }
}

/* ================= MAIN SECTION ================= */

export default function ReasonSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".feature-row");

      rows.forEach((row, index) => {
        const icon = row.querySelector(".feature-icon");
        const main = row.querySelector(".icon-main");
        const secondary = row.querySelector(".icon-secondary");
        const coin = row.querySelector(".icon-coin");
        const sparkle = row.querySelector(".icon-sparkle");
        const dots = row.querySelector(".icon-dots");

        /* ICON REVEAL */

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          icon,
          {
            opacity: 0,
            scale: 0.65,
            rotation: -15,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.8)",
          },
        );

        if (main) {
          tl.fromTo(
            main,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.55",
          );
        }

        if (secondary) {
          tl.fromTo(
            secondary,
            { x: -12, y: 12, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(2)",
            },
            "-=0.3",
          );
        }

        if (dots) {
          tl.fromTo(
            dots.children,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.35,
              stagger: 0.1,
              ease: "back.out(2)",
            },
            "-=0.35",
          );
        }

        if (coin) {
          tl.fromTo(
            coin,
            {
              scale: 0,
              rotation: -45,
              transformOrigin: "91px 91px",
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(2.5)",
            },
            "-=0.35",
          );
        }

        if (sparkle) {
          tl.fromTo(
            sparkle,
            {
              scale: 0,
              rotation: -45,
              transformOrigin: "102px 17px",
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(2)",
            },
            "-=0.35",
          );
        }

        /* ICON FLOAT */

        gsap.to(icon, {
          y: -5,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-wapezy"
      className="w-full overflow-hidden bg-[#F0FFF0] px-0"
    >
      {/* SECTION HEADING */}

      <SectionHeading
        label="Why Wapezy?"
        text="A simpler way to manage orders, appointments, payments and customer conversations."
        className="px-[2vw] pb-20 max-md:px-4"
      />

      {/* OUTER BORDER CONTAINER */}

      <div className="w-full border-l border-[#183C08]/15">
        {features.map((item) => (
          <article
            key={item.id}
            className="
              feature-row
              grid
              grid-cols-[clamp(64px,18vw,88px)_minmax(0,1fr)]
              items-center
              gap-x-4
              gap-y-4
              min-h-0
              px-[4vw]
              py-7
              border-b
              border-[#183C08]/15

              sm:grid-cols-[90px_minmax(0,1fr)]
              sm:gap-x-6
              sm:py-8
              sm:px-[3.5vw]

              md:grid-cols-[19%_41%_40%]
              md:gap-x-0
              md:min-h-[185px]
              md:py-[30px]
            "
          >
            {/* ICON */}

            <div className="flex items-center justify-start">
              <div
                className="
                  feature-icon
                  w-full
                  aspect-square
                  max-w-[88px]
                  shrink-0

                  sm:max-w-[90px]

                  md:w-[105px]
                  md:h-[105px]
                  md:max-w-none
                  md:aspect-auto
                "
              >
                <FeatureIcon type={item.type} />
              </div>
            </div>

            {/* TITLE */}

            <div className="min-w-0 pr-0 md:pr-6">
              <h3
                className="
                  feature-title
                  text-[#183C08]
                  text-[clamp(20px,5.5vw,26px)]
                  leading-[1.2]
                  tracking-[-0.8px]
                  font-semibold

                  sm:text-[clamp(23px,3.2vw,29px)]

                  md:text-[clamp(24px,2.45vw,34px)]
                  md:tracking-[-1.5px]
                "
              >
                {item.title}
              </h3>
            </div>

            {/* DESCRIPTION */}

            <div
              className="
                col-span-2
                w-full
                max-w-none
                justify-self-stretch

                sm:col-span-2

                md:col-span-1
                md:w-full
                md:max-w-[490px]
                md:justify-self-end
              "
            >
              <p
                className="
                  feature-description
                  text-green-950
                  text-[14px]
                  leading-[1.7]
                  font-medium
                  opacity-80

                  sm:text-[15px]

                  md:text-[clamp(14px,1.22vw,16px)]
                "
              >
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
