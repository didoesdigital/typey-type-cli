module.exports = {
  preset: "ts-jest",
  reporters: ["jest-silent-reporter", "summary"],
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/build/"],
};
