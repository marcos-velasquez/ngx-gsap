import { PresetVarsResolver } from './__shared__';
import { PresetMatcher } from './preset-matcher';
import { CustomVarsResolver } from './custom';
import { ElementVarsResolver } from './element';
import { TimelineVarsResolver } from './timeline';
import { ScrollVarsResolver } from './scroll';
import { SplitTextVarsResolver } from './split-text';

export class PresetVarsResolverChain {
  private readonly resolvers: PresetVarsResolver[] = [
    new CustomVarsResolver(),
    new ElementVarsResolver(),
    new TimelineVarsResolver(),
    new ScrollVarsResolver(),
    new SplitTextVarsResolver(),
  ];

  constructor(private readonly matcher: PresetMatcher) {}

  public resolve(sequence: string): string {
    return this.resolvers.reduce((result, resolver) => resolver.resolve(this.matcher, result), sequence);
  }
}
