import { gsap } from 'gsap';
import { assert, RegexPatterns } from '../../utils';
import { SequenceParser, ParsedAnimation } from './sequence-parser';
import { PresetResolver } from '../preset-resolution/preset-resolver';
import { TimelinePropsExtractor } from './timeline-props-extractor';

export type ParsedAnimationWithTimeline = { animations: ParsedAnimation[]; timelineVars: gsap.TimelineVars };

export class AnimationParser {
  private readonly sequences: string[];
  private readonly timelineVars: gsap.TimelineVars;

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');

    const { timelineVars, cleanSequence } = new TimelinePropsExtractor(
      sequence
        .trim()
        .split(RegexPatterns.SEQUENCE_DELIMITER)
        .flatMap((part) => new PresetResolver(part.trim()).resolve().split(RegexPatterns.SEQUENCE_DELIMITER))
        .join(';')
    ).extract();
    this.timelineVars = timelineVars;
    this.sequences = cleanSequence
      .split(RegexPatterns.SEQUENCE_DELIMITER)
      .map((s) => s.trim())
      .filter((s) => s);
  }

  public parse(): ParsedAnimationWithTimeline {
    return {
      timelineVars: this.timelineVars,
      animations: this.sequences.map((seq) => new SequenceParser(seq).parse()).filter((anim) => anim !== null),
    };
  }
}
