import { ObjectParser } from '../../../utils';
import { PresetMatcher } from '../preset-matcher';

export abstract class PresetVarsExtractor<T = Record<string, unknown>> {
  constructor(private readonly presetMatcher: PresetMatcher, private readonly propertyKey: string) {}

  public extract(): T {
    if (!this.presetMatcher.isFunction()) return {} as T;

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {} as T;

    const params = new ObjectParser(argsString).parse();
    return (params[this.propertyKey] as T) || ({} as T);
  }
}
