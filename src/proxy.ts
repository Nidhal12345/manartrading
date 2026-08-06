import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 renamed the `middleware` file convention to `proxy`, and it has to sit
// beside `app` — i.e. inside src/ — to be picked up at all.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - api, _next, _vercel
  // - files with an extension (images, icons, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
