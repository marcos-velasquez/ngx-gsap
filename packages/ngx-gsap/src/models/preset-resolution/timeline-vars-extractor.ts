import { gsap } from 'gsap';
import { ObjectParser } from '../../utils';
import { PresetMatcher } from './preset-matcher';

export class TimelineVarsExtractor {
  constructor(private readonly presetMatcher: PresetMatcher) {}

  public extract(): gsap.TimelineVars {
    if (!this.presetMatcher.isFunction()) return {};

    const { argsString, hasArgs } = this.presetMatcher.asPresetMatch();
    if (!hasArgs) return {};

    const params = new ObjectParser(argsString).parse();
    return (params['timeline'] as gsap.TimelineVars) || {};
  }
}
