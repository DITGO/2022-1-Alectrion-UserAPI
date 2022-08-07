export default {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    '**/*.ts',
    '!<rootDir>/src/*.{js,ts}',
    '!<rootDir>/src/db/**/*.{js,ts}',
    '!<rootDir>/src/presentation/protocols/*.{js,ts}',
    '!<rootDir>/src/factories/**/*.{js,ts}',
    '!<rootDir>/src/repository/userRepository.ts'
  ],

  coverageDirectory: 'coverage',

  roots: ['<rootDir>/src/'],

  testEnvironment: 'node',

  transform: {
    '.+\\.ts': 'ts-jest'
  },
  testMatch: ['**/*.spec.ts']
}
