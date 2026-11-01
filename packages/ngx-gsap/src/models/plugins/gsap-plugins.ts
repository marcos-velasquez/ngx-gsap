import { gsap } from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SplitText } from 'gsap/SplitText';
import type { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { RegexPatterns } from '../@constants';

export type NgxGsapPlugins = {
  scrollTrigger?: typeof ScrollTrigger;
  splitText?: typeof SplitText;
  morphSVG?: typeof MorphSVGPlugin;
};

export type PluginNeeds = { scrollTrigger: boolean; splitText: boolean; morphSVG: boolean };

/* Loaded the first time a sequence needs them, so an app that only fades things in never downloads
   them. `provideNgxGsap({ plugins })` registers them up front instead. */
export class GsapPlugins {
  private static scrollTrigger?: typeof ScrollTrigger;
  private static splitText?: typeof SplitText;
  private static morphSVG?: typeof MorphSVGPlugin;

  public static needs(sequence: string, scroll: boolean): PluginNeeds {
    return {
      scrollTrigger: scroll,
      splitText: RegexPatterns.SPLIT_TEXT_PROPS.test(sequence),
      morphSVG: RegexPatterns.MORPH_SVG_PROPS.test(sequence),
    };
  }

  public static register(plugins: NgxGsapPlugins): void {
    const { scrollTrigger, splitText, morphSVG } = plugins;
    if (scrollTrigger) gsap.registerPlugin((GsapPlugins.scrollTrigger = scrollTrigger));
    if (splitText) gsap.registerPlugin((GsapPlugins.splitText = splitText));
    if (morphSVG) gsap.registerPlugin((GsapPlugins.morphSVG = morphSVG));
  }

  /* Null when nothing is missing, so the caller can stay synchronous. */
  public static load(needs: PluginNeeds): Promise<void> | null {
    const pending = [
      needs.scrollTrigger && !GsapPlugins.scrollTrigger
        ? import('gsap/ScrollTrigger').then((m) => GsapPlugins.register({ scrollTrigger: m.ScrollTrigger }))
        : null,
      needs.splitText && !GsapPlugins.splitText
        ? import('gsap/SplitText').then((m) => GsapPlugins.register({ splitText: m.SplitText }))
        : null,
      needs.morphSVG && !GsapPlugins.morphSVG
        ? import('gsap/MorphSVGPlugin').then((m) => GsapPlugins.register({ morphSVG: m.MorphSVGPlugin }))
        : null,
    ].filter((load): load is Promise<void> => load !== null);

    return pending.length ? Promise.all(pending).then(() => undefined) : null;
  }

  public static get ScrollTrigger(): typeof ScrollTrigger {
    return GsapPlugins.loaded(GsapPlugins.scrollTrigger, 'ScrollTrigger');
  }

  public static get SplitText(): typeof SplitText {
    return GsapPlugins.loaded(GsapPlugins.splitText, 'SplitText');
  }

  private static loaded<T>(plugin: T | undefined, name: string): T {
    if (!plugin) throw new Error(`${name} is not loaded`);
    return plugin;
  }
}
