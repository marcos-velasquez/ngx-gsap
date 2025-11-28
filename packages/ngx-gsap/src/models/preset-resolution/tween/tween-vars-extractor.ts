import { gsap } from 'gsap';
import { ObjectParser } from '../../../utils';
import { PresetMatcher } from '../preset-matcher';

export class TweenVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TweenVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser(argsString).parse();
    return Object.keys(params)
      .filter((key) => this.isCustomVar(key))
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as gsap.TweenVars);
  }

  private isCustomVar(key: string): boolean {
    return (
      // TODO: This is a temporary solution to avoid extracting timeline, scroll, splitText, and element vars
      key !== 'timeline' &&
      key !== 'scroll' &&
      key !== 'splitText' &&
      key !== 'element' &&
      !this.presetMatcher.paramNames().includes(key)
    );
  }
}
