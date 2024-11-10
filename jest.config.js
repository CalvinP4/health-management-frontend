module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // Add axios here to transform its ES module syntax
  ],
  testEnvironment: "jest-environment-jsdom", 
};
