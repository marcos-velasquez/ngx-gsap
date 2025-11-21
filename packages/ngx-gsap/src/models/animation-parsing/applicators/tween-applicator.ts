import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { SequenceParser } from '../sequence-parser';
import { AnimationApplicator } from './animation-applicator';

export class TweenApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    const animations = context.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);
    animations.forEach((anim) => timeline[anim.method](anim.selector, anim.vars, anim.position));
  }
}
