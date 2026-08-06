"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis keeps native scrolling (it eases window.scrollTo rather than transforming a
 * wrapper), so useScroll, IntersectionObserver and anchor links all keep working.
 * Skipped entirely when the visitor asks for reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    // ScrollTrigger reads the real scroll position, which Lenis is easing — but
    // it only re-reads it when told to. Without this, anything scrubbed trails
    // the page by a frame and the parallax visibly rubber-bands.
    lenis.on("scroll", ScrollTrigger.update);

    // One loop instead of two: GSAP's ticker drives Lenis, so scrolling and
    // tweening are stepped in the same frame. lagSmoothing(0) stops GSAP from
    // absorbing a long frame, which would let the two clocks drift apart.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return null;
}
