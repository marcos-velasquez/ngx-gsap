import { Timeline } from '../../../timeline';
import { AnimationParserResult } from '../../animation-parser';
import { AnimationApplicator } from '../__shared__';

export class SplitTextApplicator implements AnimationApplicator {
  public apply(_timeline: Timeline, _context: AnimationParserResult): void {
    // TODO: Implementar cuando se agregue splitTextVars al AnimationParserResult
    // if (_context.splitTextVars) {
    //   _timeline.splitText(_context.splitTextVars)(_timeline.timeline);
    // }
  }
}
