import { PresetResolver } from '../__shared__';
import { CustomVarsExtractor } from './custom-vars-extractor';
import { CustomVarsAppender } from './custom-vars-appender';

export class CustomResolver extends PresetResolver {
  constructor() {
    super(CustomVarsExtractor, CustomVarsAppender);
  }
}
