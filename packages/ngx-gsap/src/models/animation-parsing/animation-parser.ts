import { gsap } from 'gsap';
import { assert } from '../../utils';
import { Animation } from '../@constants';
import { PresetResolver } from '../preset-resolution/preset-resolver';
import { SequenceParser, ParsedAnimation } from './sequence-parser';
import { TimelinePropsExtractor } from './timeline-props-extractor';

export class AnimationParser {
  private readonly sequences: string[];

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');

    const parts = sequence.trim().split(Animation.DELIMITER);
    this.sequences = parts.flatMap((part) => new PresetResolver(part.trim()).resolve().split(Animation.DELIMITER));
  }

  public parse(): { animations: ParsedAnimation[]; timelineVars: gsap.TimelineVars } {
    return {
      timelineVars: new TimelinePropsExtractor(this.sequences.join(Animation.DELIMITER)).extract(),
      animations: this.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null),
    };
  }
}
