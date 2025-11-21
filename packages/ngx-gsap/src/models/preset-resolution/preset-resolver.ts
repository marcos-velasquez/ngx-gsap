import { PresetMatcher } from './preset-matcher';
import { PresetExpander } from './preset-expander';
import { PresetResolverChain } from './preset-resolver-chain';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;
  private readonly presetExpander: PresetExpander;
  private readonly resolverChain: PresetResolverChain;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
    this.presetExpander = new PresetExpander(this.presetMatcher);
    this.resolverChain = new PresetResolverChain();
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    if (!this.isPreset()) return this.sequence;

    const expandedSequence = this.presetExpander.expand();
    return this.resolverChain.resolve(this.presetMatcher, expandedSequence);
  }
}
