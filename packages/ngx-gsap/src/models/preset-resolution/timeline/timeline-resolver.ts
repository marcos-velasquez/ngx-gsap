import { PresetResolver } from '../__shared__';
import { TimelineVarsExtractor } from './timeline-vars-extractor';
import { TimelineVarsAppender } from './timeline-vars-appender';

export class TimelineResolver extends PresetResolver {
  constructor() {
    super(TimelineVarsExtractor, TimelineVarsAppender);
  }
}
