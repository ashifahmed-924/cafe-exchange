import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { categories, formatPrice, getCategory, getItems } from "../data/menu";
import { useReducedMotion } from "../hooks/useReducedMotion";
import SectionHeading from "../ui/SectionHeading";
import FoodModal from "../ui/FoodModal";
import btnStyles from "../ui/AnimatedButton.module.css";
import styles from "./MenuSection.module.css";

registerGSAP();

export default function MenuSection() {
  const panelRef = useRef(null);
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "all-day");
  const [modalOpen, setModalOpen] = useState(false);

  const category = getCategory(activeId);
  const items = getItems(activeId).slice(0, 5);

  useEffect(() => {
    const onSelect = (event) => {
      const next = event?.detail?.id;
      if (!next) return;
      if (categories.some((c) => c.id === next)) {
        setActiveId(next);
      }
    };

    window.addEventListener("select-menu-category", onSelect);
    return () => window.removeEventListener("select-menu-category", onSelect);
  }, []);

  useGSAP(
    () => {
      if (reduced || !panelRef.current) return undefined;

      const root = panelRef.current;
      const image = root.querySelector(`.${styles.previewImg}`);
      const wipe = root.querySelector(`.${styles.wipe}`);
      const textBits = root.querySelectorAll(
        `.${styles.catLabel}, .${styles.catDesc}, .${styles.item}`
      );

      const tl = gsap.timeline();

      if (wipe) {
        tl.fromTo(
          wipe,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.45, ease: "power3.inOut" }
        ).to(wipe, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.45,
          ease: "power3.inOut",
        });
      }

      if (image) {
        tl.fromTo(
          image,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 0.75, ease: "power2.out" },
          0.15
        );
      }

      tl.fromTo(
        textBits,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.2
      );

      return undefined;
    },
    { scope: panelRef, dependencies: [activeId, reduced] }
  );

  return (
    <section
      id="menu"
      className={`section ${styles.section}`}
      aria-labelledby="menu-heading"
    >
      <div className={`container ${styles.inner}`}>
        <SectionHeading
          eyebrow="DISCOVER YOUR NEXT FAVOURITE"
          title={["GOOD THINGS", "ON THE MENU."]}
          className={styles.heading}
        />
        <h2 id="menu-heading" className="sr-only">
          Menu
        </h2>

        <div className={styles.explorer}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Menu categories"
          >
            {categories.map((cat) => {
              const selected = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`menu-tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                  onClick={() => setActiveId(cat.id)}
                >
                  {cat.shortLabel}
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`menu-tab-${activeId}`}
            className={styles.panel}
          >
            <div className={styles.preview}>
              <div className={styles.wipe} aria-hidden="true" />
              <img
                key={category.previewImage}
                src={category.previewImage}
                alt=""
                className={styles.previewImg}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.details}>
              <p className={styles.catLabel}>{category.label}</p>
              <p className={styles.catDesc}>{category.description}</p>

              <ul className={styles.items}>
                {items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <div className={styles.itemMedia}>
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className={styles.itemBody}>
                      <div className={styles.itemHeader}>
                        <p className={styles.itemName}>
                          {item.name}
                          {item.sample ? (
                            <span className={styles.sampleBadge}>SAMPLE</span>
                          ) : null}
                        </p>
                        {item.price != null ? (
                          <span className={styles.itemPrice}>
                            {formatPrice(item.price)}
                          </span>
                        ) : null}
                      </div>
                      <p className={styles.itemDesc}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={`${btnStyles.btn} ${btnStyles.primary}`}
                  aria-label="View full menu"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalOpen(true);
                  }}
                >
                  <span className={btnStyles.label}>VIEW FULL MENU</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <FoodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory={activeId}
      />
    </section>
  );
}
