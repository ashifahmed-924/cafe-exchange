import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { gsap, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { categories, formatPrice, getItems } from "../data/menu";
import styles from "./FoodModal.module.css";

registerGSAP();

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}

export default function FoodModal({ open, onClose, initialCategory }) {
  const rootRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevFocusRef = useRef(null);
  const reduced = useReducedMotion();

  const defaultCategory =
    categories.find((c) => c.id === initialCategory)?.id || categories[0]?.id;

  const [activeId, setActiveId] = useState(defaultCategory);
  const [activeItemId, setActiveItemId] = useState(null);

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeId) || categories[0],
    [activeId]
  );

  const menuItems = useMemo(() => getItems(activeId), [activeId]);

  const activeItem = useMemo(() => {
    if (!menuItems.length) return null;
    return menuItems.find((item) => item.id === activeItemId) || menuItems[0];
  }, [menuItems, activeItemId]);

  useEffect(() => {
    if (open) {
      const next =
        categories.find((c) => c.id === initialCategory)?.id || categories[0]?.id;
      setActiveId(next);
      setActiveItemId(null);
    }
  }, [open, initialCategory]);

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      document.body.classList.add("is-locked");
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.classList.remove("is-locked");
      prevFocusRef.current?.focus?.();
    }
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !rootRef.current) return;

      const focusable = getFocusable(rootRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !open || reduced) return undefined;

      const panel = root.querySelector(`.${styles.panel}`);
      const tabs = root.querySelectorAll(`.${styles.tab}`);
      const items = root.querySelectorAll(`.${styles.item}`);

      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      )
        .fromTo(
          tabs,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          items,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: "power2.out" },
          "-=0.2"
        );

      return () => tl.kill();
    },
    { dependencies: [open, reduced] }
  );

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      className={`${styles.modal} ${styles.modalOpen}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={false}
      aria-labelledby="food-modal-title"
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close menu"
        onClick={handleClose}
        tabIndex={-1}
      />

      <div className={styles.panel}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Cafe Exchange Menu</p>
            <h2 id="food-modal-title" className={styles.title}>
              {activeCategory?.label || "Menu"}
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.close}
            onClick={handleClose}
            aria-label="Close food menu"
          >
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>

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
                id={`tab-${cat.id}`}
                aria-selected={selected}
                aria-controls="food-modal-panel"
                className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                onClick={() => {
                  setActiveId(cat.id);
                  setActiveItemId(null);
                }}
              >
                {cat.shortLabel || cat.label}
              </button>
            );
          })}
        </div>

        <div className={styles.content}>
          <div
            id="food-modal-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeId}`}
            className={styles.listPane}
          >
            <ul className={styles.list}>
              {menuItems.map((item) => {
                const isActive = activeItem?.id === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                      onClick={() => setActiveItemId(item.id)}
                      onMouseEnter={() => setActiveItemId(item.id)}
                      onFocus={() => setActiveItemId(item.id)}
                    >
                      <span className={styles.itemRow}>
                        <span className={styles.itemName}>{item.name}</span>
                        {item.price != null ? (
                          <span className={styles.itemPrice}>
                            {formatPrice(item.price)}
                          </span>
                        ) : null}
                      </span>
                      <span className={styles.itemDesc}>{item.description}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
