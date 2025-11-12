import { gsap } from 'gsap';
import { ObjectParser } from '../../utils';
import { PresetMatcher } from './preset-matcher';

export class CustomVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TweenVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser(argsString).parse();
    return Object.keys(params).reduce((acc, key) => {
      if (!this.presetMatcher.paramNames().includes(key)) acc[key] = params[key];
      return acc;
    }, {} as gsap.TweenVars);
  }
}
