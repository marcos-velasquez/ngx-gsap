import { ObjectParser } from '../../utils';
import { Presets } from './presets';
import { PresetMatcher } from './preset-matcher';

export class PresetExpander {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public expand(): string {
    if (!this.presetMatcher.isFunction()) return Presets.invoke(this.presetMatcher.sequence);

    const { presetName, argsString } = this.presetMatcher.asPresetMatch();
    return Presets.invoke(presetName, new ObjectParser(argsString).parse());
  }
}
