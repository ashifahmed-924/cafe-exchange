import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MapPin, Navigation, Phone } from "lucide-react";
import { registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { business } from "../data/business";
import SectionHeading from "../ui/SectionHeading";
import AnimatedButton from "../ui/AnimatedButton";
import styles from "./LocationSection.module.css";

registerGSAP();

export default function LocationSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || reduced) return undefined;

      fadeUp(sectionRef.current.querySelector(`.${styles.headingWrap}`), {
        y: 32,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      fadeUp(sectionRef.current.querySelector(`.${styles.details}`), {
        y: 36,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      fadeUp(sectionRef.current.querySelector(`.${styles.mapCard}`), {
        y: 44,
        delay: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      return undefined;
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      id="visit"
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="visit-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.headingWrap}>
          <SectionHeading
            id="visit-heading"
            eyebrow="Visit us"
            title={["FIND US."]}
            italicLine="FEEL AT HOME."
            className={styles.locationHeading}
          />
        </div>

        <div className={styles.split}>
          <div className={styles.details}>
            <div className={styles.badge} aria-hidden="true">
              <MapPin size={18} strokeWidth={1.5} />
              <span>{business.precinct}</span>
            </div>

            <h3 className={styles.name}>{business.name}</h3>
            <p className={styles.address}>{business.address.formatted}</p>

            <dl className={styles.meta}>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={business.phone.tel}>{business.phone.display}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>
                  <span>{business.hours.weekday}</span>
                  <span>{business.hours.weekend}</span>
                  {!business.hours.verified ? (
                    <span className={styles.hoursNote}>{business.hours.note}</span>
                  ) : null}
                </dd>
              </div>
            </dl>

            <div className={styles.ctas}>
              <AnimatedButton
                href={business.maps.url}
                variant="primary"
                ariaLabel="Get directions to Cafe Exchange"
              >
                <Navigation size={16} strokeWidth={1.75} aria-hidden="true" />
                Get directions
              </AnimatedButton>
              <AnimatedButton
                href={business.phone.tel}
                variant="ghost"
                ariaLabel="Call the cafe"
              >
                <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
                Call the cafe
              </AnimatedButton>
            </div>
          </div>

          <div className={styles.mapCard}>
            <div className={styles.mapLayer} aria-hidden="true" />
            <div className={styles.mapFrame}>
              <iframe
                title={`Map showing ${business.name}`}
                src={business.maps.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className={styles.mapAccent} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
