import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { business } from "../data/business";
import { heroImage } from "../data/gallery";
import { heroVideos } from "../data/heroVideos";
import AnimatedButton from "../ui/AnimatedButton";
import styles from "./HeroSection.module.css";

registerGSAP();

const HEADLINE = ["YOUR DAILY", "COFFEE ESCAPE."];
const STRIP = ["COFFEE", "FRESH FOOD", "DANDENONG SOUTH"];
const heroVideo = heroVideos[0];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return undefined;

      const eyebrow = section.querySelector(`.${styles.eyebrow}`);
      const lines = section.querySelectorAll(`.${styles.headlineLine}`);
      const copy = section.querySelector(`.${styles.copy}`);
      const ctas = section.querySelector(`.${styles.ctas}`);
      const strip = section.querySelector(`.${styles.strip}`);
      const scroll = section.querySelector(`.${styles.scroll}`);
      const scrollLine = section.querySelector(`.${styles.scrollLine}`);

      if (reduced) {
        gsap.set(
          [eyebrow, lines, copy, ctas, strip, scroll, mediaRef.current],
          { clearProps: "all" }
        );
        return undefined;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { scale: 1.12 },
          { scale: 1, duration: 2.2, ease: "power2.out" }
        );
      }

      tl.fromTo(
        eyebrow,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.2
      )
        .fromTo(
          lines,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1, stagger: 0.12 },
          0.35
        )
        .fromTo(
          copy,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          0.75
        )
        .fromTo(
          ctas?.children || [],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.1 },
          0.95
        )
        .fromTo(
          strip,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.15
        )
        .fromTo(
          scroll,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1.3
        );

      let pulse;
      if (scrollLine) {
        pulse = gsap.fromTo(
          scrollLine,
          { scaleY: 0.35, opacity: 0.4, transformOrigin: "top center" },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          }
        );
      }

      return () => {
        tl.kill();
        pulse?.kill();
      };
    },
    { dependencies: [reduced], scope: sectionRef }
  );

  useEffect(() => {
    if (reduced || !videoRef.current) return undefined;
    const playPromise = videoRef.current.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        /* autoplay may be blocked until interaction */
      });
    }
    return undefined;
  }, [reduced]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Cafe Exchange hero"
    >
      <div className={styles.media} aria-hidden="true">
        <div ref={mediaRef} className={styles.mediaScale}>
          {reduced || !heroVideo ? (
            <img src={heroImage.src} alt="" className={styles.bg} />
          ) : (
            <video
              ref={videoRef}
              className={`${styles.video} ${styles.videoActive}`}
              src={heroVideo.src}
              poster={heroVideo.poster}
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
              aria-hidden="true"
            />
          )}
        </div>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          {business.logoText} • {business.subtitle}
        </p>

        <h1 className={styles.headline}>
          {HEADLINE.map((line) => (
            <span key={line} className={styles.lineMask}>
              <span className={styles.headlineLine}>{line}</span>
            </span>
          ))}
        </h1>

        <p className={styles.copy}>{business.description}</p>

        <div className={styles.ctas}>
          <AnimatedButton href="#menu" variant="primary">
            Explore the Menu
          </AnimatedButton>
          <AnimatedButton href="#visit" variant="ghost">
            Find Us
          </AnimatedButton>
        </div>
      </div>

      <div className={styles.strip} aria-label="Highlights">
        {STRIP.map((item, i) => (
          <span key={item} className={styles.stripItem}>
            {i > 0 ? <span className={styles.dot} aria-hidden="true" /> : null}
            {item}
          </span>
        ))}
      </div>

      <a href="#story" className={styles.scroll} aria-label="Scroll to our story">
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollTrack} aria-hidden="true">
          <span className={styles.scrollLine} />
        </span>
      </a>
    </section>
  );
}
