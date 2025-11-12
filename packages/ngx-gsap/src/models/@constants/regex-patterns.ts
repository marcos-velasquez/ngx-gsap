import { Animation } from './animation';

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
   * Matches quoted strings (single or double quotes)
   * Used to remove quotes from string values
   */
  public static readonly QUOTED_STRING = /^['"]|['"]$/g;

  /**
   * Sequence delimiter
   */
  public static readonly SEQUENCE_DELIMITER = new RegExp(Animation.DELIMITER);

  /**
   * Matches timeline properties syntax: timeline@props
   * Example: "timeline@repeat=3,yoyo=true"
   * Groups: [1] = props string
   */
  public static readonly TIMELINE_PROPS = /timeline@([^;]+)/;
}
