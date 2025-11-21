import { Condition } from '../../../utils';
import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { TimelinePropsExtractor } from '../extractors';
import { AnimationApplicator } from './animation-applicator';

export class TimelineApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    const timelineVars = new TimelinePropsExtractor(context.sequence).extract();
    new Condition(() => Object.keys(timelineVars).length > 0).whenTrue(() => {
      timeline.configure(timelineVars);
    });
  }
}
