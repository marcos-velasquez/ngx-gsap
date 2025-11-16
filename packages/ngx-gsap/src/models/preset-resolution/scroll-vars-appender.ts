import { gsap } from 'gsap';
import { RegexPatterns } from '../@constants';
import { PresetAppender } from './preset-appender';

export class ScrollVarsAppender extends PresetAppender<gsap.plugins.ScrollTriggerStaticVars> {
  constructor(sequence: string) {
    super(sequence, 'scroll', RegexPatterns.SCROLL_PROPS);
  }
}
