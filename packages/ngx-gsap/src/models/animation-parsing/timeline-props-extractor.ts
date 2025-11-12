import { gsap } from 'gsap';
import { RegexPatterns } from '../@constants';
import { PropsParser } from './props-parser';

export class TimelinePropsExtractor {
  constructor(private readonly sequence: string) {}

  public extract(): gsap.TimelineVars {
    const match = this.sequence.match(RegexPatterns.TIMELINE_PROPS);
    if (!match) return {};

    return new PropsParser(match[1]).parse();
  }
}
