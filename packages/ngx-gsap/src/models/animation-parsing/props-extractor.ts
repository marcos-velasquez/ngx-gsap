import { PropsParser } from './props-parser';

export abstract class PropsExtractor<T> {
  constructor(private readonly sequence: string, private readonly pattern: RegExp) {}

  public extract(): T {
    const match = this.sequence.match(this.pattern);
    if (!match) return {} as T;

    return new PropsParser(match[1]).parse() as T;
  }
}
