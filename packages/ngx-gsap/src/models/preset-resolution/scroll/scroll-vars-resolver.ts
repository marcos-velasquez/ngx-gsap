import { PresetVarsResolver } from '../__utils__';
import { ScrollVarsExtractor } from './scroll-vars-extractor';
import { ScrollVarsAppender } from './scroll-vars-appender';

export class ScrollVarsResolver extends PresetVarsResolver {
  constructor() {
    super(ScrollVarsExtractor, ScrollVarsAppender);
  }
}
