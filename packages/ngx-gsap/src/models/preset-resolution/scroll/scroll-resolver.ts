import { PresetMatcher } from '../preset-matcher';
import { PresetResolver } from '../__shared__';
import { ScrollVarsExtractor } from './scroll-vars-extractor';
import { ScrollVarsAppender } from './scroll-vars-appender';

export class ScrollResolver implements PresetResolver {
  public resolve(matcher: PresetMatcher, sequence: string): string {
    const scrollVars = new ScrollVarsExtractor(matcher).extract();
    return new ScrollVarsAppender(sequence).append(scrollVars);
  }
}
