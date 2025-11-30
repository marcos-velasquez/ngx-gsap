import { gsap } from 'gsap';
import { TypeChecker } from '../../../../utils';
import { TweenMethod } from '../__utils__/tween-method';

export type MethodVars = { to?: gsap.TweenVars; from?: gsap.TweenVars; set?: gsap.TweenVars };

export class MethodVarsExtractor {
  constructor(private readonly params: Record<string, unknown>) {}

  public extract(): MethodVars {
    if (!TweenMethod.existsIn(this.params)) return {};

    return TweenMethod.all()
      .filter((method) => new TypeChecker(this.params[method]).isObject())
      .reduce((result, method) => {
        result[method] = this.params[method] as gsap.TweenVars;
        return result;
      }, {} as MethodVars);
  }
}
