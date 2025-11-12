import { gsap } from 'gsap';
import { TypeSerializer } from '../../utils';
import { RegexPatterns } from '../@constants';

export class TimelineVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(timelineVars: gsap.TimelineVars): string {
    if (Object.keys(timelineVars).length === 0) return this.sequence;

    const timelineVarsString = Object.entries(timelineVars)
      .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
      .join(',');

    const timelineDeclaration = `timeline@${timelineVarsString}`;

    if (RegexPatterns.TIMELINE_PROPS.test(this.sequence)) {
      return this.sequence.replace(RegexPatterns.TIMELINE_PROPS, timelineDeclaration);
    }

    return `${timelineDeclaration};${this.sequence}`;
  }
}
