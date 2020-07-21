import logger from '../../logger';
import * as middleware from '../';
import HttpStatus from 'http-status-codes';

class InternalServerError extends Error {
  constructor(...params) {
    super(
      HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      ...params
    );
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

class NoStatusError extends Error {
  constructor(...params) {
    super(
      HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      ...params
    );
  }
}

describe('errors middleware', () => {
  const loggerSpy = jest.spyOn(logger, 'error');

  afterEach(() => jest.clearAllMocks());

  it.each([
    ['Server Error', 500, undefined, InternalServerError],
    ['Server Error', 500, undefined, NoStatusError],
  ])(
    'should handle %s with status %i',
    async (message, status, meta, TestError) => {
      const error = new TestError(message);
      const next = jest.fn().mockRejectedValue(error);
      const ctx = { request: { body: '' } };
      await middleware.errors(ctx, next);
      expect(ctx.status).toBe(status);
      expect(ctx.body).toMatchObject({ message, status, meta });
      expect(loggerSpy.mock.calls[0][0]).toBe(error);
    }
  );
});
