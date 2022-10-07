module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    clearMocks: true,
    testMatch:["**/**/**.test.js"],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
      },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
  