import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GsapPlugins } from '../../models/plugins';
import { NGX_GSAP_CONFIG, provideNgxGsap } from '../ngx-gsap.config';

describe('provideNgxGsap()', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should respect reduced motion when nothing is provided', () => {
    expect(TestBed.inject(NGX_GSAP_CONFIG)).toEqual({ reducedMotion: 'respect', plugins: {} });
  });

  it('should merge the given config over the defaults', () => {
    TestBed.configureTestingModule({ providers: [provideNgxGsap({ reducedMotion: 'ignore' })] });
    expect(TestBed.inject(NGX_GSAP_CONFIG)).toEqual({ reducedMotion: 'ignore', plugins: {} });
  });

  it('should register the given plugins up front in the browser', () => {
    const register = jest.spyOn(GsapPlugins, 'register');
    TestBed.configureTestingModule({ providers: [provideNgxGsap({ plugins: { scrollTrigger: ScrollTrigger } })] });

    TestBed.inject(NGX_GSAP_CONFIG);

    expect(register).toHaveBeenCalledWith({ scrollTrigger: ScrollTrigger });
  });

  it('should not register plugins on the server', () => {
    const register = jest.spyOn(GsapPlugins, 'register');
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        provideNgxGsap({ plugins: { scrollTrigger: ScrollTrigger } }),
      ],
    });

    TestBed.inject(NGX_GSAP_CONFIG);

    expect(register).not.toHaveBeenCalled();
  });
});
