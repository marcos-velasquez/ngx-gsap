import { gsap } from 'gsap';
import { TypeChecker } from '../../../../utils';

export type MethodVars = { to?: gsap.TweenVars; from?: gsap.TweenVars; set?: gsap.TweenVars };

export class MethodVarsExtractor {
  private static readonly METHODS = ['to', 'from', 'set'] as const;

  constructor(private readonly params: Record<string, unknown>) {}

  public extract(): MethodVars {
    if (!this.isPresent()) return {};

    return MethodVarsExtractor.METHODS.filter((method) => new TypeChecker(this.params[method]).isObject()).reduce(
      (result, method) => {
        result[method] = this.params[method] as gsap.TweenVars;
        return result;
      },
      {} as MethodVars
    );
  }

  private isPresent(): boolean {
    return MethodVarsExtractor.METHODS.some((method) => method in this.params);
  }
}
