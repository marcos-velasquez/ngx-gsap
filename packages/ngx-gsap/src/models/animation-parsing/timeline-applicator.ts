import { Timeline } from '../timeline';
import { GsapPlugins } from '../plugins';
import { AnimationApplicator } from './__shared__';
import { AnimationParser, AnimationParserResult } from './animation-parser';
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

  private readonly context: AnimationParserResult;

  constructor(private readonly timeline: Timeline, sequence: string) {
    this.context = new AnimationParser(sequence).parse();
  }

  public pluginsToLoad(): Promise<void> | null {
    return GsapPlugins.load(GsapPlugins.needs(this.context.sequence, this.timeline.isScroll().evaluate()));
  }

  public apply(): void {
    this.applicators.forEach((applicator) => applicator.apply(this.timeline, this.context));
  }
}
