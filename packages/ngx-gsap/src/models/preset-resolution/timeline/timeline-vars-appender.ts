import { gsap } from 'gsap';
import { RegexPatterns } from '../../@constants';
import { PresetAppender } from '../__shared__';

export class TimelineVarsAppender extends PresetAppender<gsap.TimelineVars> {
  constructor(sequence: string) {
    super(sequence, 'timeline', RegexPatterns.TIMELINE_PROPS);
  }
}
