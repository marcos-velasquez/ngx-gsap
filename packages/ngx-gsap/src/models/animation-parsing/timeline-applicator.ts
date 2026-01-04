import { Timeline } from '../timeline';
import { AnimationApplicator } from './__shared__';
import { AnimationParser } from './animation-parser';
import { ElementApplicator } from './element';
import { ScrollApplicator } from './scroll';
import { SplitTextApplicator } from './split-text';
import { MorphSVGApplicator } from './morph-svg';
import { TimelineApplicator } from './timeline';
import { TweenApplicator } from './tween';

export class AnimationApplicatorChain {
  private readonly applicators: AnimationApplicator[] = [
    new TweenApplicator(),
    new SplitTextApplicator(),
    new MorphSVGApplicator(),
    new TimelineApplicator(),
    new ElementApplicator(),
    new ScrollApplicator(),
  ];

  constructor(private readonly timeline: Timeline, private readonly sequence: string) {}

  public apply(): void {
    const context = new AnimationParser(this.sequence).parse();
    this.applicators.forEach((applicator) => applicator.apply(this.timeline, context));
  }
}
