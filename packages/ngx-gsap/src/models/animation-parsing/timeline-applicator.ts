import { Timeline } from '../timeline';
import { AnimationParser } from './animation-parser';
import * as _ from './applicators';

export class AnimationApplicatorChain {
  private readonly applicators: _.AnimationApplicator[] = [
    new _.TimelineConfigApplicator(),
    new _.TweenApplicator(),
    new _.ScrollApplicator(),
    new _.SplitTextApplicator(),
  ];

  constructor(private readonly timeline: Timeline, private readonly sequence: string) {}

  public apply(): void {
    const context = new AnimationParser(this.sequence).parse();
    this.applicators.forEach((applicator) => applicator.apply(this.timeline, context));
  }
}
