import { Condition } from '../../../utils';
import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from '../__shared__';
import { MorphSVGPropsExtractor } from './morph-svg-props-extractor';

export class MorphSVGApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    const morphSVGVars = new MorphSVGPropsExtractor(context.sequence).extract();
    new Condition(() => Object.keys(morphSVGVars).length > 0).whenTrue(() => {
      timeline.morphSVG(morphSVGVars);
    });
  }
}
