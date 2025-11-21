import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from './animation-applicator';

export class ScrollApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    timeline.isScroll().whenTrue(() => timeline.scroll(context.scrollVars));
  }
}
