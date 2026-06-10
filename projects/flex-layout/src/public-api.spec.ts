import { FLEX_LAYOUT_PACKAGE } from './public-api';

describe('public API', () => {
  it('exposes the package name', () => {
    expect(FLEX_LAYOUT_PACKAGE).toBe('@stagyra/flex-layout');
  });
});
