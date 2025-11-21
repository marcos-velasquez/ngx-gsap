import { PresetMatcher } from '../preset-matcher';

type Extractor = { extract(): unknown };
type Appender = { append(vars: unknown): string };

type ExtractorConstructor = new (matcher: PresetMatcher, ...args: unknown[]) => Extractor;
type AppenderConstructor = new (sequence: string, ...args: unknown[]) => Appender;

export class PresetResolver {
  constructor(
    private readonly ExtractorClass: ExtractorConstructor,
    private readonly AppenderClass: AppenderConstructor
  ) {}

  public resolve(matcher: PresetMatcher, sequence: string): string {
    return new this.AppenderClass(sequence).append(new this.ExtractorClass(matcher).extract());
  }
}
