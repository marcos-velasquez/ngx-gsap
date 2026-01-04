import { Timeline } from '../../../timeline';

export class TimelineMockBuilder {
  public static mock(options: { isScroll?: boolean } = {}): jest.Mocked<Timeline> {
    const { isScroll = false } = options;

    return {
      configure: jest.fn(),
      to: jest.fn(),
      from: jest.fn(),
      set: jest.fn(),
      isScroll: jest.fn().mockReturnValue({
        whenTrue: jest.fn((callback: () => void) => (isScroll ? callback() : undefined)),
      }),
      scroll: jest.fn(),
      splitText: jest.fn(),
      morphSVG: jest.fn(),
    } as unknown as jest.Mocked<Timeline>;
  }
}
