import { RegexPatterns } from '../models/@constants/regex-patterns';

export class TypeConverter {
  constructor(private readonly value: string) {}

  public convert(): unknown {
    const value = this.value.trim();

    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (value === 'undefined') return undefined;
    if (!isNaN(Number(value))) return Number(value);

    return value.replace(RegexPatterns.QUOTED_STRING, '');
  }
}
