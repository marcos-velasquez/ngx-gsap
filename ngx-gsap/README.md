# ngx-gsap

GSAP animations for Angular: declarative presets on any element, scroll and exit animations, and `injectGsap()` for the timelines you write yourself.

- Runs outside Angular's zone, so animating never triggers change detection.
- Cleans up after itself: everything a directive or `injectGsap()` creates is reverted when the host is destroyed.
- Respects `prefers-reduced-motion` by default.
- Works with server-side rendering and with a strict Content Security Policy.
- ScrollTrigger, SplitText and MorphSVG load only when a sequence uses them.

## Installation

```bash
npm install gsap ngx-gsap
```

Requires Angular 20.3 or later and GSAP 3.13 or later.

## Quick Start

Import the directives you need:

```typescript
import { AnimateClickDirective, AnimateHoverDirective, AnimateLoadDirective, AnimateScrollDirective } from 'ngx-gsap';

@Component({
  imports: [AnimateClickDirective, AnimateHoverDirective, AnimateLoadDirective, AnimateScrollDirective],
  template: `
    <div animateClick="pulse">Click me!</div>
    <div animateHover="pulse">Hover over me!</div>
    <div animateLoad="slideIn">Animates on page load</div>
    <div animateScroll="fadeIn">Fades in when scrolled into view</div>
  `,
})
```

## Basic Usage

### Preset Syntax

```html
<!-- Simple animation -->
<div animateClick="fadeIn">Fade in on click</div>

<!-- With parameters -->
<div animateClick="fadeIn({ opacity: 0.1, duration: 2 })">Custom fade in</div>
```

### Raw Syntax

```html
<!-- Custom control with raw GSAP syntax -->
<div animateClick="opacity:0:>">Fade in from transparent</div>
<div animateClick="x:100:0@duration=2;scale:1.2:<20%">Slide right then scale</div>
```

## Animation Triggers

There are **two ways** to trigger animations:

### 1. Specific Directives (Recommended)

Each directive handles a specific event:

```html
<!-- animateLoad - Triggers when the element renders -->
<div animateLoad="fadeIn">Appears on page load</div>

<!-- animateClick - Triggers on click -->
<button animateClick="pulse">Pulse on click</button>

<!-- animateHover - Triggers when the pointer enters -->
<div animateHover="pulse">Pulses on hover</div>

<!-- animateHoverOut - Triggers when the pointer leaves -->
<div animateHoverOut="shake">Shakes when the pointer leaves</div>

<!-- animateScroll - Triggers on scroll position -->
<div animateScroll="fadeIn({ scroll: { start: 'top center', scrub: true } })">Smooth fade</div>

<!-- animateExit - Plays when Angular removes the element -->
@if (visible) {
  <div animateExit="fadeOut">Fades out before it leaves the DOM</div>
}

<!-- Combine multiple directives -->
<div animateClick="pulse" animateHover="pulse">Multiple triggers</div>
```

A trigger that fires while its animation is still running is ignored rather than restarting it halfway.

### 2. Universal `animate` Directive

Use with the `trigger` input for flexibility:

```html
<div animate="fadeIn" trigger="load">Appears on page load</div>
<button animate="pulse" trigger="click">Pulse on click</button>
<div animate="pulse" trigger="hover">Pulses on hover</div>
<div animate="shake" trigger="hoverOut">Shakes when the pointer leaves</div>
<div animate="zoomIn" trigger="scroll">Zoom in when scrolled into view</div>
```

### Exit animations

`animateExit` runs when Angular removes the element — an `@if` turning false, an item leaving a `@for`, a route changing — and Angular keeps the element in the DOM until the animation ends. It is built on Angular's own `animate.leave`.

```html
@for (item of items(); track item.id) {
  <li animateExit="slideOut({ x: '100%' })">{{ item.name }}</li>
}
```

### Typed presets

Any directive also takes a preset as an object. Its parameters autocomplete, and GSAP vars ride along as they do in the string form:

```html
<div [animateClick]="{ preset: 'fadeIn', x: '-100%', duration: 2 }">Typed preset</div>
<div [animateScroll]="{ preset: 'zoomIn', scroll: { start: 'top center', scrub: true } }">Typed scroll</div>
```

## Animation Presets

**37+ preset animations** organized in 7 categories: Entrance, Exit, Attention, Special Effects, Shadow Effects, Text Animations, and SVG Morphing.

### Flexible & Parametrized

