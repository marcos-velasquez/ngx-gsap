# ngx-gsap

A lightweight Angular animation library powered by GSAP. Highly customizable, declarative, and easy to use.

## 📚 Documentation

For complete documentation, examples, and API reference, see the [ngx-gsap package README](./packages/ngx-gsap/README.md).

## 🚀 Quick Start

```bash
npm install gsap ngx-gsap
```

Requires Angular 20.3+ and GSAP 3.13+.

```typescript
import { AnimateClickDirective, AnimateLoadDirective } from 'ngx-gsap';

@Component({
  imports: [AnimateClickDirective, AnimateLoadDirective],
  template: `
    <div animateClick="pulse">Click me!</div>
    <div animateLoad="fadeIn">Fades in on load</div>
  `
})
```

## 📦 Monorepo Structure

This is a monorepo containing:

- **`packages/ngx-gsap`** - The main library package
- **`src/app`** - Demo application showcasing all animations

## 🔗 Links

- [Full Documentation](./packages/ngx-gsap/README.md)
- [Demo App](https://marcos-velasquez.github.io/ngx-gsap)
- [Changelog](./CHANGELOG.md)

## 📄 License

MIT
