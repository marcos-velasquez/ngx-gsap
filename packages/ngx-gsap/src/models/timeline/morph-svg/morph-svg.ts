import { gsap } from 'gsap';
import { assert } from '../../../utils';

export { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
export type MorphSVGVars = gsap.plugins.MorphSVGVars;

export class MorphSVGTimeline {
  constructor(private readonly element: HTMLElement, private readonly timeline: gsap.core.Timeline) {}

  public create(vars: MorphSVGVars): void {
    assert(!!vars.shape, 'morphSVG vars must include a shape to morph to');
    console.log('Morphing SVG with vars:', vars);
    this.timeline.to(this.element, { morphSVG: { ...vars } });
  }
}
