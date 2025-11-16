import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ObjectParser } from '../../utils';
import { PresetMatcher } from './preset-matcher';

export class ScrollVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): ScrollTrigger.StaticVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser(argsString).parse();
    return (params['scrollTrigger'] as ScrollTrigger.StaticVars) || {};
  }
}
