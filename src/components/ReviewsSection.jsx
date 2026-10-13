import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { reviews, reviewMeta } from "../data/reviews";
import SectionHeading from "../ui/SectionHeading";
import styles from "./ReviewsSection.module.css";

registerGSAP();

export default function ReviewsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const maxIndex = reviews.length - 1;

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (!sectionRef.current) return;
      if (!sectionRef.current.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  useGSAP(
    () => {
      if (!sectionRef.current || reduced) return undefined;

      fadeUp(sectionRef.current.querySelector(`.${styles.headingCol}`), {
        y: 32,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      fadeUp(sectionRef.current.querySelector(`.${styles.reviewCol}`), {
        y: 40,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      return undefined;
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  useGSAP(
    () => {
      if (!trackRef.current) return undefined;
      gsap.to(trackRef.current, {
        xPercent: -index * 100,
        duration: reduced ? 0 : 0.7,
        ease: "power3.out",
      });
      return undefined;
    },
    { dependencies: [index, reduced] }
  );

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="reviews-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.split}>
          <div className={styles.headingCol}>
            <SectionHeading
              id="reviews-heading"
              eyebrow="Reviews"
              title={["WORDS FROM"]}
              italicLine="OUR COMMUNITY."
              align="left"
            />

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.control}
                onClick={goPrev}
                disabled={index <= 0}
                aria-label="Previous review"
              >
                <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.control}
                onClick={goNext}
                disabled={index >= maxIndex}
                aria-label="Next review"
              >
                <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label="Review slides">
              {reviews.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show review ${i + 1}`}
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          <div className={styles.reviewCol}>
            <div
              className={styles.viewport}
              role="region"
              aria-roledescription="carousel"
              aria-label="Customer reviews"
              tabIndex={0}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <ul ref={trackRef} className={styles.track}>
                {reviews.map((review, i) => (
                  <li
                    key={review.id}
                    className={styles.slide}
                    aria-hidden={i !== index}
                  >
                    <article className={styles.card}>
                      <span className={styles.quote} aria-hidden="true">
                        “
                      </span>
                      <p className={styles.text}>{review.text}</p>
                      <div className={styles.footer}>
                        <div>
                          <p className={styles.name}>{review.name}</p>
                          <div
                            className={styles.stars}
                            aria-label={`${review.rating} out of 5 stars`}
                          >
                            {Array.from({ length: review.rating }).map((_, s) => (
                              <Star
                                key={s}
                                size={14}
                                fill="currentColor"
                                strokeWidth={0}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                        <a
                          className={styles.source}
                          href={reviewMeta.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {review.source}
                          <ExternalLink
                            size={14}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          <span className="sr-only"> (opens in new tab)</span>
                        </a>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
