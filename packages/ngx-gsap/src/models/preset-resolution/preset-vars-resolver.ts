import { PresetVarsResolver } from './__shared__';
import { PresetMatcher } from './preset-matcher';
import { CustomVarsResolver } from './custom';
import { TimelineVarsResolver } from './timeline';
import { ScrollVarsResolver } from './scroll';

export class PresetVarsResolverChain {
  private readonly resolvers: PresetVarsResolver[] = [
    new CustomVarsResolver(),
    new TimelineVarsResolver(),
    new ScrollVarsResolver(),
  ];

  constructor(private readonly matcher: PresetMatcher) {}

  public resolve(sequence: string): string {
    return this.resolvers.reduce((result, resolver) => resolver.resolve(this.matcher, result), sequence);
  }
}
