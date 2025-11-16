import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomVarsAppender } from './custom-vars-appender';
import { TimelineVarsAppender } from './timeline-vars-appender';
import { ScrollVarsAppender } from './scroll-vars-appender';

export class VarsAppender {
  constructor(private readonly sequence: string) {}

  public append(
    customVars: gsap.TweenVars,
    timelineVars: gsap.TimelineVars,
    scrollVars: ScrollTrigger.StaticVars
  ): string {
    const sequenceWithCustomVars = new CustomVarsAppender(this.sequence).append(customVars);
    const sequenceWithTimelineVars = new TimelineVarsAppender(sequenceWithCustomVars).append(timelineVars);
    return new ScrollVarsAppender(sequenceWithTimelineVars).append(scrollVars);
  }
}
