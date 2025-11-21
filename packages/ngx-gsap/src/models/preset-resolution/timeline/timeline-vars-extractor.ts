import { gsap } from 'gsap';
import { PresetMatcher } from '../preset-matcher';
import { PresetVarsExtractor } from '../__shared__';

export class TimelineVarsExtractor extends PresetVarsExtractor<gsap.TimelineVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'timeline');
  }
}
