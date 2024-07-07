const customElementsTags = ['client-only'];

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', 'components', '<rootDir>'],
  roots: ['<rootDir>', './components'],
  moduleFileExtensions: ['ts', 'vue', 'js', 'json'],
  transform: {
    '^.+\\.[t|j]s$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
    '.*\\.(vue)$': [
      '@vue/vue3-jest',
      {
        compilerOptions: {
          isCustomElement: (tag: string) => customElementsTags.includes(tag),
        },
      },
    ],
    '.+\\.(scss|png|jpg|svg)$': 'jest-transform-stub',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  collectCoverage: false,
  coverageDirectory: '__coverage__',
  coverageReporters: ['json', 'html', 'text'],
  collectCoverageFrom: ['components/base/**/*.vue'],
};
