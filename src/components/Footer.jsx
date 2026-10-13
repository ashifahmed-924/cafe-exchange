import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUp } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { business } from "../data/business";
import styles from "./Footer.module.css";

registerGSAP();

const COPYRIGHT_YEAR = new Date().getFullYear();

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 9h2.5V6H14a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.5-3H14V9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.6 8.2a2.5 2.5 0 0 0-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 9.8 2 12 2 12s0 2.2.4 3.8a2.5 2.5 0 0 0 1.8 1.8C5.8 18 12 18 12 18s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 14.2 22 12 22 12s0-2.2-.4-3.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10.5 9.8 15 12l-4.5 2.2V9.8Z" fill="currentColor" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.2 4c.5 2.4 2.1 4 4.5 4.4v2.5c-1.5-.1-2.9-.6-4.1-1.5v5.6a5.1 5.1 0 1 1-5.1-5.1c.3 0 .6 0 .9.1v2.6a2.6 2.6 0 1 0 1.8 2.5V4h2Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
};

export default function Footer() {
  const footerRef = useRef(null);
  const reduced = useReducedMotion();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  useGSAP(
    () => {
      if (!footerRef.current || reduced) return undefined;

      gsap.fromTo(
        footerRef.current.querySelector(`.${styles.grid}`),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      return undefined;
    },
    { scope: footerRef, dependencies: [reduced] }
  );

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <p className={styles.brand}>{business.logoText}</p>
            <p className={styles.meta}>
              {business.address.street}, {business.address.suburb}
            </p>
            <a className={styles.phone} href={business.phone.tel}>
              {business.phone.display}
            </a>
            <p className={styles.hours}>{business.hours.weekday}</p>
            <p className={styles.hours}>{business.hours.weekend}</p>
          </div>

          <nav className={styles.col} aria-label="Explore">
            <p className={styles.colTitle}>Explore</p>
            <ul className={styles.linkList}>
              {business.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colTitle}>Connect</p>
            <ul className={styles.social} aria-label="Social media">
              {business.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.id];
                if (!Icon) return null;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={styles.socialLink}
                      aria-label={item.label}
                      target={item.href !== "#" ? "_blank" : undefined}
                      rel={item.href !== "#" ? "noopener noreferrer" : undefined}
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              className={styles.top}
              onClick={scrollTop}
              aria-label="Back to top"
            >
              Top
              <ArrowUp size={15} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {COPYRIGHT_YEAR} {business.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
