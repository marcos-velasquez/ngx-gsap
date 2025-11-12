import { RegexPatterns } from '../models/@constants/regex-patterns';

export class TypeConverter {
  constructor(private readonly value: string) {}

  public convert(): unknown {
    const trimmed = this.value.trim();

    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (trimmed === 'null') return null;
    if (trimmed === 'undefined') return undefined;
    if (!isNaN(Number(trimmed))) return Number(trimmed);

    return trimmed.replace(RegexPatterns.QUOTED_STRING, '');
  }
}
