module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/__tests__/setup.tsx'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/setup.tsx'],
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@react-native|react-native|react-native-elements/*)",
    "node_modules/(?!((jest-)?react-native|react-navigation|@react-navigation/.*|@react-native\/js-polyfills|react-native-elements/*))",
  ],
};
