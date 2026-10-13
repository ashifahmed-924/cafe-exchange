import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { faqs } from "../data/faq";
import SectionHeading from "../ui/SectionHeading";
import styles from "./FaqSection.module.css";

registerGSAP();

function FaqItem({ item, open, onToggle, reduced }) {
  const panelId = useId();
  const buttonId = useId();
  const panelRef = useRef(null);
  const firstRender = useRef(true);

  useGSAP(
    () => {
      if (!panelRef.current) return undefined;
      const el = panelRef.current;

      if (firstRender.current) {
        firstRender.current = false;
        gsap.set(el, {
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
        });
        return undefined;
      }

      if (reduced) {
        gsap.set(el, {
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
        });
        return undefined;
      }

      if (open) {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            overflow: "hidden",
          }
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
          overflow: "hidden",
        });
      }
      return undefined;
    },
    { dependencies: [open, reduced] }
  );

  return (
    <div className={styles.item}>
      <h3 className={styles.question}>
        <button
          id={buttonId}
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span className={styles.icon} aria-hidden="true">
            {open ? (
              <Minus size={18} strokeWidth={1.5} />
            ) : (
              <Plus size={18} strokeWidth={1.5} />
            )}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        ref={panelRef}
        role="region"
        aria-labelledby={buttonId}
        className={styles.panel}
      >
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  useGSAP(
    () => {
      if (!sectionRef.current || reduced) return undefined;

      fadeUp(sectionRef.current.querySelector(`.${styles.headingWrap}`), {
        y: 28,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      fadeUp(sectionRef.current.querySelectorAll(`.${styles.item}`), {
        y: 24,
        stagger: 0.08,
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
      id="faq"
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="faq-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.headingWrap}>
          <SectionHeading
            id="faq-heading"
            title={["GOOD TO KNOW."]}
            tone="dark"
          />
        </div>

        <div className={styles.list}>
          {faqs.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              open={openId === item.id}
              reduced={reduced}
              onToggle={() =>
                setOpenId((current) => (current === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
