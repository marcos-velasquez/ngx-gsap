import { isDevMode } from '@angular/core';

const warned = new Set<string>();

export const warnDeprecated = (name: string, replacement: string): void => {
  if (!isDevMode() || warned.has(name)) return;
  warned.add(name);
  console.warn(
    `ngx-gsap: [${name}] is deprecated and will be removed in 3.0; use [${replacement}]. It fires on the pointer, not when the element enters or leaves the DOM.`
  );
};
