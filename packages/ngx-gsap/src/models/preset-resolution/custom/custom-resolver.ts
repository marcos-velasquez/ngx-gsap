import { PresetMatcher } from '../preset-matcher';
import { PresetResolver } from '../__shared__';
import { CustomVarsExtractor } from './custom-vars-extractor';
import { CustomVarsAppender } from './custom-vars-appender';

export class CustomResolver implements PresetResolver {
  public resolve(matcher: PresetMatcher, sequence: string): string {
    const customVars = new CustomVarsExtractor(matcher).extract();
    return new CustomVarsAppender(sequence).append(customVars);
  }
}
