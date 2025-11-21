import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export { SplitText } from 'gsap/SplitText';
export type SplitTextTarget = 'chars' | 'words' | 'lines';
export type SplitTextVars = Partial<SplitText.Vars & { target: SplitTextTarget }>;

export class SplitTextTimeline {
  constructor(private readonly element: HTMLElement, private readonly timeline: gsap.core.Timeline) {}

  public create(vars: SplitTextVars = {}): SplitText {
    const config = { target: 'chars', type: 'chars,words,lines', autoSplit: true, ...vars } as Required<SplitTextVars>;
    return SplitText.create(this.element, {
      ...config,
      onSplit: (self) => {
        const children = this.timeline.getChildren();
        this.timeline.clear();
        children.forEach((child) => this.timeline[child.data.method](self[config.target], { ...child.vars }));
        return this.timeline;
      },
    });
  }
}
