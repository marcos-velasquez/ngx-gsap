import { Condition } from '../../../utils';
import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from './animation-applicator';

export class TimelineApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    new Condition(() => Object.keys(context.timelineVars).length > 0).whenTrue(() => {
      timeline.configure(context.timelineVars);
    });
  }
}
