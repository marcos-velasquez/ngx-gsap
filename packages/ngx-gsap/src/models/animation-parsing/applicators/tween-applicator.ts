import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { AnimationApplicator } from './animation-applicator';

export class TweenApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    context.animations.forEach((anim) => timeline[anim.method](anim.selector, anim.vars, anim.position));
  }
}
