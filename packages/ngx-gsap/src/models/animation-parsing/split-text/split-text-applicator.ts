import { Condition } from '../../../utils';
import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from '../__shared__';
import { SplitTextPropsExtractor } from './split-text-props-extractor';

export class SplitTextApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    const splitTextVars = new SplitTextPropsExtractor(context.sequence).extract();
    new Condition(() => Object.keys(splitTextVars).length > 0).whenTrue(() => {
      timeline.splitText(splitTextVars);
    });
  }
}
