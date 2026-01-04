import { PresetVarsResolver } from '../__shared__';
import { MorphSVGVarsExtractor } from './morph-svg-vars-extractor';
import { MorphSVGVarsAppender } from './morph-svg-vars-appender';

export class MorphSVGVarsResolver extends PresetVarsResolver {
  constructor() {
    super(MorphSVGVarsExtractor, MorphSVGVarsAppender);
  }
}
