module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        cwd: "babelrc",
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
          "@api": "./src/api",
          "@assets": "./assets",
          "@mmkv": "./src/mmkv",
          "@redux": "./src/redux",
          "@style": "./src/style",
          "@screen": "./src/screen",
          "@constant": "./src/constant",
          "@component": "./src/component",
          "@navigation": "./src/navigation",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        path: ".env",
        blocklist: null,
        allowlist: null,
        moduleName: "@env",
        allowUndefined: true,
        verbose: false,
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
