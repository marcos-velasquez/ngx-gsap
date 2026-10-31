# Changelog

## 2.0.0

### Breaking changes

- **Peers.** `@angular/core` and `@angular/common` `>=20.3.0`, the version the library is built with, and `gsap` `^3.13.0`, the first public release that includes SplitText and MorphSVG. 1.x declared Angular 18–20 but was built with 20.3, and its `gsap ^3.12.0` range could not resolve the SplitText and MorphSVG imports.
- **Plugins are no longer registered on import.** ngx-gsap used to register ScrollTrigger, SplitText and MorphSVG globally as soon as a directive existed. They now load the first time a sequence needs them. If your own code used one of them because ngx-gsap had registered it, register it yourself or pass it to `provideNgxGsap({ plugins })`.
- **Reduced motion is respected by default.** When the system asks for reduced motion, an animation rests at its end instead of playing. Opt out with `provideNgxGsap({ reducedMotion: 'ignore' })`.
- **A trigger is ignored while its animation runs.** A second click during a click animation used to restart it halfway; it is now ignored, as the timeline always intended.

### Fixed

- Presets no longer go through `new Function`, which a strict Content Security Policy blocks: the library failed entirely in those apps.
- In production builds, a preset's own parameters (`x` in `fadeIn({ x: '-100%' })`) were copied into every tween of the sequence as GSAP vars: their names were read from the function's source, which minification rewrites. Often invisible, since the tweens animate the same element, but not always what the preset meant.
- GSAP runs outside Angular's zone. Its ticker used to run change detection on every frame, and the app never reported itself stable.
- Destroying a directive before it rendered, as every directive does on the server, threw `Cannot read properties of undefined (reading 'disconnect')`.
- Destroying a directive reverts what it created: SplitText no longer leaves the text split into divs.
- The outputs no longer replace the timeline's own start and complete callbacks.
- The universal `animate` directive can be imported; it was declared abstract.
- A leftover `console.log` in MorphSVG is gone.

### Added

- `animateHover` and `animateHoverOut`.
- `animateExit`: plays when Angular removes the element (`@if`, `@for`, a route) and keeps it in the DOM until the animation ends.
- Typed presets: `[animateClick]="{ preset: 'fadeIn', x: '-100%', duration: 2 }"`.
- `provideNgxGsap({ reducedMotion, plugins })`.
- `injectGsap()`: a GSAP context tied to the host component, run outside the zone, reverted on destroy and inert on the server.

### Deprecated

- `animateEnter` and `animateLeave`, and the `enter` / `leave` triggers. They fire on the pointer (`mouseenter` / `mouseleave`), not when the element enters or leaves the DOM; use `animateHover` / `animateHoverOut`, or `animateExit` for removal. They keep working and warn once in development; they will be removed in 3.0.

### Migrating from 1.x

1. Update the peers: Angular 20.3 or later and `gsap` 3.13 or later.
2. Replace `animateEnter` with `animateHover` and `animateLeave` with `animateHoverOut` (`trigger="enter"` / `"leave"` with `"hover"` / `"hoverOut"`).
3. If your own code relied on ScrollTrigger, SplitText or MorphSVG being registered by ngx-gsap, register them with `provideNgxGsap({ plugins: { scrollTrigger: ScrollTrigger } })`.
4. If you need animations to run under reduced motion, add `provideNgxGsap({ reducedMotion: 'ignore' })`.

## 1.2.0 — 2026-01-04

- MorphSVG: `morphLinear` and `morphRotational` presets, and SVG morphing in sequences.

## 1.1.0 — 2025-11-30

- Method-specific vars for `to`, `from` and `set`, combinable with global vars.
- `immediateRender` for the load trigger.
- Inline styles are cleared before a SplitText animation.

## 1.0.0 — 2025-11-17

- First release.
