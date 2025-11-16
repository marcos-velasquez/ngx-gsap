import { TimelineVars } from '../@types';
import { PresetMatcher } from './preset-matcher';
import { PresetVarsExtractor } from './preset-vars-extractor';

export class TimelineVarsExtractor extends PresetVarsExtractor<TimelineVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'timeline');
  }
}
