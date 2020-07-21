import whitelistFields from '../whitelistFields';

describe('whitelistFields', () => {
  it('returns an empty array when whitelist is undefined', () => {
    const fields = ['a', 'b'];
    expect(whitelistFields()(fields)).toEqual([]);
  });

  it('returns an empty array when fields is undefined', () => {
    const whitelist = ['a', 'b'];
    expect(whitelistFields(whitelist)()).toEqual([]);
  });

  it('returns an empty array when whitelist and fields are undefined', () => {
    expect(whitelistFields()()).toEqual([]);
  });

  it('returns the intersection of whitelist and fields', () => {
    const whitelist = ['a', 'b', 'c'];
    const fields = ['b', 'c', 'd'];
    expect(whitelistFields(whitelist)(fields)).toEqual(['b', 'c']);
  });
});
