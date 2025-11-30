export type TweenMethodType = 'to' | 'from' | 'set';

export class TweenMethod {
  private static readonly METHODS: readonly TweenMethodType[] = ['to', 'from', 'set'] as const;

  public static all(): readonly TweenMethodType[] {
    return TweenMethod.METHODS;
  }

  public static isMethod(key: string): key is TweenMethodType {
    return key === 'to' || key === 'from' || key === 'set';
  }

  public static parse(sequence: string): TweenMethodType {
    if (sequence.startsWith('to:')) return 'to';
    if (sequence.startsWith('set:')) return 'set';
    return 'from';
  }

  public static existsIn(obj: Record<string, unknown>): boolean {
    return TweenMethod.METHODS.some((method) => method in obj);
  }

  public static filter<T>(entries: [string, T][]): [string, T][] {
    return entries.filter(([key]) => !TweenMethod.isMethod(key));
  }
}
