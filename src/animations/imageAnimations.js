import { gsap } from "./gsapSetup";

export function heroZoom(image, options = {}) {
  const { duration = 2, fromScale = 1.12, ease = "power2.out" } = options;
  return gsap.fromTo(
    image,
    { scale: fromScale },
    { scale: 1, duration, ease }
  );
}

export function clipReveal(targets, options = {}) {
  const {
    duration = 1.2,
    ease = "power3.inOut",
    delay = 0,
    scrollTrigger,
  } = options;

  return gsap.fromTo(
    targets,
    { clipPath: "inset(0 0 100% 0)" },
    {
      clipPath: "inset(0 0 0% 0)",
      duration,
      delay,
      ease,
      scrollTrigger,
    }
  );
}

export function parallax(targets, options = {}) {
  const { yPercent = 18, scrub = true, trigger } = options;
  return gsap.to(targets, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || targets,
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  });
}

export function hoverZoom(element, image, scale = 1.08) {
  const enter = () =>
    gsap.to(image, { scale, duration: 0.75, ease: "power2.out" });
  const leave = () =>
    gsap.to(image, { scale: 1, duration: 0.75, ease: "power2.out" });
  element.addEventListener("mouseenter", enter);
  element.addEventListener("mouseleave", leave);
  element.addEventListener("focus", enter);
  element.addEventListener("blur", leave);
  return () => {
    element.removeEventListener("mouseenter", enter);
    element.removeEventListener("mouseleave", leave);
    element.removeEventListener("focus", enter);
    element.removeEventListener("blur", leave);
  };
}
