import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { ScrollPropsExtractor } from '../extractors';
import { AnimationApplicator } from './animation-applicator';

export class ScrollApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    timeline.isScroll().whenTrue(() => {
      const scrollVars = new ScrollPropsExtractor(context.sequence).extract();
      timeline.scroll(scrollVars);
    });
  }
}
