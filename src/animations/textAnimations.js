import { gsap } from "./gsapSetup";

export function splitLines(element) {
  if (!element) return [];
  const text = element.textContent.trim();
  const words = text.split(/\s+/);
  element.setAttribute("aria-label", text);
  element.innerHTML = words
    .map(
      (word) =>
        `<span class="line-mask"><span class="word">${word}&nbsp;</span></span>`
    )
    .join("");
  return element.querySelectorAll(".word");
}

export function revealWords(targets, options = {}) {
  const {
    delay = 0,
    stagger = 0.04,
    duration = 0.9,
    y = "110%",
    ease = "power3.out",
  } = options;

  return gsap.fromTo(
    targets,
    { y, opacity: 0 },
    { y: "0%", opacity: 1, duration, stagger, delay, ease }
  );
}

export function revealLines(selectorOrElements, options = {}) {
  const els =
    typeof selectorOrElements === "string"
      ? gsap.utils.toArray(selectorOrElements)
      : selectorOrElements;

  const words = [];
  els.forEach((el) => {
    words.push(...splitLines(el));
  });

  return revealWords(words, options);
}

export function fadeUp(targets, options = {}) {
  const {
    delay = 0,
    stagger = 0.12,
    duration = 0.85,
    y = 40,
    ease = "power3.out",
    scrollTrigger,
  } = options;

  return gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger,
    }
  );
}
