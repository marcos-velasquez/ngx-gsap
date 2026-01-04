import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

export { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
export type MorphSVGType = 'linear' | 'rotational';
export type MorphSVGVars = { shape: string } & Partial<{
  type: MorphSVGType;
  origin: string;
  shapeIndex: number;
  map: 'position' | 'size' | 'complexity' | undefined;
}>;

export class MorphSVGTimeline {
  constructor(private readonly element: HTMLElement, private readonly timeline: gsap.core.Timeline) {}

  public morph(vars: MorphSVGVars = { shape: '' }): void {
    if (!vars.shape) return;

    this.timeline.to(this.element, { morphSVG: { ...vars } });
  }
}
