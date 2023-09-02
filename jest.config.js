module.exports = {
  // Configurações do Jest aqui
  testEnvironment: 'node',
  coverageProvider: "v8",
  verbose: true,
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  clearMocks: true,
  rootDir: "src",
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",

};
