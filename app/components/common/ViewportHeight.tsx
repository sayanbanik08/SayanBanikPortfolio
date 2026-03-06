'use client';

import { useEffect } from 'react';

/**
 * Sets a CSS custom property `--vh` equal to 1% of the real visible viewport height.
 * This provides a reliable fallback for browsers that don't support `dvh` units,
 * and ensures `calc(var(--vh, 1vh) * 100)` always maps to the actual inner height
 * on mobile browsers where the address bar / bottom nav bar are present.
 *
 * Updates on resize, orientationchange, and visual viewport resize (for iOS Safari).
 */
const ViewportHeight = () => {
  useEffect(() => {
    const setVh = () => {
      // Use the larger of innerHeight and screen.height to cover behind browser bars
      const fullHeight = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight
      );
      const vh = fullHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set immediately
    setVh();

    // Standard resize
    window.addEventListener('resize', setVh);

    // Orientation changes on mobile
    window.addEventListener('orientationchange', () => {
      // Small delay to let the browser finish rotating
      setTimeout(setVh, 150);
    });

    // Visual Viewport API — catches iOS Safari keyboard / toolbar changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setVh);
    }

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', setVh);
      }
    };
  }, []);

  return null;
};

export default ViewportHeight;
