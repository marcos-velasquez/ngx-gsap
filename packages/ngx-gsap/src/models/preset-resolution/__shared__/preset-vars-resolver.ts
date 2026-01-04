import { PresetMatcher } from '../preset-matcher';

type ExtractorConstructor = new (matcher: PresetMatcher) => { extract(): unknown };
type AppenderConstructor = new (sequence: string) => { append(value: unknown): string };

export class PresetVarsResolver {
  constructor(
    private readonly ExtractorClass: ExtractorConstructor,
    private readonly AppenderClass: AppenderConstructor
  ) {}

  public resolve(matcher: PresetMatcher, sequence: string): string {
    return new this.AppenderClass(sequence).append(new this.ExtractorClass(matcher).extract());
  }
}
