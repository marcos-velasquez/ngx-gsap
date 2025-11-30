import { gsap } from 'gsap';
import { ObjectParser } from '../../../utils';
import { PresetMatcher } from '../preset-matcher';
import { MethodVarsExtractor, GlobalVarsExtractor, type MethodVars } from './extractors';

export type { MethodVars };

export class TweenVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TweenVars | MethodVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser(argsString).parse();
    const globalVars = new GlobalVarsExtractor(params, this.presetMatcher.paramNames()).extract();
    const methodVars = new MethodVarsExtractor(params).extract();

    return { ...globalVars, ...methodVars };
  }
}
