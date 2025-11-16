import { ScrollTriggerVars } from '../@types';
import { RegexPatterns } from '../@constants';
import { PresetAppender } from './preset-appender';

export class ScrollVarsAppender extends PresetAppender<ScrollTriggerVars> {
  constructor(sequence: string) {
    super(sequence, 'scroll', RegexPatterns.SCROLL_PROPS);
  }
}
