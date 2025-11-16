import { TimelineVars } from '../@types';
import { RegexPatterns } from '../@constants';
import { PresetAppender } from './preset-appender';

export class TimelineVarsAppender extends PresetAppender<TimelineVars> {
  constructor(sequence: string) {
    super(sequence, 'timeline', RegexPatterns.TIMELINE_PROPS);
  }
}
