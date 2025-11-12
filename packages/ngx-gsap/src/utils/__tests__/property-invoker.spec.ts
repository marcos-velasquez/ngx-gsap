import { PropertyInvoker } from '../property-invoker';

describe('PropertyInvoker', () => {
  it('should invoke function properties with their values', () => {
    const mockFn = jest.fn();
    const target = {
      method1: mockFn,
      prop: 'value',
    };

    new PropertyInvoker(target).invoke({ method1: 'test' });

    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should not invoke non-function properties', () => {
    const target = {
      prop: 'value',
      num: 123,
    };

    expect(() => {
      new PropertyInvoker(target).invoke({ prop: 'new', num: 456 });
    }).not.toThrow();
  });

  it('should invoke multiple function properties', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const target = {
      method1: mockFn1,
      method2: mockFn2,
    };

    new PropertyInvoker(target).invoke({ method1: 'value1', method2: 'value2' });

    expect(mockFn1).toHaveBeenCalledWith('value1');
    expect(mockFn2).toHaveBeenCalledWith('value2');
  });
});
