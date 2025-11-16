import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type TimelineVars = gsap.TimelineVars;
export type TweenVars = gsap.TweenVars;
export type ScrollTriggerVars = ScrollTrigger.StaticVars;
export type AnimationVars = TweenVars | TimelineVars | ScrollTriggerVars;
