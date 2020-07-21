import winstonLogger from '../../logger';
import logger from '../logger';

it('should set log level to error on 500 level requests', async () => {
  const next = jest.fn().mockResolvedValue(null);
  const ctx = { status: 500, request: { body: '' } };

  const winstonSpy = jest.spyOn(winstonLogger, 'log');

  await logger(ctx, next);
  expect(winstonSpy.mock.calls[1][0]).toBe('error');
});
