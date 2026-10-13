import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGSAP } from "../animations/gsapSetup";
import { useReducedMotion } from "./useReducedMotion";

export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [reduced]);
}
