import { Timeline } from '../../../timeline';
import { AnimationParserResult } from '../../animation-parser';
import { AnimationApplicator } from '../__shared__';
import { SequenceParser } from './sequence-parser';

export class TweenApplicator implements AnimationApplicator {
  public apply(timeline: Timeline, context: AnimationParserResult): void {
    const animations = context.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);
    animations.forEach((anim) => timeline[anim.method](anim.selector, anim.vars, anim.position));
  }
}
