import { AnimationParser } from '../../animation-parser';
import { TweenPropsExtractor } from '../../tween';

/**
 * Helper function to parse animations from AnimationParser result
 */
export const parseAnimations = (result: ReturnType<AnimationParser['parse']>) => {
  return result.sequences.map((s) => new TweenPropsExtractor(s).parse()).filter((anim) => anim !== null);
};
