import { Timeline } from '../../../timeline';
import { AnimationParserResult } from '../../animation-parser';

export interface AnimationApplicator {
  apply(timeline: Timeline, context: AnimationParserResult): void;
}
