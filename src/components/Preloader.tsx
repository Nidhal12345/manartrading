"use client";

import dynamic from "next/dynamic";

/**
 * First-visit curtain. Loaded browser-side only so it can decide from
 * sessionStorage before its first render — the page underneath is fully rendered
 * and readable either way, so nothing is ever gated behind it.
 */
const PreloaderCurtain = dynamic(() => import("./PreloaderCurtain"), {
  ssr: false,
});

export default function Preloader() {
  return <PreloaderCurtain />;
}
