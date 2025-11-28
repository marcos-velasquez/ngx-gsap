import { Condition } from '../../../utils';
import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from '../__shared__';
import { ElementPropsExtractor } from './element-props-extractor';

export class ElementApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    const elementVars = new ElementPropsExtractor(context.sequence).extract();
    new Condition(() => Object.keys(elementVars).length > 0).whenTrue(() => {
      timeline.target(elementVars);
    });
  }
}
