import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Masonry.css";

const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const mediaQueries = queries.map((q) => matchMedia(q));
    const handler = () => setValue(get);
    mediaQueries.forEach((query) => query.addEventListener("change", handler));
    return () =>
      mediaQueries.forEach((query) => query.removeEventListener("change", handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  adjustHeight = true,
  maxColumns,
  loop = false,
  holdDuration = 2,
}) {
  const responsiveColumns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)", "(min-width:400px)"],
    [5, 4, 3, 2],
    1
  );
  const columns = maxColumns
    ? Math.min(responsiveColumns, maxColumns)
    : responsiveColumns;

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, gridHeight } = useMemo(() => {
    if (!width) return { grid: [], gridHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const nextGrid = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    return {
      grid: nextGrid,
      gridHeight: Math.max(...colHeights, 0),
    };
  }, [columns, items, width]);

  const hasMounted = useRef(false);
  const loopTlRef = useRef(null);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return undefined;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Looping cycle: rise from bottom → hold → hide → repeat
    if (loop && !prefersReduced) {
      loopTlRef.current?.kill();

      grid.forEach((item) => {
        gsap.set(`[data-key="${item.id}"]`, {
          x: item.x,
          y: item.y + 180,
          width: item.w,
          height: item.h,
          opacity: 0,
          ...(blurToFocus ? { filter: "blur(10px)" } : {}),
        });
      });

      const tl = gsap.timeline({ repeat: -1, defaults: { ease } });
      const enterDuration = duration;
      const exitDuration = duration * 0.85;
      const staggerIn = stagger;
      const staggerOut = stagger * 0.8;

      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        tl.fromTo(
          selector,
          {
            y: item.y + 180,
            opacity: 0,
            ...(blurToFocus ? { filter: "blur(10px)" } : {}),
          },
          {
            y: item.y,
            x: item.x,
            width: item.w,
            height: item.h,
            opacity: 1,
            ...(blurToFocus ? { filter: "blur(0px)" } : {}),
            duration: enterDuration,
            ease: "power3.out",
          },
          index * staggerIn
        );
      });

      const enterEnd = (grid.length - 1) * staggerIn + enterDuration;
      tl.to({}, { duration: holdDuration }, enterEnd);

      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        tl.to(
          selector,
          {
            y: item.y + 120,
            opacity: 0,
            ...(blurToFocus ? { filter: "blur(8px)" } : {}),
            duration: exitDuration,
            ease: "power2.in",
          },
          enterEnd + holdDuration + index * staggerOut
        );
      });

      const exitEnd =
        enterEnd + holdDuration + (grid.length - 1) * staggerOut + exitDuration;
      tl.to({}, { duration: 0.35 }, exitEnd);

      loopTlRef.current = tl;
      hasMounted.current = true;

      return () => {
        tl.kill();
        loopTlRef.current = null;
      };
    }

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    grid,
    imagesReady,
    stagger,
    animateFrom,
    blurToFocus,
    duration,
    ease,
    loop,
    holdDuration,
  ]);

  const handleMouseEnter = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".masonryOverlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".masonryOverlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  const handleClick = (item) => {
    if (!item.url) return;
    if (item.url.startsWith("http")) {
      window.open(item.url, "_blank", "noopener");
      return;
    }
    const el = document.querySelector(item.url);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="masonryList"
      style={adjustHeight && gridHeight ? { height: gridHeight } : undefined}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="masonryItem"
          role="button"
          tabIndex={0}
          onClick={() => handleClick(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(item);
            }
          }}
          onMouseEnter={(e) => handleMouseEnter(e, item)}
          onMouseLeave={(e) => handleMouseLeave(e, item)}
        >
          <div
            className="masonryImg"
            style={{ backgroundImage: `url(${item.img})` }}
            role="img"
            aria-label={item.alt || "Gallery image"}
          >
            {colorShiftOnHover ? (
              <div
                className="masonryOverlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                  opacity: 0,
                  pointerEvents: "none",
                  borderRadius: "8px",
                }}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
