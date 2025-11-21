import { SplitText } from 'gsap/SplitText';
import { RegexPatterns } from '../../@constants';
import { PropsExtractor } from '../__shared__';

export class SplitTextPropsExtractor extends PropsExtractor<SplitText.Vars> {
  constructor(sequence: string) {
    super(sequence, RegexPatterns.SPLIT_TEXT_PROPS);
  }
}
