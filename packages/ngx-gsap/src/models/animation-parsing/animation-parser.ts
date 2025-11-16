import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assert } from '../../utils';
import { Animation } from '../@constants';
import { PresetResolver } from '../preset-resolution/preset-resolver';
import { SequenceParser, ParsedAnimation } from './sequence-parser';
import { TimelinePropsExtractor } from './timeline-props-extractor';
import { ScrollPropsExtractor } from './scroll-props-extractor';

export type AnimationParserResult = {
  animations: ParsedAnimation[];
  timelineVars: gsap.TimelineVars;
  scrollVars: ScrollTrigger.StaticVars;
};

export class AnimationParser {
  private readonly sequences: string[];

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');

    const parts = sequence.trim().split(Animation.DELIMITER);
    this.sequences = parts.flatMap((part) => new PresetResolver(part.trim()).resolve().split(Animation.DELIMITER));
  }

  public parse(): AnimationParserResult {
    const fullSequence = this.sequences.join(Animation.DELIMITER);
    return {
      timelineVars: new TimelinePropsExtractor(fullSequence).extract(),
      scrollVars: new ScrollPropsExtractor(fullSequence).extract(),
      animations: this.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null),
    };
  }
}
