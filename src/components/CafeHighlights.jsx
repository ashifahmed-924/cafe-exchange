import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Coffee, Sunrise, PauseCircle } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./CafeHighlights.module.css";

registerGSAP();

const FEATURES = [
  {
    id: "brewed",
    title: "FRESHLY BREWED",
    copy: "Espresso favourites pulled to order — a bright start to every visit.",
    Icon: Coffee,
  },
  {
    id: "morning",
    title: "MADE FOR YOUR MORNING",
    copy: "Quiet tables, soft light and the rhythm you need before the day begins.",
    Icon: Sunrise,
  },
  {
    id: "break",
    title: "YOUR WORKDAY BREAK",
    copy: "Step away from the desk. Reset with coffee, food and a moment of calm.",
    Icon: PauseCircle,
  },
];

export default function CafeHighlights({ id }) {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return undefined;
      const cards = sectionRef.current.querySelectorAll(`.${styles.card}`);

      if (reduced) {
        gsap.set(cards, { clearProps: "all", opacity: 1, y: 0 });
        return undefined;
      }

      fadeUp(cards, {
        y: 36,
        stagger: 0.14,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      return undefined;
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${styles.section}`}
      aria-labelledby="highlights-heading"
    >
      <div className={`container ${styles.inner}`}>
        <h2 id="highlights-heading" className="sr-only">
          Why Cafe Exchange
        </h2>
        <ul className={styles.grid}>
          {FEATURES.map(({ id: featureId, title, copy, Icon }) => (
            <li key={featureId} className={styles.card}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon className={styles.icon} strokeWidth={1.4} />
              </span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.copy}>{copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
