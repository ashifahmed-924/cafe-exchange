import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./ImageLightbox.module.css";

registerGSAP();

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}

export default function ImageLightbox({
  open,
  items = [],
  index = 0,
  onClose,
  onIndexChange,
}) {
  const rootRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevFocusRef = useRef(null);
  const reduced = useReducedMotion();

  const safeIndex = items.length
    ? ((index % items.length) + items.length) % items.length
    : 0;
  const current = items[safeIndex];
  const hasMultiple = items.length > 1;

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      document.body.classList.add("is-locked");
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.classList.remove("is-locked");
      if (prevFocusRef.current?.focus) {
        prevFocusRef.current.focus();
      }
    }
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  const goPrev = useCallback(() => {
    if (!items.length) return;
    const next = (safeIndex - 1 + items.length) % items.length;
    onIndexChange?.(next);
  }, [items.length, onIndexChange, safeIndex]);

  const goNext = useCallback(() => {
    if (!items.length) return;
    const next = (safeIndex + 1) % items.length;
    onIndexChange?.(next);
  }, [items.length, onIndexChange, safeIndex]);

  const handleClose = useCallback(() => {
    if (reduced || !rootRef.current) {
      onClose?.();
      return;
    }

    const root = rootRef.current;
    const media = root.querySelector(`.${styles.media}`);

    gsap
      .timeline({ onComplete: () => onClose?.() })
      .to(media, { scale: 0.94, opacity: 0, duration: 0.28, ease: "power2.in" })
      .to(root, { autoAlpha: 0, duration: 0.25, ease: "power2.inOut" }, "-=0.1")
      .set(root, { pointerEvents: "none" });
  }, [onClose, reduced]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key !== "Tab" || !rootRef.current) return;

      const focusable = getFocusable(rootRef.current);
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
  }, [open, handleClose, goPrev, goNext]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      if (!open) {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        return undefined;
      }

      if (reduced) {
        gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
        return undefined;
      }

      const media = root.querySelector(`.${styles.media}`);
      const chrome = root.querySelectorAll(
        `.${styles.close}, .${styles.nav}, .${styles.caption}`
      );

      const tl = gsap.timeline();
      tl.set(root, { autoAlpha: 1, pointerEvents: "auto" })
        .fromTo(
          root,
          { backdropFilter: "blur(0px)" },
          { backdropFilter: "blur(10px)", duration: 0.4, ease: "power2.out" }
        )
        .fromTo(
          media,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: "power3.out" },
          0
        )
        .fromTo(
          chrome,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
          0.15
        );

      return () => tl.kill();
    },
    { dependencies: [open, reduced] }
  );

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label={current?.name || "Image viewer"}
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close lightbox"
        onClick={handleClose}
        tabIndex={-1}
      />

      <button
        ref={closeBtnRef}
        type="button"
        className={styles.close}
        onClick={handleClose}
        aria-label="Close"
      >
        <X size={26} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} strokeWidth={1.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight size={32} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </>
      ) : null}

      <figure className={styles.figure}>
        <div className={styles.media}>
          <img
            src={current.src}
            alt={current.alt || current.name || ""}
            className={styles.image}
          />
        </div>
        {(current.name || current.description) && (
          <figcaption className={styles.caption}>
            {current.name ? <h3 className={styles.title}>{current.name}</h3> : null}
            {current.description ? (
              <p className={styles.description}>{current.description}</p>
            ) : null}
            {hasMultiple ? (
              <p className={styles.counter}>
                {safeIndex + 1} / {items.length}
              </p>
            ) : null}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
