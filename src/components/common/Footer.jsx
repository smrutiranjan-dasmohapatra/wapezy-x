
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const builtForLinks = [
  {
    name: "Salons & spas",
    href: "https://www.wapezy.com/salon-appointment-booking-whatsapp/",
  },
  {
    name: "Clinics & doctors",
    href: "https://www.wapezy.com/clinic-appointment-booking-whatsapp/",
  },
  {
    name: "Fitness & wellness",
    href: "https://www.wapezy.com/gym-fitness-booking-whatsapp/",
  },
  {
    name: "Kirana & grocery",
    href: "https://www.wapezy.com/whatsapp-online-store-kirana/",
  },
  {
    name: "Cloud kitchens & restaurants",
    href: "https://www.wapezy.com/cloud-kitchen-whatsapp-ordering/",
  },
  {
    name: "Bakeries & sweets",
    href: "https://www.wapezy.com/bakery-whatsapp-orders/",
  },
  {
    name: "Online sellers",
    href: "https://www.wapezy.com/online-sellers-whatsapp-store/",
  },
  {
    name: "Pharmacies & medical stores",
    href: "https://www.wapezy.com/pharmacy-whatsapp-orders/",
  },
];

const footerLinks = [
  { name: "Home", href: "https://www.wapezy.com/" },
  { name: "Privacy", href: "https://www.wapezy.com/privacy/" },
  { name: "Terms", href: "https://www.wapezy.com/terms/" },
  {
    name: "Refund Policy",
    href: "https://www.wapezy.com/refund-policy/",
  },
  {
    name: "Contact us",
    href: "https://www.prustaz.com/contact-us/",
  },
];

const socialLinks = ["Instagram", "LinkedIn", "Facebook"];

export default function Footer() {
  const footerRef = useRef(null);
  const backToTopRef = useRef(null);
  const arrowRef = useRef(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const backToTop = backToTopRef.current;
    const arrow = arrowRef.current;

    if (!footer || !backToTop || !arrow) return;

    const ctx = gsap.context(() => {
      const moveArrowUp = () => {
        gsap.to(arrow, {
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const resetArrow = () => {
        gsap.to(arrow, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      backToTop.addEventListener("mouseenter", moveArrowUp);
      backToTop.addEventListener("mouseleave", resetArrow);

      return () => {
        backToTop.removeEventListener("mouseenter", moveArrowUp);
        backToTop.removeEventListener("mouseleave", resetArrow);
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative w-full overflow-hidden font-medium text-green-950"
    >
      <div className="relative mx-auto w-full">
        {/* MAIN FOOTER GRID */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 text-sm font-medium leading-relaxed text-green-950 sm:grid-cols-3 sm:py-14 sm:text-base lg:grid-cols-4 lg:gap-8 lg:py-16">
            {/* BACK TO TOP */}
            <div className="flex items-start">
              <a
                ref={backToTopRef}
                href="#top"
                className="group inline-flex items-center gap-2 text-green-950 transition-opacity duration-300 hover:opacity-60"
              >
                Back to the top

                <svg
                  ref={arrowRef}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                </svg>
              </a>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="mb-1 text-green-950">Contact</h3>

              <a
                href="tel:+919071122977"
                className="text-green-950 transition-opacity hover:opacity-60"
              >
                +91-9071122977
              </a>

              <a
                href="mailto:hello@wapezy.com"
                className="text-green-950 transition-opacity hover:opacity-60"
              >
                hello@wapezy.com
              </a>

              <div className="mt-5 flex flex-col gap-1 text-green-950">
                <span>Based in</span>
                <span>Bengaluru</span>
                <span>Karnataka, India</span>
              </div>
            </div>

            {/* LINKS */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="mb-1 text-green-950">Links</h3>

              {footerLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-green-950 transition-opacity hover:opacity-60"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* BUILT FOR */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="mb-1 text-green-950">Built for</h3>

              {builtForLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-green-950 transition-opacity hover:opacity-60"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FULL-WIDTH BORDER */}
        <div className="w-full border-t border-[#D5D5C9]" />

        {/* BOTTOM FOOTER BAR */}
        <div className="px-4">
          <div className="flex flex-col justify-center gap-6 py-7 text-sm font-medium leading-relaxed text-green-950 sm:text-base lg:min-h-[88px] lg:flex-row lg:items-center lg:justify-between">
            {/* SOCIAL LINKS */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-green-950">Follow us</span>

              {socialLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-full border border-[#AEB39E] px-3 py-1 text-green-950 transition-colors duration-300 hover:bg-[#193006] hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* LEGAL LINKS */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-green-950">
              <a
                href="https://www.wapezy.com/privacy/"
                className="text-green-950 transition-opacity hover:opacity-60"
              >
                Privacy Policy
              </a>

              <a
                href="https://www.wapezy.com/terms/"
                className="text-green-950 transition-opacity hover:opacity-60"
              >
                Terms & Conditions
              </a>

              <a
                href="https://www.wapezy.com/refund-policy/"
                className="text-green-950 transition-opacity hover:opacity-60"
              >
                Refund Policy
              </a>

              <span className="whitespace-nowrap text-green-950">
                © 2026 Wapezy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
