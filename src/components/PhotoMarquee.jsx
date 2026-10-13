import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { marqueeImages } from "../data/gallery";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./PhotoMarquee.module.css";

registerGSAP();

const PHRASE = ["SIP", "SAVOUR", "REPEAT"];

export default function PhotoMarquee() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !trackRef.current) return undefined;

      const track = trackRef.current;
      gsap.set(track, { x: 0 });

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 48,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  const strip = [...marqueeImages, ...marqueeImages];

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="marquee-heading"
    >
      <div className={styles.textRow} aria-hidden="true">
        {Array.from({ length: 4 }).map((_, cycle) =>
          PHRASE.map((word, i) => {
            const outlined = (cycle + i) % 2 === 1;
            return (
              <span
                key={`${cycle}-${word}`}
                className={`${styles.word} ${outlined ? styles.outlined : styles.filled}`}
              >
                {word}
                <span className={styles.dot}>•</span>
              </span>
            );
          })
        )}
      </div>

      <h2 id="marquee-heading" className="sr-only">
        Sip, savour, repeat — café moments
      </h2>

      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={`${styles.track} ${reduced ? styles.static : ""}`}
        >
          {strip.map((img, index) => (
            <figure
              key={`${img.id}-${index}`}
              className={styles.frame}
            >
              <img
                src={img.src}
                alt={index < marqueeImages.length ? img.alt : ""}
                className={styles.image}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
