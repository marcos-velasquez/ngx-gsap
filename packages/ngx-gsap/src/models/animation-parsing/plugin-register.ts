import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { SplitText } from 'gsap/SplitText';

export class PluginRegister {
  public register() {
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, SplitText);
  }
}

export const pluginRegister = new PluginRegister();
