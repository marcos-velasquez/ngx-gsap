import { PresetVarsResolver } from '../__shared__';
import { TimelineVarsExtractor } from './timeline-vars-extractor';
import { TimelineVarsAppender } from './timeline-vars-appender';

export class TimelineVarsResolver extends PresetVarsResolver {
  constructor() {
    super(TimelineVarsExtractor, TimelineVarsAppender);
  }
}
