import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./matomo";

/** Initial pageview is sent from initMatomo(); only track later SPA navigations. */
export function useMatomoPageViews(): void {
  const location = useLocation();
  const skipFirst = useRef(true);

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    trackPageView(
      `${location.pathname}${location.search}${location.hash}`,
      document.title,
    );
  }, [location.pathname, location.search, location.hash]);
}
