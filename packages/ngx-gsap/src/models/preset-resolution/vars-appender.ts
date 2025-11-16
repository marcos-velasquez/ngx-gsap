import { TweenVars, TimelineVars, ScrollTriggerVars } from '../@types';
import { CustomVarsAppender } from './custom-vars-appender';
import { TimelineVarsAppender } from './timeline-vars-appender';
import { ScrollVarsAppender } from './scroll-vars-appender';

export class VarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: TweenVars, timelineVars: TimelineVars, scrollVars: ScrollTriggerVars): string {
    const sequenceWithCustomVars = new CustomVarsAppender(this.sequence).append(customVars);
    const sequenceWithTimelineVars = new TimelineVarsAppender(sequenceWithCustomVars).append(timelineVars);
    return new ScrollVarsAppender(sequenceWithTimelineVars).append(scrollVars);
  }
}
