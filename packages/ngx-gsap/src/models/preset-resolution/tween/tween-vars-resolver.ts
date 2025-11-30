import { PresetVarsResolver } from '../__utils__';
import { TweenVarsExtractor } from './tween-vars-extractor';
import { TweenVarsAppender } from './tween-vars-appender';

export class TweenVarsResolver extends PresetVarsResolver {
  constructor() {
    super(TweenVarsExtractor, TweenVarsAppender);
  }
}
