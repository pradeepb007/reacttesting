module.exports = {
  // ... other Jest config options
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.jsx$": "babel-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.tsx$": "ts-jest",
    "^.+\\.js$": "esbuild-jest", // Add this line for custom transformation
  },
};
