import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { featuredCategories } from "../data/menu";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./FoodCategories.module.css";

registerGSAP();

function selectCategory(id, onSelectCategory) {
  if (typeof onSelectCategory === "function") {
    onSelectCategory(id);
    return;
  }

  window.dispatchEvent(
    new CustomEvent("select-menu-category", { detail: { id } })
  );

  const menu = document.getElementById("menu");
  if (menu) {
    menu.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function FoodCategories({ id = "categories", onSelectCategory }) {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return undefined;
      const tiles = sectionRef.current.querySelectorAll(`.${styles.tileWrap}`);

      if (reduced) {
        gsap.set(tiles, { clearProps: "all", opacity: 1, y: 0 });
        return undefined;
      }

      fadeUp(tiles, {
        y: 48,
        stagger: 0.1,
        duration: 0.95,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
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
      aria-labelledby="categories-heading"
    >
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>EXPLORE</p>
          <h2 id="categories-heading" className={styles.heading}>
            WHAT WE SERVE
          </h2>
        </header>

        <ul className={styles.mosaic}>
          {featuredCategories.map((cat, index) => (
            <li
              key={cat.id}
              className={`${styles.tileWrap} ${styles[`tile${index + 1}`]}`}
            >
              <button
                type="button"
                className={styles.tile}
                onClick={() => selectCategory(cat.id, onSelectCategory)}
                aria-label={`View ${cat.tileTitle} menu`}
              >
                <span className={styles.media} aria-hidden="true">
                  <img
                    src={cat.image}
                    alt=""
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.gradient} />
                </span>
                <span className={styles.meta}>
                  <span className={styles.tileTitle}>{cat.tileTitle}</span>
                  <ArrowUpRight className={styles.arrow} aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
