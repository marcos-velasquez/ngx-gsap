import { TypeSerializer } from '../../../utils';

export abstract class PresetVarsAppender<T extends object = object> {
  constructor(
    private readonly sequence: string,
    private readonly prefix: string,
    private readonly regexPattern: RegExp
  ) {}

  public append(vars: T): string {
    if (Object.keys(vars as object).length === 0) return this.sequence;

    const varsString = Object.entries(vars as object)
      .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
      .join(',');

    const declaration = `${this.prefix}@${varsString}`;

    if (this.regexPattern.test(this.sequence)) {
      return this.sequence.replace(this.regexPattern, declaration);
    }

    return `${declaration};${this.sequence}`;
  }
}
