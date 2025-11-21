import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from '../__shared__';
import { ScrollPropsExtractor } from './scroll-props-extractor';

export class ScrollApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    timeline.isScroll().whenTrue(() => {
      const scrollVars = new ScrollPropsExtractor(context.sequence).extract();
      timeline.scroll(scrollVars);
    });
  }
}
