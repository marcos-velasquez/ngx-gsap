import { gsap } from 'gsap';

export class GlobalVarsExtractor {
  private static readonly EXCLUDED_KEYS = ['timeline', 'scroll', 'splitText', 'element', 'to', 'from', 'set'];

  constructor(private readonly params: Record<string, unknown>, private readonly presetParamNames: string[]) {}

  public extract(): gsap.TweenVars {
    return Object.keys(this.params)
      .filter((key) => this.isCustomVar(key))
      .reduce((acc, key) => ((acc[key] = this.params[key]), acc), {} as gsap.TweenVars);
  }

  private isCustomVar(key: string): boolean {
    return !GlobalVarsExtractor.EXCLUDED_KEYS.includes(key) && !this.presetParamNames.includes(key);
  }
}
