import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type RevealType = "up" | "left" | "right" | "scale" | "fade";

export function useScrollReveal(type: RevealType = "up", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = { opacity: 0, duration: 0.9, delay, ease: "power3.out" };
    if (type === "up") fromVars.y = 50;
    if (type === "left") fromVars.x = -60;
    if (type === "right") fromVars.x = 60;
    if (type === "scale") { fromVars.scale = 0.88; }
    // type === "fade" uses just opacity which is already in fromVars

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [type, delay]);

  return ref;
}
