# ngx-gsap

A lightweight Angular animation library powered by GSAP. Highly customizable, declarative, and easy to use.

## Installation

```bash
npm install gsap ngx-gsap
```

## Quick Start

Import the directives you need:

```typescript
import { AnimateClickDirective, AnimateEnterDirective, AnimateLeaveDirective, AnimateLoadDirective } from 'ngx-gsap';

@Component({
  imports: [AnimateClickDirective, AnimateEnterDirective, AnimateLeaveDirective, AnimateLoadDirective],
  template: `
    <div animateClick="pulse">Click me!</div>
    <div animateEnter="fadeIn">Hover over me!</div>
    <div animateLeave="fadeOut">Mouse leave</div>
    <div animateLoad="slideIn">Animates on page load</div>
  `
})
```

## Basic Usage

```html
<!-- Simple animation -->
<div animateClick="fadeIn">Fade in on click</div>

<!-- With parameters -->
<div animateClick="fadeIn({ opacity: 0.1, duration: 2 })">Custom fade in</div>
```

## Animation Triggers

There are **two ways** to trigger animations:

### 1. Specific Directives (Recommended)

Each directive handles a specific event:

```html
<!-- animateLoad - Triggers on page load -->
<div animateLoad="fadeIn">Appears on page load</div>

<!-- animateClick - Triggers on click -->
<button animateClick="pulse">Pulse on click</button>

<!-- animateEnter - Triggers on mouse enter (hover) -->
<div animateEnter="fadeIn">Fades in on hover</div>

<!-- animateLeave - Triggers on mouse leave -->
<div animateLeave="fadeOut">Fades out on mouse leave</div>

<!-- Combine multiple directives -->
<div animateClick="scale" animateEnter="fadeIn" animateLeave="fadeOut">Multiple triggers</div>
```

### 2. Universal `animate` Directive

Use with the `trigger` input for flexibility:

```html
<div animate="fadeIn" trigger="load">Appears on page load</div>
<button animate="pulse" trigger="click">Pulse on click</button>
<div animate="fadeIn" trigger="enter">Fades in on hover</div>
<div animate="fadeOut" trigger="leave">Fades out on mouse leave</div>
```

## Animation Presets

**60+ preset animations** organized in 5 categories: Entrance, Exit, Attention, Special Effects, and Shadow Effects.

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

Apply properties to the entire timeline using `timeline@`:

```html
<!-- Repeat entire animation sequence -->
<div animateClick="timeline@repeat=3,yoyo=true;to:x:10;to:x:-10;to:x:0">Shake 4 times</div>

<!-- Infinite loop -->
<div animateLoad="timeline@repeat=-1;pulse">Pulse forever</div>

<!-- Timeline properties can be anywhere in the sequence -->
<div animateClick="fadeIn;timeline@repeat=2;pulse">Fade then pulse 3 times</div>
<div animateClick="shake;timeline@duration=2,ease=power2.out">Slow shake</div>
```

**Syntax:** `timeline@[props]`

Timeline properties apply to the **entire animation sequence**, regardless of where `timeline@` appears.

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

Use `selector` to animate children instead of the parent:

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

<!-- Raw syntax -->
<div animate="opacity:0@selector=.card,stagger={amount:1,from:center}">
  @for (item of items; track item.id) {
  <div class="card">{{ item }}</div>
  }
</div>
```

## Animation Events

Listen to animation lifecycle events:

```typescript
export class MyComponent {
  onStart() {
    console.log('Animation started');
  }

  onComplete() {
    console.log('Animation completed');
  }

  onUpdate() {
    console.log('Animation updating');
  }
}
```

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
```

**Available methods:**

- `play()` - Play the animation
- `pause()` - Pause the animation
- `reverse()` - Reverse the animation direction
- `resume()` - Resume a paused animation
- `restart()` - Restart the animation from the beginning

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

## License

MIT
