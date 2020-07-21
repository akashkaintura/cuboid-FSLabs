module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'text-summary', 'html'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/__tests__/**',
    '!**/index.js',
    '!src/config/*',
    '!src/db/knex.js',
  ],
  roots: ['./src'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
