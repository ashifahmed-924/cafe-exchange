import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { business } from "../data/business";
import { galleryImages } from "../data/gallery";
import styles from "./FullscreenMenu.module.css";

registerGSAP();

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}

export default function FullscreenMenu({ open, onClose, onNavigate }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevFocusRef = useRef(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const reduced = useReducedMotion();

  const previewSrc =
    galleryImages[previewIndex % galleryImages.length]?.src ||
    galleryImages[0]?.src;
  const previewAlt =
    galleryImages[previewIndex % galleryImages.length]?.alt ||
    "Café preview";

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      document.body.classList.add("is-locked");
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.classList.remove("is-locked");
      prevFocusRef.current?.focus?.();
    }
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  const handleClose = useCallback(() => {
    if (reduced) {
      onClose?.();
      return;
    }

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) {
      onClose?.();
      return;
    }

    const links = panel.querySelectorAll(`.${styles.navLink}`);
    const tl = gsap.timeline({
      onComplete: () => onClose?.(),
    });

    tl.to(links, {
      y: -20,
      opacity: 0,
      duration: 0.28,
      stagger: 0.03,
      ease: "power2.in",
    })
      .to(
        overlay,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.45,
          ease: "power3.inOut",
        },
        "-=0.1"
      )
      .set(overlay, { autoAlpha: 0, pointerEvents: "none" });
  }, [onClose, reduced]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = getFocusable(panelRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      if (!overlay || !panel) return undefined;

      const links = panel.querySelectorAll(`.${styles.navLink}`);
      const meta = panel.querySelectorAll(`.${styles.meta}, .${styles.preview}`);
      const closeEl = panel.querySelector(`.${styles.close}`);

      if (!open) {
        gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        return undefined;
      }

      if (reduced) {
        gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
        gsap.set([links, meta, closeEl], { clearProps: "all" });
        return undefined;
      }

      const tl = gsap.timeline();
      tl.set(overlay, { autoAlpha: 1, pointerEvents: "auto" })
        .fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.inOut" }
        )
        .fromTo(
          closeEl,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          links,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power3.out" },
          "-=0.35"
        )
        .fromTo(
          meta,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" },
          "-=0.4"
        );

      return () => {
        tl.kill();
      };
    },
    { dependencies: [open, reduced] }
  );

  const handleNav = (e, href) => {
    e.preventDefault();
    onNavigate?.(href);
    handleClose();
  };

  return (
    <div
      ref={overlayRef}
      id="fullscreen-menu"
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      inert={!open ? true : undefined}
      aria-label="Site navigation"
    >
      <div ref={panelRef} className={styles.panel}>
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.close}
          onClick={handleClose}
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.5} aria-hidden="true" />
          <span>Close</span>
        </button>

        <div className={styles.grid}>
          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {business.nav.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.navLink}
                    onMouseEnter={() => setPreviewIndex(i % galleryImages.length)}
                    onFocus={() => setPreviewIndex(i % galleryImages.length)}
                    onClick={(e) => handleNav(e, item.href)}
                  >
                    <span className={styles.index}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.label}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <aside className={styles.preview} aria-hidden="true">
            <div className={styles.previewFrame}>
              <img
                key={previewSrc}
                src={previewSrc}
                alt=""
                className={styles.previewImage}
              />
            </div>
            <p className={styles.previewCaption}>{previewAlt}</p>
          </aside>
        </div>

        <footer className={styles.meta}>
          <p>{business.address.formatted}</p>
          <a href={business.phone.tel}>{business.phone.display}</a>
        </footer>
      </div>
    </div>
  );
}
