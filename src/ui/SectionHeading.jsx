import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  id,
  eyebrow,
  title,
  italicLine,
  align = "right",
  className = "",
  tone = "light",
}) {
  const lines = Array.isArray(title) ? title : [title];
  const alignClass =
    align === "center"
      ? styles.center
      : align === "left"
        ? styles.left
        : styles.right;
  const toneClass = tone === "dark" ? styles.dark : "";

  return (
    <header
      className={`${styles.heading} ${alignClass} ${toneClass} ${className}`.trim()}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

      <h2 id={id} className={styles.title}>
        {lines.map((line, i) => (
          <span key={`${line}-${i}`} className={styles.line}>
            {line}
          </span>
        ))}
        {italicLine ? (
          <span className={`${styles.line} ${styles.italic}`}>{italicLine}</span>
        ) : null}
      </h2>
    </header>
  );
}
