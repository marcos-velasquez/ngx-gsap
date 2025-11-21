import { PresetMatcher } from '../preset-matcher';
import { PresetResolver } from '../__shared__';
import { TimelineVarsExtractor } from './timeline-vars-extractor';
import { TimelineVarsAppender } from './timeline-vars-appender';

export class TimelineResolver implements PresetResolver {
  public resolve(matcher: PresetMatcher, sequence: string): string {
    const timelineVars = new TimelineVarsExtractor(matcher).extract();
    return new TimelineVarsAppender(sequence).append(timelineVars);
  }
}
