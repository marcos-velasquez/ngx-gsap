import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RegexPatterns } from '../../@constants';
import { PresetVarsAppender } from '../__shared__';

export class ScrollVarsAppender extends PresetVarsAppender<ScrollTrigger.StaticVars> {
  constructor(sequence: string) {
    super(sequence, 'scroll', RegexPatterns.SCROLL_PROPS);
  }
}
