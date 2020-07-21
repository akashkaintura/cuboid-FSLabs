import { createLogger, format, transports, addColors } from 'winston';

const level = process.env.LOG_LEVEL || 'debug';
const silent = process.env.NODE_ENV === 'test';

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

addColors({
  fatal: 'red',
  error: 'yellow',
  warn: 'blue',
  info: 'green',
  debug: 'magenta',
  trace: 'gray',
});

const options = {
  console: {
    handleExceptions: true,
    level,
    silent,
  },
};

export default createLogger({
  levels,
  defaultMeta: { service: 'Cuboids' },
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(
      ({ level, timestamp, message, stack }) =>
        `${level} ${timestamp} : ${stack || message}`
    )
  ),
  transports: [new transports.Console(options.console)],
  exitOnError: false,
});
