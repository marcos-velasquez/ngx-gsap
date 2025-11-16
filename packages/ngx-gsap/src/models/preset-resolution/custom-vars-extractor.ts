import { ObjectParser } from '../../utils';
import { TweenVars } from '../@types';
import { PresetMatcher } from './preset-matcher';

export class CustomVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): TweenVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser(argsString).parse();
    return Object.keys(params)
      .filter((key) => this.isCustomVar(key))
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as TweenVars);
  }

  private isCustomVar(key: string): boolean {
    return key !== 'timeline' && key !== 'scroll' && !this.presetMatcher.paramNames().includes(key);
  }
}
