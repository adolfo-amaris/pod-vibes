module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/__tests__/'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Usa babel-jest para procesar JS/TS
  },
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy', // Mapeo para manejar CSS/SCSS
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  setupFiles: ['./jest.setup.js'],
};
