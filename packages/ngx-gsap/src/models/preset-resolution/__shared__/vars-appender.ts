import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomVarsAppender } from '../custom';
import { TimelineVarsAppender } from '../timeline';
import { ScrollVarsAppender } from '../scroll';

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
