import { gsap } from 'gsap';
import { RegexPatterns } from '../../../@constants';
import { PropsExtractor } from '../__shared__';

export class TimelinePropsExtractor extends PropsExtractor<gsap.TimelineVars> {
  constructor(sequence: string) {
    super(sequence, RegexPatterns.TIMELINE_PROPS);
  }
}
