import { gsap } from 'gsap';
import type { SplitText } from 'gsap/SplitText';
import { assert, $ } from '../../../utils';
import { GsapPlugins } from '../../plugins';

export type { SplitText } from 'gsap/SplitText';
export type SplitTextTarget = 'chars' | 'words' | 'lines';
export type SplitTextVars = Partial<SplitText.Vars & { target: SplitTextTarget }>;

export class SplitTextTimeline {
  constructor(private readonly element: HTMLElement, private readonly timeline: gsap.core.Timeline) {}

  public create(vars: SplitTextVars = {}): SplitText {
    const config = { target: 'chars', type: 'chars,words,lines', autoSplit: true, ...vars } as Required<SplitTextVars>;
    SplitTextTimeline.validateVars(config);
    const element = $(this.element).queryAll(config['selector']);
    return GsapPlugins.SplitText.create(element, {
      ...config,
      onSplit: (self) => {
        const children = this.timeline.getChildren();
        this.timeline.set(element, { clearProps: 'all' }).clear();
        children.forEach((child) =>
          this.timeline[child.data.method](self[config.target], { ...child.vars }, child.data.position)
        );
        return this.timeline;
      },
    });
  }

  private static validateVars(vars: Required<SplitTextVars>): void {
    const targets = ['chars', 'words', 'lines'];
    assert(targets.includes(vars.target), 'target must be one of "chars", "words", or "lines"');
    assert(vars.type.split(',').includes(vars.target), 'type must be one of "chars,words,lines"');
  }
}
