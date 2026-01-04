import { gsap } from 'gsap';
import { RegexPatterns } from '../../@constants';
import { PresetVarsAppender } from '../__shared__';

export class TimelineVarsAppender extends PresetVarsAppender<gsap.TimelineVars> {
  constructor(sequence: string) {
    super(sequence, 'timeline', RegexPatterns.TIMELINE_PROPS);
  }
}