Instead of dozens of similar animations (`fadeInLeft`, `fadeInRight`, `fadeInUp`, etc.), we provide **one powerful animation** that you customize with parameters:

```html
<!-- One animation, infinite possibilities -->
<div animateLoad="fadeIn">Simple fade in</div>
<div animateLoad="fadeIn({ x: '-100%' })">Fade in from left</div>
<div animateLoad="fadeIn({ x: '100%' })">Fade in from right</div>
<div animateLoad="fadeIn({ y: '100%' })">Fade in from bottom</div>
<div animateLoad="fadeIn({ y: '-100%' })">Fade in from top</div>
<div animateLoad="fadeIn({ x: '-100%', y: '-100%' })">Fade in from top-left</div>
<div animateLoad="fadeIn({ y: '2000px' })">Fade in from far away</div>
```

### GSAP Properties

You can use **any valid GSAP property** to customize animations:

- **Timing**: `duration`, `delay`, `ease`
- **Effects**: `stagger`, `repeat`, `yoyo`
- **And more**: See [GSAP documentation](https://greensock.com/docs/)

```html
<div animateClick="pulse({ duration: 2, ease: 'elastic.out', repeat: 3 })">Custom pulse</div>
```

### Method-Specific Properties

Apply properties only to specific animation methods (`to`, `from`, `set`) for fine-grained control. This is particularly useful when you want `stagger` to apply only to animated properties, not to instant `set` operations:

```html
<!-- Stagger only on 'to' animations, not on 'set' -->
<div animateLoad="zoomIn({ set: { opacity: 0 }, to: { stagger: 0.5, opacity: 1 } })">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</div>

<!-- Different properties per method -->
<div animateClick="fadeIn({ from: { ease: 'power2', duration: 1 }, to: { stagger: 0.2 } })">Multiple elements</div>
```

**Common use case:** Prevent `stagger` from affecting `set` (instant) operations while keeping it on `to`/`from` (animated) operations.

## Advanced Features

### Custom Animations (Raw Syntax)

For complete control, use raw GSAP syntax:

```html
<!-- Single property -->
<div animateClick="opacity:0:>">Fade in</div>
<div animateClick="to:opacity:0:>">Fade out</div>

<!-- Multiple properties -->
<div animateClick="opacity:0:>;scale:0.5:<">Fade and scale</div>
<div animateClick="x:-100%:>;opacity:0:0">Slide from left with fade</div>

<!-- Sequential animations -->
<div animateClick="scale:0:>;to:scale:1.2:>;to:scale:1:>">Bounce effect</div>
```

**Syntax:** `[method]:[property]:[value]:[position]@[props]`

- **method**: `from` (default), `to`, or `set`
- **property**: GSAP property (`opacity`, `scale`, `x`, `y`, `rotate`, etc.)
- **value**: Target value
- **position**: `>` sequence, `<` simultaneous, `0` start, etc. _(optional)_
- **props**: GSAP properties like `duration`, `ease` _(optional)_

**Note:** The `set` method instantly sets properties without animation, useful for establishing initial states.

### Timeline Properties

Apply properties to the entire timeline:

```html
<!-- Raw syntax with timeline@ -->
<div animateClick="timeline@repeat=3,yoyo=true;to:x:10;to:x:-10;to:x:0">Shake 4 times</div>
<div animateLoad="timeline@repeat=-1;pulse">Pulse forever</div>

<!-- Preset syntax with timeline parameter -->
<div animateClick="shake({ timeline: { repeat: 1 } })">Shake twice</div>
<div animateClick="pulse({ opacity: 0, timeline: { repeat: 2, yoyo: true } })">Pulse 3 times</div>
```

Timeline properties apply to the **entire animation sequence** and can be placed anywhere in the sequence.

### Scroll Properties

Configure scroll-triggered animations:

```html
<!-- Raw syntax with scroll@ -->
<div animateScroll="x:100%:>;scroll@start='top center',scrub=true">Smooth scroll fade</div>
<div animateScroll="slideIn({ x: '-100%' });scroll@start='top bottom',end='bottom top'">Slide on scroll</div>

<!-- Preset syntax with scroll parameter -->
<div animateScroll="fadeIn({ scroll: { start: 'top center', scrub: true } })">Smooth fade</div>
<div animateScroll="zoomIn({ scroll: { start: 'top bottom', pin: true, markers: true } })">Pinned zoom</div>
```

Scroll properties apply to the **entire timeline** and work with `animateScroll` directive.

### SplitText Plugin

Animate text by splitting it into characters, words, or lines using the GSAP SplitText plugin:

```html
<!-- Raw syntax with splitText@ -->
<div animateLoad="from:opacity:0:>;from:y:-20:0.1;splitText@type='chars'">Fade and slide chars</div>
<div animateClick="to:scale:1.2:>;to:rotate:360:>;splitText@type='words'">Scale and rotate words</div>

<!-- Preset syntax with splitText@ in sequence -->
<div animateLoad="fadeIn;splitText@type='chars'">Animate each character</div>
<div animateLoad="slideIn;splitText@type='words,lines',wordsClass='word'">Split text</div>

<!-- Preset syntax with splitText parameter -->
<div animateLoad="fadeIn({ splitText: { type: 'chars', target: 'chars' } })">Animate each character</div>
<div animateClick="rotateIn({ splitText: { type: 'chars', charsClass: 'char', position: 'relative' } })">
  Custom split
</div>
```

### MorphSVG Plugin

Morph SVG shapes smoothly using the GSAP MorphSVGPlugin:

```html
<!-- Raw syntax with morphSVG@ -->
<svg>
  <path animateClick="to:fill:blue:>;morphSVG@shape='#star',type='linear'" id="circle" d="..." />
</svg>

<!-- Preset syntax with morphSVG parameter -->
<svg>
  <path animateClick="fadeIn({ morphSVG: { shape: '#star', type: 'linear' } })" d="..." />
</svg>

<!-- Dedicated presets -->
<svg>
  <path animateClick="morphLinear({ shape: '#star', timeline: { duration: 2, yoyo: true, repeat: -1 } })" d="..." />
</svg>

<svg>
  <path animateHover="morphRotational({ shape: '#lightning',  timeline: { duration: 2 } })" d="..." />
</svg>
```

### Element Properties

Apply CSS properties to the container element **before** animations run using `element@`. This is essential for properties that affect child rendering like `perspective`, `transformOrigin`, or `overflow`:

```html
<!-- Apply perspective for 3D transforms -->
<div animateLoad="rotateIn;element@perspective=1000,transformOrigin='center'">3D rotation</div>

<!-- Combine with SplitText for 3D text effects -->
<div animateLoad="fadeIn;element@perspective=800;splitText@type='chars'">3D text animation</div>

<!-- Set overflow before animation -->
<div animateClick="slideIn;element@overflow='hidden'">Contained slide</div>
```

**When to use:** Use `element@` when you need to apply styles to the parent container before child animations, especially for 3D transforms (`perspective`), positioning (`transformOrigin`), or layout (`overflow`).

### Combining Animations

Combine multiple animations using semicolons:

```html
<!-- Multiple presets -->
<div animateLoad="fadeIn;rotateIn">Fade and rotate</div>
<div animateClick="pulse;shake">Pulse then shake</div>

<!-- With parameters -->
<div animateLoad="fadeIn({ x: '-100%' });bounceIn">Slide and bounce</div>

<!-- Mix presets with raw syntax -->
<div animateClick="fadeIn;to:scale:1.2:>">Fade then scale</div>
<div animateLoad="slideIn({ x: '-100%' });rotate:360:>">Slide and rotate</div>
```

### Dynamic Values

Bind component properties using Angular interpolation:

```typescript
export class MyComponent {
  duration = 2;
}
```

```html
<div animateClick="fadeIn({ duration: {{ duration }} })">Dynamic animation</div>
```

### Animating Child Elements

Use `selector` to animate children instead of the parent. The `selector` property works with **all animation methods** (`to`, `from`, `set`, `fromTo`):

```html
<!-- Basic -->
<div animateLoad="fadeIn({ selector: '.card' })">
  @for (item of items; track item.id) {
  <div class="card">{{ item.name }}</div>
  }
</div>

<!-- With stagger -->
<div animateLoad="fadeIn({ selector: '.card', stagger: { amount: 1, from: 'center' } })">
  @for (item of items; track item.id) {
  <div class="card">{{ item.name }}</div>
  }
</div>

<!-- Raw syntax - works with all methods -->
<div animate="opacity:0@selector=.card,stagger={amount:1,from:center}">
  @for (item of items; track item.id) {
  <div class="card">{{ item }}</div>
  }
</div>

<!-- Selector with specific methods -->
<div animate="to:x:100@selector=.child">Slide children</div>
<div animate="from:opacity:0@selector=.item">Fade in items</div>
```

## Animation Events

```html
<div
  animateClick="fadeIn"
  (animateStart)="onStart()"
  (animateComplete)="onComplete()"
  (animateUpdate)="onUpdate()"
  (animateRepeat)="onRepeat()"
  (animateReverseComplete)="onReverseComplete()"
>
  Animated element
</div>
```

**Available events:**

- `animateStart` - Fires when animation starts
- `animateComplete` - Fires when animation completes
- `animateUpdate` - Fires on each animation frame
- `animateRepeat` - Fires when animation repeats
- `animateReverseComplete` - Fires when reverse animation completes

## Programmatic Control

Control animations programmatically using template references:

```html
<div #animation="animate" animate="fadeIn">Content</div>

<button (click)="animation.play()">Play</button>
<button (click)="animation.pause()">Pause</button>
<button (click)="animation.reverse()">Reverse</button>
<button (click)="animation.resume()">Resume</button>
<button (click)="animation.restart()">Restart</button>
<button (click)="animation.invalidate()">Invalidate</button>
```

**Available methods:**

- `play()` - Play the animation
- `pause()` - Pause the animation
- `reverse()` - Reverse the animation direction
- `resume()` - Resume a paused animation
- `restart()` - Restart the animation from the beginning
- `invalidate()` - Invalidate and reset the animation

## Configuration

`provideNgxGsap()` is optional; without it, the defaults below apply.

```typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { provideNgxGsap } from 'ngx-gsap';

bootstrapApplication(App, {
  providers: [
    provideNgxGsap({
      reducedMotion: 'respect', // default; 'ignore' always animates
      plugins: { scrollTrigger: ScrollTrigger }, // register up front instead of loading on first use
    }),
  ],
});
```

### Reduced motion

When the system asks for reduced motion (`prefers-reduced-motion: reduce`), every animation rests at its end instead of playing, and `animateComplete` still fires. An animation that repeats forever has no end, so it stays still. Exit animations let the element go at once.

### Plugins

ScrollTrigger, SplitText and MorphSVG are imported the first time a sequence needs them, so an app that only uses simple presets never downloads them. Pass them to `plugins` to load them with the app instead.

## Your own timelines: `injectGsap()`

For animations a preset cannot express, `injectGsap()` gives a component a GSAP context tied to its lifecycle — Angular's counterpart to React's `useGSAP`:

```typescript
import { gsap } from 'gsap';
import { injectGsap } from 'ngx-gsap';

@Component({ template: `<ul><li class="card">…</li></ul>` })
export class Cards {
  private readonly gsap = injectGsap(() => {
    gsap.from('.card', { y: 24, opacity: 0, stagger: 0.1 });
  });

  protected onShuffle(): void {
    this.gsap.run(() => gsap.to('.card', { rotate: 'random(-5, 5)' }));
  }
}
```

- The setup runs after the first render; selector strings resolve inside the host element.
- `run()` adds more animations to the same context later.
- Everything runs outside Angular's zone and is reverted when the component is destroyed.
- On the server nothing runs, and `run()` returns `undefined`.
- `reducedMotion` says whether the user asked for less motion and the app respects it.

## Important Notes

### ⚠️ CSS Transitions Conflict

**Do not use CSS `transition` properties on elements animated by GSAP.** CSS transitions and GSAP animations will conflict when controlling the same properties, causing unexpected behavior.

```html
<!-- ❌ BAD: CSS transition conflicts with GSAP -->
<div animateClick="zoomIn" class="transition-transform duration-300 hover:scale-105">Will not work correctly</div>

<!-- ✅ GOOD: No CSS transitions on animated element -->
<div animateClick="zoomIn">Works perfectly</div>

<!-- ✅ GOOD: Apply directive to parent, CSS transitions on child -->
<div animateClick="zoomIn">
  <div class="transition-transform duration-300 hover:scale-105">
    Also works - child has transitions, parent is animated
  </div>
</div>
```

**Rule of thumb:** If GSAP animates an element's `transform`, `opacity`, or any other property, don't use CSS transitions/animations on those same properties for that element.

### Server-side rendering

Directives and `injectGsap()` do nothing on the server: animations start in the browser after the first render.

### Content Security Policy

ngx-gsap never evaluates strings as code, so it works under a policy without `'unsafe-eval'`.

### Migrating from 1.x

See the [changelog](https://github.com/marcos-velasquez/ngx-gsap/blob/main/CHANGELOG.md#migrating-from-1x). In short: `animateEnter` / `animateLeave` became `animateHover` / `animateHoverOut` (the old names keep working, with a warning), and reduced motion is respected by default.

## License

MIT
