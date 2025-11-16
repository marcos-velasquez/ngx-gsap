import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assert } from '../../utils';
import { PresetResolver } from '../preset-resolution/preset-resolver';
import { SequenceParser, ParsedAnimation } from './sequence-parser';
import { TimelinePropsExtractor, ScrollPropsExtractor } from './extractors';

export type AnimationParserResult = {
  animations: ParsedAnimation[];
  timelineVars: gsap.TimelineVars;
  scrollVars: ScrollTrigger.StaticVars;
};

export class AnimationParser {
  public static readonly DELIMITER = ';';

  private readonly sequences: string[];

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');

    const parts = sequence.trim().split(AnimationParser.DELIMITER);
    this.sequences = parts.flatMap((part) =>
      new PresetResolver(part.trim()).resolve().split(AnimationParser.DELIMITER)
    );
  }

  public parse(): AnimationParserResult {
    const sequence = this.sequences.join(AnimationParser.DELIMITER);
    return {
      timelineVars: new TimelinePropsExtractor(sequence).extract(),
      scrollVars: new ScrollPropsExtractor(sequence).extract(),
      animations: this.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null),
    };
  }
}
