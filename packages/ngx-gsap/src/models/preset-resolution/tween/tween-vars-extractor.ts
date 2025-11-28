import { gsap } from 'gsap';
import { ObjectParser } from '../../../utils';
import { PresetMatcher } from '../preset-matcher';

type MethodVars = { to?: gsap.TweenVars; from?: gsap.TweenVars; set?: gsap.TweenVars };

export class TweenVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TweenVars | MethodVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser(argsString).parse();

    // Check if user is using method-specific vars (to, from, set)
    if (this.hasMethodSpecificVars(params)) {
      return this.extractMethodSpecificVars(params);
    }

    // Otherwise, extract custom vars as before
    return Object.keys(params)
      .filter((key) => this.isCustomVar(key))
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as gsap.TweenVars);
  }

  private hasMethodSpecificVars(params: Record<string, unknown>): boolean {
    return 'to' in params || 'from' in params || 'set' in params;
  }

  private extractMethodSpecificVars(params: Record<string, unknown>): MethodVars {
    const result: MethodVars = {};
    if (params['to'] && typeof params['to'] === 'object') result.to = params['to'] as gsap.TweenVars;
    if (params['from'] && typeof params['from'] === 'object') result.from = params['from'] as gsap.TweenVars;
    if (params['set'] && typeof params['set'] === 'object') result.set = params['set'] as gsap.TweenVars;
    return result;
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
