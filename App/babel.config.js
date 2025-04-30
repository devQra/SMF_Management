module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
