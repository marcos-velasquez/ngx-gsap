import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RegexPatterns } from '../../@constants';
import { PresetAppender } from '../__shared__';

export class ScrollVarsAppender extends PresetAppender<ScrollTrigger.StaticVars> {
  constructor(sequence: string) {
    super(sequence, 'scroll', RegexPatterns.SCROLL_PROPS);
  }
}
