import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");


const nextConfig: NextConfig = {
  images: {
    // Photography is served locally from /public/images — see src/lib/images.ts.
    // No remote patterns needed since nothing is hotlinked.
    // Next 16 requires an explicit allowlist; 75 is the default we render at.
    qualities: [75],
    formats: ["image/avif", "image/webp"],
    // Keep responsive sizes tight — we don't need ultra-wide variants for a
    // max-84rem container.
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Cache optimized images for a year — the photos never change per deploy.
    minimumCacheTTL: 31536000,
  },
};

export default withNextIntl(nextConfig);
