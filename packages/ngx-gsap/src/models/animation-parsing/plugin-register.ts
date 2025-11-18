import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

export class PluginRegister {
  public register() {
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
  }
}

export const pluginRegister = new PluginRegister();
