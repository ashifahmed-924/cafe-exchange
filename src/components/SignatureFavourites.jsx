import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { hoverZoom } from "../animations/imageAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { favourites, SAMPLE_MODE } from "../data/menu";
import SectionHeading from "../ui/SectionHeading";
import ImageLightbox from "../ui/ImageLightbox";
import styles from "./SignatureFavourites.module.css";

registerGSAP();

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  // Mobile uses a static 2-column grid (no carousel paging)
  if (window.matchMedia("(max-width: 640px)").matches) return favourites.length;
  if (window.matchMedia("(max-width: 1024px)").matches) return 2;
  return 3;
}

export default function SignatureFavourites() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const maxIndex = Math.max(0, favourites.length - visible);

  useEffect(() => {
    const update = () => {
      const next = getVisibleCount();
      setVisible(next);
      setIndex((i) => Math.min(i, Math.max(0, favourites.length - next)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const openLightbox = (i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  useGSAP(
    () => {
      if (!sectionRef.current || reduced) return undefined;

      fadeUp(sectionRef.current.querySelector(`.${styles.headingWrap}`), {
        y: 36,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      const cards = sectionRef.current.querySelectorAll(`.${styles.card}`);
      const cleanups = [];
      cards.forEach((card) => {
        const img = card.querySelector("img");
        if (img) cleanups.push(hoverZoom(card, img, 1.08));
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  useGSAP(
    () => {
      if (!trackRef.current) return undefined;
      const duration = reduced ? 0 : 0.65;
      gsap.to(trackRef.current, {
        xPercent: -(index * (100 / favourites.length)),
        duration,
        ease: "power3.out",
      });
      return undefined;
    },
    { dependencies: [index, reduced, favourites.length] }
  );

  const lightboxImages = favourites.map((item) => ({
    src: item.image,
    alt: item.name,
  }));

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="favourites-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.headingWrap}>
          <SectionHeading
            id="favourites-heading"
            eyebrow="Signature favourites"
            title={["A LITTLE", "SOMETHING"]}
            italicLine="TO LOOK FORWARD TO."
            align="left"
            className={styles.favouritesHeading}
          />
          {SAMPLE_MODE ? (
            <p className={styles.note}>
              Sample presentation — illustrative favourites pending the verified
              menu.
            </p>
          ) : null}
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={goPrev}
            disabled={index <= 0}
            aria-label="Previous favourites"
          >
            <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={goNext}
            disabled={index >= maxIndex}
            aria-label="Next favourites"
          >
            <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div
          className={styles.viewport}
          role="region"
          aria-roledescription={visible < favourites.length ? "carousel" : undefined}
        >
          <ul
            ref={trackRef}
            className={styles.track}
            style={{
              "--item-count": favourites.length,
              "--visible": visible,
            }}
          >
            {favourites.map((item, i) => (
              <li key={item.id} className={styles.slide}>
                <button
                  type="button"
                  className={styles.card}
                  onClick={() => openLightbox(i)}
                  aria-label={`View ${item.name}`}
                >
                  <span className={styles.media}>
                    <img src={item.image} alt="" loading="lazy" />
                  </span>
                  <span className={styles.meta}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.arrow} aria-hidden="true">
                      <ArrowRight size={18} strokeWidth={1.5} />
                    </span>
                  </span>
                  {item.sample ? (
                    <span className={styles.sample}>Sample</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
