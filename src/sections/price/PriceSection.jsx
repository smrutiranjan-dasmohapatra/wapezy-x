
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionHeading from "../../components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const basicFeatures = [
  "WhatsApp catalog and orders",
  "Appointment booking on WhatsApp",
  "Appointment reminders",
  "Chat with customers from the Wapezy app",
  "No limits on staff, customers or messages",
  "Complete setup done for you",
  "Cancel anytime",
];

const smartFeatures = [
  "Everything in Basic",
  "AI takes orders and bookings",
  "AI answers customer questions",
  "No monthly fee",
  "Pay only when AI handles an order or appointment",
  "Add balance whenever you need",
  "Cancel anytime",
];

function BasicIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <path
        d="M24 2V46M2 24H46M8 8L40 40M40 8L8 40"
        stroke="#211D1F"
        strokeWidth="6"
        strokeLinecap="square"
      />
    </svg>
  );
}

function SmartIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="40" height="21" rx="2" fill="#4ADE80" />
      <rect x="4" y="31" width="25" height="12" rx="2" fill="#4ADE80" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="mt-[2px] h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M3 8.2L6.2 11.2L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureList({ features, isSmart }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {features.map((feature) => (
        <li
          key={feature}
          className="price-feature flex items-start gap-2 text-[13px] font-medium leading-[1.5] sm:text-[14px]"
        >
          <CheckIcon />
          <span
            className={
              isSmart
                ? "font-medium text-white/85"
                : "font-medium text-[#211D1F]/85"
            }
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PriceColumn({
  name,
  price,
  description,
  features,
  type = "basic",
  href,
}) {
  const isSmart = type === "smart";

  return (
    <article
      className={`price-column flex min-w-0 flex-col rounded-[3px] p-6 sm:p-7 lg:p-8 ${
        isSmart
          ? "bg-[#211D1F] text-white"
          : "bg-[#4ADE80] text-[#211D1F]"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <h3 className="pt-1 text-[15px] font-bold tracking-tight">
          {name}
        </h3>

        {isSmart ? <SmartIcon /> : <BasicIcon />}
      </div>

      {/* PRICE */}

      <div className="mt-3">
        <div className="flex flex-wrap items-baseline gap-x-1">
          <span className="text-[48px] leading-[1.05] font-bold tracking-[-0.065em] sm:text-[56px] lg:text-[64px]">
            {price}
          </span>

          <span
            className={`text-[14px] font-semibold ${
              isSmart ? "text-white/65" : "text-[#211D1F]/65"
            }`}
          >
            / once
          </span>
        </div>

        <p
          className={`mt-2 text-[13px] font-semibold sm:text-[14px] ${
            isSmart ? "text-white/75" : "text-[#211D1F]/75"
          }`}
        >
          + ₹1,499 / year from Year 2
        </p>
      </div>

      {/* DESCRIPTION */}

      <p
        className={`mt-5 max-w-[300px] text-[14px] font-medium leading-[1.55] ${
          isSmart ? "text-white/85" : "text-[#211D1F]/85"
        }`}
      >
        {description}
      </p>

      {/* AI USAGE */}

      {isSmart && (
        <div className="mt-5 border-l-2 border-[#4ADE80] pl-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">
            AI usage
          </p>

          <p className="mt-1 text-[14px] font-semibold text-white">
            ₹5{" "}
            <span className="text-[13px] font-medium text-white/75">
              per AI-handled order or appointment
            </span>
          </p>
        </div>
      )}

      {/* FEATURES */}

      <div className="mt-6 flex-1">
        <FeatureList features={features} isSmart={isSmart} />
      </div>

      {/* CTA BUTTON */}

      <div className="mt-7">
        <a
          href={href}
          className="price-cta group inline-flex items-center gap-3 rounded-[3px] border border-black/10 bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-all duration-300 hover:bg-[#211D1F] hover:text-white"
        >
          <span>Get started</span>

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
            <span className="price-cta-arrow inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </a>
      </div>
    </article>
  );
}

/* ================= PRICE SECTION ================= */

export default function PriceSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".price-column", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".price-grid",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".price-feature", {
        y: 10,
        opacity: 0,
        duration: 0.45,
        stagger: 0.025,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".price-grid",
          start: "top 82%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative  px-4 sm:px-6 lg:px-8"
      id='pricing'
    >
      <div className="mx-auto max-w-[1440px]">

        {/* SECTION HEADING */}
        <SectionHeading
          label="Simple Pricing"
          text="Choose the plan that works for your business. Get everything you need to manage orders and appointments with Wapezy."
          className="px-0 pb-0"
        />

        {/* PRICING CARDS */}
        <div className="price-grid mt-30 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">

          {/* BASIC PLAN */}
          <PriceColumn
            name="Basic"
            price="₹2,999"
            description="Everything set up for your business. Simple WhatsApp management, without AI."
            features={basicFeatures}
            type="basic"
            href="https://www.wapezy.com/#em-cta"
          />

          {/* SMART PLAN */}
          <PriceColumn
            name="Smart"
            price="₹2,999"
            description="Everything in Basic, with AI that handles customer orders and appointments."
            features={smartFeatures}
            type="smart"
            href="https://www.wapezy.com/#em-cta"
          />

        </div>
      </div>
    </section>
  );
}
