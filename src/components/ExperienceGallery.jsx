import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { galleryImages } from "../data/gallery";
import SectionHeading from "../ui/SectionHeading";
import AccordionGallery from "./AccordionGallery";
import styles from "./ExperienceGallery.module.css";

registerGSAP();

const accordionItems = galleryImages.slice(0, 5).map((image) => ({
  image: image.src,
  label: image.label,
  alt: image.alt,
}));

export default function ExperienceGallery() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

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

      fadeUp(sectionRef.current.querySelector(`.${styles.accordion}`), {
        y: 48,
        delay: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      return undefined;
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="gallery-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.headingWrap}>
          <SectionHeading
            id="gallery-heading"
            eyebrow="Gallery"
            title={["MOMENTS AT"]}
            italicLine="THE EXCHANGE."
            className={styles.galleryHeading}
          />
          <p className={styles.note}>
            Illustrative café photography for atmosphere — replace with approved
            Cafe Exchange venue images before launch.
          </p>
        </div>

        <div className={styles.accordion}>
          <AccordionGallery
            items={accordionItems}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#000000"
            overlayColor="#d98548"
            textColor="#000000"
            grayscale
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={460}
            gap={10}
            radius={12}
            orientation="horizontal"
            className={styles.accordionGallery}
          />
        </div>
      </div>
    </section>
  );
}
