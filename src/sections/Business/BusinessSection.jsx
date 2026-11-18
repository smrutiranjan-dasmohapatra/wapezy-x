
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionHeading from "../../components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/* ================= BUSINESS DATA ================= */

const businesses = [
  {
    number: "01",
    icon: "🛍️",
    badgeBg: "bg-rose-100",
    title: "Online sellers",
    description:
      "Clothes, gifts and home-made products. Share one link on Instagram and Status, or take orders from your WhatsApp catalog.",
    buttonText: "Explore online",
  },
  {
    number: "02",
    icon: "🛒",
    badgeBg: "bg-lime-100",
    title: "Kirana & grocery",
    description:
      "Your shelf online. Customers order on WhatsApp and you deliver from the shop.",
    buttonText: "Explore grocery",
  },
  {
    number: "03",
    icon: "🍛",
    badgeBg: "bg-amber-100",
    title: "Cloud kitchens & restaurants",
    description:
      "Your full menu on one link. Orders land in WhatsApp with 0% commission.",
    buttonText: "Explore kitchens",
  },
  {
    number: "04",
    icon: "🎂",
    badgeBg: "bg-pink-100",
    title: "Bakeries & sweets",
    description:
      "Cakes, snacks and custom orders, with pickup or delivery.",
    buttonText: "Explore bakeries",
  },
  {
    number: "05",
    icon: "💊",
    badgeBg: "bg-sky-100",
    title: "Pharmacies & medical stores",
    description:
      "Put your medicine list on WhatsApp. Customers enquire, confirm, and get their orders delivered.",
    buttonText: "Explore pharmacies",
  },
  {
    number: "06",
    icon: "🩺",
    badgeBg: "bg-teal-100",
    title: "Clinics & doctors",
    description:
      "Make consultations easier. Let patients book appointments directly through WhatsApp.",
    buttonText: "Explore clinics",
  },
  {
    number: "07",
    icon: "💇",
    badgeBg: "bg-purple-100",
    title: "Salons & spas",
    description:
      "Customers choose a service, stylist, and slot in chat. Send appointment reminders automatically.",
    buttonText: "Explore salons",
  },
  {
    number: "08",
    icon: "🏋️",
    badgeBg: "bg-orange-100",
    title: "Fitness & wellness",
    description:
      "Let customers book classes, trainers, and therapy sessions directly through chat.",
    buttonText: "Explore fitness",
  },
];

/* ================= INITIAL COLORS ================= */

const initialColors = [
  "#FBCFE8",
  "#D9F99D",
  "#FDE68A",
  "#FBCFE8",
  "#BAE6FD",
  "#99F6E4",
  "#E9D5FF",
  "#FED7AA",
];

/* ================= SECTION ================= */

export default function BusinessSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".business-card");

      // Reveal cards in pairs
      for (let i = 0; i < cards.length; i += 2) {
        const row = cards.slice(i, i + 2);

        const content = row.map((card) =>
          card.querySelector(".card-content")
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Card reveal animation
        tl.fromTo(
          row,
          {
            scale: 0.5,
            autoAlpha: 0,
            rotation: (index) => (index % 2 === 0 ? -5 : 5),
            backgroundColor: (index) => initialColors[i + index],
            borderRadius: "40px",
          },
          {
            scale: 1,
            autoAlpha: 1,
            rotation: 0,
            borderRadius: "3px",
            duration: 0.55,
            stagger: 0.08,
            ease: "back.out(1.5)",
          }
        );

        // Card content reveal
        tl.fromTo(
          content,
          {
            autoAlpha: 0,
            y: 16,
            scale: 0.96,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.25"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="business-types"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <SectionHeading
          label="Who We Serve"
          text="From local shops to growing brands, Wapezy helps every business simplify customer conversations."
          className="px-0 pb-15"
        />

        {/* Business Cards */}
        <div className="mt-24 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {businesses.map((business) => (
            <article
              key={business.number}
              className="business-card invisible flex min-h-[340px] flex-col justify-between rounded-[3px] bg-green-400 p-8 sm:min-h-[360px] sm:p-10"
            >
              <div className="card-content flex h-full flex-col">

                {/* Top section */}
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium tracking-widest text-black/50">
                    {business.number}
                  </span>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${business.badgeBg} text-2xl`}
                  >
                    {business.icon}
                  </div>
                </div>

                {/* Card content */}
                <div className="mt-10 flex-1">
                  <h3 className="max-w-md text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                    {business.title}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-black/65 sm:text-base">
                    {business.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href="#how-it-works"
                    className="group inline-flex items-center gap-4 rounded-[3px] border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    {business.buttonText}

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                      →
                    </span>
                  </a>
                </div>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
