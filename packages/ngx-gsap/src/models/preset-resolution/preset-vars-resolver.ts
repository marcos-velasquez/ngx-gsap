import { PresetVarsResolver } from './__shared__';
import { PresetMatcher } from './preset-matcher';
import { TweenVarsResolver } from './tween';
import { ElementVarsResolver } from './element';
import { TimelineVarsResolver } from './timeline';
import { ScrollVarsResolver } from './scroll';
import { SplitTextVarsResolver } from './split-text';
import { MorphSVGVarsResolver } from './morph-svg';

export class PresetVarsResolverChain {
  private readonly resolvers: PresetVarsResolver[] = [
    new TweenVarsResolver(),
    new ElementVarsResolver(),
    new TimelineVarsResolver(),
    new ScrollVarsResolver(),
    new SplitTextVarsResolver(),
    new MorphSVGVarsResolver(),
  ];

  constructor(private readonly matcher: PresetMatcher) {}

  public resolve(sequence: string): string {
    return this.resolvers.reduce((result, resolver) => resolver.resolve(this.matcher, result), sequence);
  }
}
