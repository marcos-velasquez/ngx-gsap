import { PresetVarsResolver } from '../__utils__';
import { ElementVarsExtractor } from './element-vars-extractor';
import { ElementVarsAppender } from './element-vars-appender';

export class ElementVarsResolver extends PresetVarsResolver {
  constructor() {
    super(ElementVarsExtractor, ElementVarsAppender);
  }
}
