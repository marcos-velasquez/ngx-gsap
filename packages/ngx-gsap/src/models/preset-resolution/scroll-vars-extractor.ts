import { ScrollTriggerVars } from '../@types';
import { PresetMatcher } from './preset-matcher';
import { PresetVarsExtractor } from './preset-vars-extractor';

export class ScrollVarsExtractor extends PresetVarsExtractor<ScrollTriggerVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'scrollTrigger');
  }
}
