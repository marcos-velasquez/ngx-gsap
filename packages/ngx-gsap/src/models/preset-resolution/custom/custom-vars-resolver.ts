import { PresetVarsResolver } from '../__shared__';
import { CustomVarsExtractor } from './custom-vars-extractor';
import { CustomVarsAppender } from './custom-vars-appender';

export class CustomVarsResolver extends PresetVarsResolver {
  constructor() {
    super(CustomVarsExtractor, CustomVarsAppender);
  }
}
