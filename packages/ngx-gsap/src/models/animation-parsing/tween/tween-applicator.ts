import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from '../__shared__';
import { TweenPropsExtractor } from './tween-props-extractor';

export class TweenApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    const animations = context.sequences.map((s) => new TweenPropsExtractor(s).parse()).filter((anim) => anim !== null);
    animations.forEach((anim) => timeline[anim.method](anim.selector, anim.vars, anim.position));
  }
}
