
import { useLayoutEffect, useRef, useState } from "react";

import { SITE_NAME } from "../../utils/constants.js";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Process", href: "#how-it-works" },
  { label: "Businesses", href: "#business-types" },
  { label: "Benefits", href: "#why-wapezy" },
  { label: "Faqs", href: "#faq" },
  { label: "Plans", href: "#pricing" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
];

const dotShapes = [
  [
    [7, 7],
    [17, 7],
    [7, 17],
    [17, 17],
  ],
  [
    [4, 12],
    [9.3, 12],
    [14.7, 12],
    [20, 12],
  ],
  [
    [12, 4],
    [12, 9.3],
    [12, 14.7],
    [12, 20],
  ],
  [
    [12, 3.5],
    [20.5, 12],
    [12, 20.5],
    [3.5, 12],
  ],
  [
    [7, 7],
    [17, 7],
    [7, 17],
    [17, 17],
  ],
];

export default function Navbar() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const menuTimelineRef = useRef(null);
  const activeAnimationRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  // NAVBAR BACKGROUND ANIMATION
  useLayoutEffect(() => {
    const hero = document.getElementById("home");
    const navbar = headerRef.current;

    if (!hero || !navbar) return;

    const ctx = gsap.context(() => {
      gsap.set(navbar, {
        backgroundColor: "rgba(132, 252, 144, 0.5)",
      });

      gsap.to(navbar, {
        backgroundColor: "#f0fff0",
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: hero,
          start: "bottom top+=68",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // ACTIVE SECTION DETECTION
  useLayoutEffect(() => {
    const sections = links
      .map((link) => ({
        href: link.href,
        element: document.querySelector(link.href),
      }))
      .filter((item) => item.element);

    if (!sections.length) return;

    const updateActiveSection = () => {
      const activationPoint = Math.min(window.innerHeight * 0.4, 300);

      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportBottom = scrollY + window.innerHeight;

      const firstSection = sections[0].element;
      const firstSectionTop =
        firstSection.getBoundingClientRect().top + scrollY;

      if (scrollY + activationPoint < firstSectionTop) {
        setActiveLink(null);
        return;
      }

      if (viewportBottom >= documentHeight - 2 && sections.length) {
        setActiveLink(sections[sections.length - 1].href);
        return;
      }

      let currentSection = null;

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();

        if (rect.top <= activationPoint && rect.bottom > activationPoint) {
          currentSection = section;
          break;
        }
      }

      if (!currentSection) {
        let closestDistance = Infinity;

        sections.forEach((section) => {
          const rect = section.element.getBoundingClientRect();
          const distance = Math.abs(rect.top - activationPoint);

          if (distance < closestDistance) {
            closestDistance = distance;
            currentSection = section;
          }
        });
      }

      setActiveLink((previous) =>
        previous === currentSection?.href
          ? previous
          : currentSection?.href || null,
      );
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    updateActiveSection();

    const refreshTimer = window.setTimeout(() => {
      updateActiveSection();
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
      window.clearTimeout(refreshTimer);
    };
  }, []);

  // ACTIVE LINK ANIMATION
  useLayoutEffect(() => {
    activeAnimationRef.current?.kill();

    if (!activeLink) return;

    const header = headerRef.current;
    const menu = menuRef.current;

    const activeElements = [
      ...(header
        ? Array.from(header.querySelectorAll(".nav-link")).filter(
            (el) => el.getAttribute("href") === activeLink,
          )
        : []),

      ...(menu
        ? Array.from(menu.querySelectorAll(".mobile-menu-link")).filter(
            (el) => el.getAttribute("href") === activeLink,
          )
        : []),
    ];

    if (!activeElements.length) return;

    activeAnimationRef.current = gsap.fromTo(
      activeElements,
      {
        y: 9,
        opacity: 0.45,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.035,
        ease: "power3.out",
        overwrite: true,
      },
    );

    return () => {
      activeAnimationRef.current?.kill();
    };
  }, [activeLink]);

  // FOUR DOT CONTINUOUS GSAP ANIMATION
  useLayoutEffect(() => {
    const svg = iconRef.current;

    if (!svg) return;

    const dots = svg.querySelectorAll(".menu-dot");

    if (dots.length !== 4) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.12,
    });

    dotShapes.forEach((shape, index) => {
      tl.to(
        dots,
        {
          duration: 0.55,
          ease: "power3.inOut",
          attr: (i) => ({
            cx: shape[i][0],
            cy: shape[i][1],
          }),
          stagger: 0.035,
        },
        index === 0 ? 0 : ">",
      );
    });

    return () => tl.kill();
  }, []);

  // MOBILE MENU STRAIGHT MASK REVEAL
  useLayoutEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    menuTimelineRef.current?.kill();

    if (menuOpen) {
      gsap.set(menu, {
        visibility: "visible",
        pointerEvents: "auto",
      });

      const tl = gsap.timeline();

      menuTimelineRef.current = tl;

      tl.fromTo(
        menu,
        {
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power4.inOut",
        },
      );

      tl.fromTo(
        menu.querySelectorAll(".mobile-menu-link"),
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.09,
          ease: "power3.out",
        },
        "-=0.35",
      );

      tl.fromTo(
        menu.querySelectorAll(".mobile-menu-bottom"),
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.3",
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menu, {
            visibility: "hidden",
            pointerEvents: "none",
          });
        },
      });

      menuTimelineRef.current = tl;

      tl.to(menu, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.75,
        ease: "power4.inOut",
      });
    }

    return () => {
      menuTimelineRef.current?.kill();
    };
  }, [menuOpen]);

  // MENU TOGGLE
  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // NAVIGATION CLICK
  const handleNavigation = (href) => {
    setActiveLink(href);
    closeMenu();
  };

  return (
    <>
      {/* NAVBAR */}
      <header ref={headerRef} className="sticky top-0 z-50">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-17 items-center justify-between border-x border-b border-black/10 px-[3vw]"
        >
          {/* LOGO */}
          <a
            href="#home"
            aria-label={`${SITE_NAME} home`}
            onClick={() => setActiveLink(null)}
            className="relative z-50 flex shrink-0 items-center"
          >
            <img
              src="/images/l.png"
              alt={SITE_NAME}
              className="h-7 w-auto object-contain sm:h-9"
            />
          </a>

          {/* RIGHT SIDE NAVIGATION */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-5 lg:gap-8">
            {/* DESKTOP LINKS */}
            <div className="hidden items-center gap-4 md:flex lg:gap-7">
              {links.map((link) => {
                const isActive = activeLink === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavigation(link.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={`
                      nav-link whitespace-nowrap leading-relaxed
                      transition-colors duration-300
                      ${
                        isActive
                          ? "text-sm font-bold text-green-600"
                          : "text-sm font-semibold text-green-950"
                      }
                    `}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* LET'S BOOK */}
            <a
              href="#section-three"
              className="hidden shrink-0 items-center justify-center rounded-[3px] bg-green-400 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black md:flex lg:px-6"
            >
              Let's book
            </a>

            {/* MOBILE FOUR DOT MENU BUTTON */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative z-[70] flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] bg-green-400 text-green-900 transition-colors duration-300 md:hidden"
            >
              <svg
                ref={iconRef}
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="menu-dot"
                  cx="7"
                  cy="7"
                  r="2.5"
                  fill="currentColor"
                />
                <circle
                  className="menu-dot"
                  cx="17"
                  cy="7"
                  r="2.5"
                  fill="currentColor"
                />
                <circle
                  className="menu-dot"
                  cx="7"
                  cy="17"
                  r="2.5"
                  fill="currentColor"
                />
                <circle
                  className="menu-dot"
                  cx="17"
                  cy="17"
                  r="2.5"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        ref={menuRef}
        aria-hidden={!menuOpen}
        className="invisible pointer-events-none fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col overflow-y-auto bg-green-400 px-[3.5vw] pb-7 pt-5 text-green-950 md:hidden"
        style={{
          clipPath: "inset(100% 0% 0% 0%)",
        }}
      >
        {/* TOP BAR */}
        <div className="flex shrink-0 items-center justify-between">
          <a
            href="#home"
            onClick={() => {
              setActiveLink(null);
              closeMenu();
            }}
            className="text-sm font-semibold text-green-950"
          >
            {SITE_NAME}
          </a>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="text-sm font-medium text-green-950 transition-opacity duration-300 hover:opacity-60"
          >
            Close
          </button>
        </div>

        {/* MAIN MENU LINKS */}
        <div className="mt-[15vh] flex flex-1 flex-col items-start justify-start gap-1">
          {links.map((link) => {
            const isActive = activeLink === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavigation(link.href)}
                aria-current={isActive ? "location" : undefined}
                className={`
                  mobile-menu-link w-fit 
                  text-[30px]
                  leading-[1.5] tracking-[0.065em]
                  transition-colors duration-300
                  ${
                    isActive
                      ? "font-semibold text-green-950"
                      : "font-medium text-green-950"
                  }
                `}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* BOTTOM SOCIALS */}
        <div className="mobile-menu-bottom mt-12 shrink-0">
          <p className="mb-5 text-sm font-medium text-green-950/65">
            Socials
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-green-950 transition-opacity duration-300 hover:opacity-60"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
