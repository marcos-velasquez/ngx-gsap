import { TypeSerializer } from '../../../../utils';
import { TweenMethod } from './tween-method';

export class TweenVars {
  private static readonly EXCLUDED_KEYS: readonly string[] = ['timeline', 'scroll', 'splitText', 'element'] as const;

  public static excludedKeys(): readonly string[] {
    return TweenVars.EXCLUDED_KEYS;
  }

  public static filter<T>(entries: [string, T][]): [string, T][] {
    return entries.filter(([key]) => !TweenMethod.isMethod(key));
  }

  public static extract(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.entries(obj)
      .filter(([key]) => !TweenMethod.isMethod(key))
      .reduce((acc, [key, value]) => ((acc[key] = value), acc), {} as Record<string, unknown>);
  }

  public static serialize(vars: Record<string, unknown>): string {
    return Object.entries(vars)
      .map(([k, v]) => `${k}=${new TypeSerializer(v, { quoteStrings: false }).serialize()}`)
      .join(',');
  }

  public static stringify(obj: Record<string, unknown>): string {
    return TweenVars.serialize(TweenVars.extract(obj));
  }
}
