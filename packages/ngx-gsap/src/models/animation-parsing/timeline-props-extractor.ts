import { RegexPatterns } from '../../utils';
import { PropsParser } from './props-parser';

export type TimelinePropsResult = { timelineVars: gsap.TimelineVars; cleanSequence: string };

export class TimelinePropsExtractor {
  constructor(private readonly sequence: string) {}

  public extract(): TimelinePropsResult {
    const match = this.sequence.match(RegexPatterns.TIMELINE_PROPS);
    if (!match) return { timelineVars: {}, cleanSequence: this.sequence };

    return {
      timelineVars: new PropsParser(match[1]).parse(),
      cleanSequence: this.sequence.replace(RegexPatterns.TIMELINE_PROPS, '').replace(/^;|;$/g, '').trim(),
    };
  }
}
