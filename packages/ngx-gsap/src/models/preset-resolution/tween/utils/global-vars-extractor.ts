import { gsap } from 'gsap';

export class GlobalVarsExtractor {
  private readonly excludedKeys = ['timeline', 'scroll', 'splitText', 'element'];

  constructor(private readonly params: Record<string, unknown>, private readonly presetParamNames: string[]) {}

  public extract(): gsap.TweenVars {
    return Object.keys(this.params)
      .filter((key) => this.isCustomVar(key))
      .reduce((acc, key) => ((acc[key] = this.params[key]), acc), {} as gsap.TweenVars);
  }

  private isCustomVar(key: string): boolean {
    return !this.excludedKeys.includes(key) && !this.presetParamNames.includes(key);
  }
}
