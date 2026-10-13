import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { coffeeImages } from "../data/gallery";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./CoffeeExperience.module.css";

registerGSAP();

export default function CoffeeExperience() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return undefined;

      const root = sectionRef.current;
      const large = root.querySelector(`.${styles.largeFrame}`);
      const small = root.querySelector(`.${styles.smallFrame}`);
      const word = root.querySelector(`.${styles.word}`);
      const badge = root.querySelector(`.${styles.badge}`);
      const heading = root.querySelectorAll(`.${styles.line}`);

      const mm = gsap.matchMedia();

      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
        }
      );

      mm.add("(min-width: 901px)", () => {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
          },
        });

        pinTl
          .fromTo(large, { yPercent: 8, scale: 1.06 }, { yPercent: -6, scale: 1 }, 0)
          .fromTo(small, { yPercent: 18 }, { yPercent: -10 }, 0)
          .fromTo(word, { xPercent: -8, opacity: 0.35 }, { xPercent: 4, opacity: 0.85 }, 0)
          .fromTo(badge, { rotate: -12, scale: 0.92 }, { rotate: 8, scale: 1 }, 0);

        return () => {
          pinTl.scrollTrigger?.kill();
          pinTl.kill();
        };
      });

      mm.add("(max-width: 900px)", () => {
        gsap.fromTo(
          [large, small, word, badge],
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="coffee-heading"
    >
      <div className={`container ${styles.layout}`}>
        <header className={styles.header}>
          <h2 id="coffee-heading" className={styles.heading}>
            <span className={styles.line}>THE PERFECT</span>
            <span className={`${styles.line} ${styles.italic}`}>
              LITTLE PAUSE.
            </span>
          </h2>
        </header>

        <div className={styles.stage} aria-hidden="false">
          <p className={styles.word} aria-hidden="true">
            COFFEE
          </p>

          <figure className={styles.largeFrame}>
            <img
              src={coffeeImages.large.src}
              alt={coffeeImages.large.alt}
              className={styles.largeImg}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className={styles.smallFrame}>
            <img
              src={coffeeImages.small.src}
              alt={coffeeImages.small.alt}
              className={styles.smallImg}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className={styles.badge} aria-hidden="true">
            <span className={styles.badgeText}>SIP SLOWLY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
