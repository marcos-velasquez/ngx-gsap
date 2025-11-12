import { gsap } from 'gsap';
import { CustomVarsAppender } from './custom-vars-appender';
import { TimelineVarsAppender } from './timeline-vars-appender';

export class VarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: gsap.TweenVars, timelineVars: gsap.TimelineVars): string {
    const sequenceWithCustomVars = new CustomVarsAppender(this.sequence).append(customVars);
    return new TimelineVarsAppender(sequenceWithCustomVars).append(timelineVars);
  }
}
