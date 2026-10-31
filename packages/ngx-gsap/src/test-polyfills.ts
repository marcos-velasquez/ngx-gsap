/* jsdom has no Web Animations API, and Angular turns `animate.enter` / `animate.leave` off when
   `getAnimations` is missing. It reads that once when it loads, so this runs before Angular does. */
if (typeof Element.prototype.getAnimations !== 'function') {
  Element.prototype.getAnimations = () => [];
}

/* jsdom has no `matchMedia` either, and ScrollTrigger calls it when it registers. Specs that need a
   query to match replace it with their own. */
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    } as MediaQueryList);
}
