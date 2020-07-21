import { byId } from '../filters';

describe('filters', () => {
  const builder = {};

  beforeEach(() => {
    builder.findByIds = jest.fn();
  });

  afterEach(() => jest.clearAllMocks());

  it('should filter byId if present', () => {
    const ids = ['7'];
    byId({ ids })(builder);
    expect(builder.findByIds).toHaveBeenCalledWith(ids);
  });

  it('should not filter byId if not present', () => {
    const ids = undefined;
    byId({ ids })(builder);
    expect(builder.findByIds).not.toHaveBeenCalled();
  });
});
