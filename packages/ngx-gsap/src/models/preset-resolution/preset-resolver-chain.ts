import { PresetResolver } from './__shared__';
import { PresetMatcher } from './preset-matcher';
import { CustomResolver } from './custom';
import { TimelineResolver } from './timeline';
import { ScrollResolver } from './scroll';

export class PresetResolverChain {
  private readonly resolvers: PresetResolver[] = [new CustomResolver(), new TimelineResolver(), new ScrollResolver()];

  constructor(private readonly matcher: PresetMatcher) {}

  public resolve(sequence: string): string {
    return this.resolvers.reduce((result, resolver) => resolver.resolve(this.matcher, result), sequence);
  }
}
