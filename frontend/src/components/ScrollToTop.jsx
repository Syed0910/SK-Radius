import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable the browser's default scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      // Temporarily disable smooth scrolling to force an instant jump
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Aggressively reset all possible scroll containers
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Restore the CSS smooth scrolling behavior after a tiny delay
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
      }, 50);
    };

    // Execute immediately and also slightly after render
    resetScroll();
    const timeoutId = setTimeout(resetScroll, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
