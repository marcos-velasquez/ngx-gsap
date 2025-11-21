import { PresetMatcher } from './preset-matcher';
import { PresetExpander } from './preset-expander';
import { PresetVarsResolverChain } from './preset-vars-resolver';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;
  private readonly presetExpander: PresetExpander;
  private readonly resolverChain: PresetVarsResolverChain;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
    this.presetExpander = new PresetExpander(this.presetMatcher);
    this.resolverChain = new PresetVarsResolverChain(this.presetMatcher);
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    if (!this.isPreset()) return this.sequence;
    return this.resolverChain.resolve(this.presetExpander.expand());
  }
}
