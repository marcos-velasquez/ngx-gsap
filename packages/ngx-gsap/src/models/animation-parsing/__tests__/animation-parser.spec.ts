import { AnimationParser } from '../animation-parser';

describe('AnimationParser', () => {
  describe('Sequence parsing', () => {
    it('should return joined sequence and individual sequences', () => {
      const result = new AnimationParser('to:x:100:>;to:y:50:>').parse();
      expect(result.sequence).toBe('to:x:100:>;to:y:50:>');
      expect(result.sequences).toEqual(['to:x:100:>', 'to:y:50:>']);
    });

    it('should resolve presets and return expanded sequences', () => {
      const result = new AnimationParser('fadeIn').parse();
      expect(result.sequences.length).toBeGreaterThan(0);
      expect(result.sequence).toContain('opacity');
    });

    it('should handle mixed presets and raw sequences', () => {
      const result = new AnimationParser('fadeIn;to:x:100:>').parse();
      expect(result.sequences.length).toBeGreaterThan(1);
    });
  });
});
