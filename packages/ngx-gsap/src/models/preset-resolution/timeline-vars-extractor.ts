import { gsap } from 'gsap';
import { PresetMatcher } from './preset-matcher';
import { PresetVarsExtractor } from './preset-vars-extractor';

export class TimelineVarsExtractor extends PresetVarsExtractor<gsap.TimelineVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'timeline');
  }
}
