import { PresetResolver } from '../__shared__';
import { ScrollVarsExtractor } from './scroll-vars-extractor';
import { ScrollVarsAppender } from './scroll-vars-appender';

export class ScrollResolver extends PresetResolver {
  constructor() {
    super(ScrollVarsExtractor, ScrollVarsAppender);
  }
}
