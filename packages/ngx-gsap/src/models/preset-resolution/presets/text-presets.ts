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

  /**
   * Slide reveal animation - characters slide in with fade and stagger.
   * Uses SplitText to animate characters individually from a specified direction.
   * @param axis - Animation axis: 'x' for horizontal, 'y' for vertical (default: 'x')
   * @param distance - Starting distance in pixels (default: '0')
   * @param stagger - Delay between each character (default: 0.04)
   * @param duration - Animation duration (default: 0.7)
   * @example slideReveal({ axis: 'x', distance: '150' }) // Slide from right
   * @example slideReveal({ axis: 'x', distance: '-150' }) // Slide from left
   * @example slideReveal({ axis: 'y', distance: '150' }) // Slide from bottom
   * @example slideReveal({ axis: 'y', distance: '-150', stagger: 0.02 }) // Slide from top, faster
   */
  public static slideReveal({ axis = 'x', distance = '0', stagger = 0.04, duration = 0.7 } = {}): string {
    const property = axis === 'y' ? `y` : `x`;
    return `set:${property}:${distance};set:opacity:0;to:${property}:0:0@ease=power4,duration=${duration},stagger=${stagger},opacity=1;splitText@type="chars",target="chars"`;
  }
}
