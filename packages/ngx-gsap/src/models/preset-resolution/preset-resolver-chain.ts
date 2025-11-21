import { PresetMatcher } from './preset-matcher';
import { PresetResolver } from './__shared__';
import { CustomResolver } from './custom';
import { TimelineResolver } from './timeline';
import { ScrollResolver } from './scroll';

export class PresetResolverChain {
  private readonly resolvers: PresetResolver[] = [new CustomResolver(), new TimelineResolver(), new ScrollResolver()];

  public resolve(matcher: PresetMatcher, sequence: string): string {
    return this.resolvers.reduce((result, resolver) => resolver.resolve(matcher, result), sequence);
  }
}
