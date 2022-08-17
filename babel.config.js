module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['transform-inline-environment-variables'],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/shared/components/',
          '@hooks': './src/hooks/',
          '@redux': './src/redux/',
          '@config': './src/config/',
          '@features': './src/features/',
          '@navigation': './src/navigation/',
          '@types': './src/types/',
          '@assets': './src/assets/',
          '@screens': './src/screens/',
          '@shared': './src/shared/',
          '@vars': './src/shared/vars',
          '@core': './src/core/',
        },
      },
    ],
  ],
};
