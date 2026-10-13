import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Menu } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { business } from "../data/business";
import AnimatedButton from "../ui/AnimatedButton";
import FullscreenMenu from "../ui/FullscreenMenu";
import styles from "./Header.module.css";

registerGSAP();

export default function Header() {
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header || reduced) return undefined;

      gsap.fromTo(
        header,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
      );
    },
    { dependencies: [reduced], scope: headerRef }
  );

  const handleNavigate = (href) => {
    setMenuOpen(false);
    if (!href) return;
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          <a href="#home" className={styles.brand} aria-label="Cafe Exchange home">
            <span className={styles.logo}>{business.logoText}</span>
            <span className={styles.subtitle}>{business.subtitle}</span>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul className={styles.navList}>
              {business.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <AnimatedButton
              href="#menu"
              variant="primary"
              className={styles.cta}
              ariaLabel="Explore the menu"
            >
              Explore Menu
            </AnimatedButton>

            <button
              type="button"
              className={styles.toggle}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="fullscreen-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.6} aria-hidden="true" />
              <span className={styles.toggleLabel}>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
}
