export class TextPresets {
  /**
   * Screen reader animation - words fade in sequentially with stagger.
   * Uses SplitText to animate words individually.
   * @param opacity - Starting opacity (default: 0)
   * @param duration - Animation duration (default: 2)
   * @param stagger - Delay between each word (default: 0.1)
   * @example screenReader() // Default screen reader effect
   * @example screenReader({ stagger: 0.2 }) // Slower stagger
   * @example screenReader({ duration: 1, stagger: 0.05 }) // Faster animation
   */
  public static screenReader({ opacity = 0, duration = 2, stagger = 0.1 } = {}): string {
    return `from:opacity:${opacity}@splitText={target:"words"},duration=${duration},ease=sine.out,stagger=${stagger}`;
  }
}
