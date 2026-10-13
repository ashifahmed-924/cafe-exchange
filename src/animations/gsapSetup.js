import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

export function registerGSAP() {
  if (registered) return { gsap, ScrollTrigger, Flip };
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
  return { gsap, ScrollTrigger, Flip };
}

export { gsap, ScrollTrigger, Flip };
