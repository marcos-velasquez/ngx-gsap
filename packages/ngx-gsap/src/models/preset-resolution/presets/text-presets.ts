export class TextPresets {
  /**
   * Screen reader animation - words fade in sequentially with stagger.
   * Uses SplitText to animate words individually.
   * @param opacity - Starting opacity (default: 0)
   * @param stagger - Delay between each word (default: 0.1)
   * @example screenReader() // Default screen reader effect
   * @example screenReader({ stagger: 0.2 }) // Slower stagger
   * @example screenReader({ opacity: 0.5, stagger: 0.05 }) // Faster animation
   */
  public static screenReader({ opacity = 0, stagger = 0.1 } = {}): string {
    return `set:perspective:500;set:opacity:${opacity};to:opacity:1@ease=sine.out,stagger=${stagger};splitText@type="words",target="words"`;
  }
}
