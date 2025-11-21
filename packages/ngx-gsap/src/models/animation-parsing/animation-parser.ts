import { assert } from '../../utils';
import { PresetResolver } from '../preset-resolution/preset-resolver';

export type AnimationParserResult = { sequence: string; sequences: string[] };

export class AnimationParser {
  public static readonly DELIMITER = ';';

  private readonly sequences: string[];

  constructor(sequence: string) {
    assert(!!sequence?.trim(), 'Sequence is required');

    const parts = sequence.trim().split(AnimationParser.DELIMITER);
    this.sequences = parts.flatMap((part) =>
      new PresetResolver(part.trim()).resolve().split(AnimationParser.DELIMITER)
    );
  }

  public parse(): AnimationParserResult {
    return { sequence: this.sequences.join(AnimationParser.DELIMITER), sequences: this.sequences };
  }
}
