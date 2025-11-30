import { PresetVarsResolver } from '../__utils__';
import { SplitTextVarsExtractor } from './split-text-vars-extractor';
import { SplitTextVarsAppender } from './split-text-vars-appender';

export class SplitTextVarsResolver extends PresetVarsResolver {
  constructor() {
    super(SplitTextVarsExtractor, SplitTextVarsAppender);
  }
}
