import {withKnowUsage} from '../src';

describe('Specs', () => {
  it('should track usage', () => {
    const obj = {a: 1, b: 2, c: [3]}

    const proxied = withKnowUsage(obj);

    expect(proxied.proxy.a).toBe(1);
    expect(proxied.usedKeys).toEqual(['a']);
    expect(proxied.usage.has('a')).toBeTruthy();
    expect(proxied.usage.has('b')).toBeFalsy();

    expect(proxied.proxy.b).toBe(2);
    expect(proxied.usedKeys).toEqual(['a', 'b']);

    expect(proxied.proxy.c[0]).toBe(3);
    expect(proxied.usedKeys).toEqual(['a', 'b', 'c']);
    expect(proxied.usage.has('a')).toBeTruthy();
    expect(proxied.usage.has('b')).toBeTruthy();
    expect(proxied.usage.has('c')).toBeTruthy();

    proxied.resetUsage();

    expect(proxied.proxy.c[0]).toBe(3);
    expect(proxied.usedKeys).toEqual(['c']);
    expect(proxied.usage.has('a')).toBeFalsy();
    expect(proxied.usage.has('b')).toBeFalsy();
    expect(proxied.usage.has('c')).toBeTruthy();
  })
});
