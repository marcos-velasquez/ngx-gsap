import { PresetMatcher } from './preset-matcher';
import { PresetExpander } from './preset-expander';
import { CustomVarsExtractor } from './custom-vars-extractor';
import { TimelineVarsExtractor } from './timeline-vars-extractor';
import { VarsAppender } from './vars-appender';

export class PresetResolver {
  private readonly presetMatcher: PresetMatcher;
  private readonly presetExpander: PresetExpander;
  private readonly customVarsExtractor: CustomVarsExtractor;
  private readonly timelineVarsExtractor: TimelineVarsExtractor;

  constructor(private readonly sequence: string) {
    this.presetMatcher = new PresetMatcher(sequence);
    this.presetExpander = new PresetExpander(this.presetMatcher);
    this.customVarsExtractor = new CustomVarsExtractor(this.presetMatcher);
    this.timelineVarsExtractor = new TimelineVarsExtractor(this.presetMatcher);
  }

  public isPreset(): boolean {
    return this.presetMatcher.isPreset();
  }

  public resolve(): string {
    if (!this.isPreset()) return this.sequence;

    const sequence = this.presetExpander.expand();
    const customVars = this.customVarsExtractor.extract();
    const timelineVars = this.timelineVarsExtractor.extract();

    return new VarsAppender(sequence).append(customVars, timelineVars);
  }
}
