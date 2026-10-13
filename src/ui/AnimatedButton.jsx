import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./AnimatedButton.module.css";

registerGSAP();

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  ariaLabel,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const classes = [
    styles.btn,
    styles[variant] || styles.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useGSAP(
    () => {
      if (reduced || !ref.current || variant === "link") return undefined;

      const el = ref.current;
      const fill = el.querySelector(`.${styles.fill}`);

      const onEnter = () => {
        gsap.to(el, { y: -3, duration: 0.35, ease: "power2.out" });
        if (fill) {
          gsap.to(fill, { scaleY: 1, duration: 0.4, ease: "power3.out" });
        }
      };

      const onLeave = () => {
        gsap.to(el, { y: 0, duration: 0.4, ease: "power2.out" });
        if (fill) {
          gsap.to(fill, { scaleY: 0, duration: 0.35, ease: "power3.inOut" });
        }
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("focus", onEnter);
      el.addEventListener("blur", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("focus", onEnter);
        el.removeEventListener("blur", onLeave);
      };
    },
    { dependencies: [reduced, variant], scope: ref }
  );

  const content = (
    <>
      {variant !== "link" && <span className={styles.fill} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
