module.exports = {
  preset: 'ts-jest',
  roots: ['src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts']
}
