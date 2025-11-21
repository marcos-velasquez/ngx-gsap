import { PresetMatcher } from './preset-matcher';
import { PresetExpander } from './preset-expander';
import { VarsAppender } from './__shared__';
import { CustomVarsExtractor } from './custom';
import { TimelineVarsExtractor } from './timeline';
import { ScrollVarsExtractor } from './scroll';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;
  private readonly presetExpander: PresetExpander;
  private readonly customVarsExtractor: CustomVarsExtractor;
  private readonly timelineVarsExtractor: TimelineVarsExtractor;
  private readonly scrollVarsExtractor: ScrollVarsExtractor;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
    this.presetExpander = new PresetExpander(this.presetMatcher);
    this.customVarsExtractor = new CustomVarsExtractor(this.presetMatcher);
    this.timelineVarsExtractor = new TimelineVarsExtractor(this.presetMatcher);
    this.scrollVarsExtractor = new ScrollVarsExtractor(this.presetMatcher);
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    if (!this.isPreset()) return this.sequence;

    const sequence = this.presetExpander.expand();
    const customVars = this.customVarsExtractor.extract();
    const timelineVars = this.timelineVarsExtractor.extract();
    const scrollVars = this.scrollVarsExtractor.extract();

    return new VarsAppender(sequence).append(customVars, timelineVars, scrollVars);
  }
}
