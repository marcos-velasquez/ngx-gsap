import { PresetMatcher } from '../preset-matcher';

export interface PresetResolver {
  resolve(matcher: PresetMatcher, sequence: string): string;
}
