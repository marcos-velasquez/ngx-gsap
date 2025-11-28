/**
 * Centralized regex patterns used across the application
 */
export class RegexPatterns {
  /**
   * Matches preset function syntax: presetName(args)
   * Example: "fadeIn({ x: 100 })"
   * Groups: [1] = presetName, [2] = args
   */
  public static readonly PRESET_FUNCTION = /^(\w+)\s*\((.*)\)$/;

  /**
   * Matches animation sequence syntax: [method:]prop:value[:position][@props]
   * Example: "to:x:100%:>@duration=2" or "set:scale:0"
   * Groups: [1] = method, [2] = prop, [3] = value, [4] = position, [5] = props
   */
  public static readonly ANIMATION_SEQUENCE = /^(?:(to|from|set):)?([^:]+):([^:@;]+)(?::([^@;]+))?(?:@([^;]+))?$/;

  /**
   * Matches destructured parameters in function string
   * Example: "({ x, y = 0, duration = 2 })" → "x, y = 0, duration = 2"
   * Groups: [1] = parameters string
   */
  public static readonly DESTRUCTURED_PARAMS = /\{([^}]+)\}/;

  /**
   * Matches timeline properties syntax: timeline@props
   * Example: "timeline@repeat=3,yoyo=true"
   * Groups: [1] = props string
   */
  public static readonly TIMELINE_PROPS = /timeline@([^;]+)/;

  /**
   * Matches scroll trigger properties syntax: scroll@props
   * Example: "scroll@start='top center',scrub=true"
   * Groups: [1] = props string
   */
  public static readonly SCROLL_PROPS = /scroll@([^;]+)/;

  /**
   * Matches split text properties syntax: splitText@props
   * Example: "splitText@type='chars,words',charsClass='char'"
   * Groups: [1] = props string
   */
  public static readonly SPLIT_TEXT_PROPS = /splitText@([^;]+)/;

  /**
   * Matches element properties syntax: element@props
   * Example: "element@perspective=500,transformOrigin='50% 50%'"
   * Groups: [1] = props string
   */
  public static readonly ELEMENT_PROPS = /element@([^;]+)/;
}
