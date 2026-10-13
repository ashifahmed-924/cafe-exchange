import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { aboutMasonryItems } from "../data/aboutMasonry";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Masonry from "./Masonry/Masonry";
import styles from "./AboutSection.module.css";

registerGSAP();

export default function AboutSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return undefined;

      const root = sectionRef.current;
      const textEls = root.querySelectorAll(
        `.${styles.label}, .${styles.headingLine}, .${styles.copy}`
      );

      if (reduced) {
        gsap.set(textEls, { clearProps: "all", opacity: 1, y: 0 });
        return undefined;
      }

      gsap.fromTo(
        textEls,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
        }
      );

      return undefined;
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      className={`section ${styles.section}`}
      aria-labelledby="about-heading"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.media} aria-label="Food and café highlights">
          <Masonry
            items={aboutMasonryItems}
            ease="power3.out"
            duration={0.65}
            stagger={0.06}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
            adjustHeight
            maxColumns={3}
            loop
            holdDuration={2}
          />
        </div>

        <div className={styles.content}>
          <p className={styles.label}>WELCOME TO CAFE EXCHANGE</p>
          <h2 id="about-heading" className={styles.heading}>
            <span className={styles.headingLine}>A FRESH TAKE</span>
            <span className={`${styles.headingLine} ${styles.headingItalic}`}>
              ON YOUR DAILY RITUAL.
            </span>
          </h2>
          <p className={styles.copy}>
            A place to start early, enjoy your favourite coffee and take a
            well-earned break from the day.
          </p>
        </div>
      </div>
    </section>
  );
}
