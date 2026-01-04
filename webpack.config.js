const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const {withAlias} = require('@expo/webpack-config/addons')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const {sentryWebpackPlugin} = require('@sentry/webpack-plugin')
const {version} = require('./package.json')

const GENERATE_STATS = process.env.EXPO_PUBLIC_GENERATE_STATS === '1'
const OPEN_ANALYZER = process.env.EXPO_PUBLIC_OPEN_ANALYZER === '1'

const reactNativeWebWebviewConfiguration = {
  test: /postMock.html$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
}

module.exports = async function (env = {}, argv = {}) {
  // Ensure env has mode set from argv or environment
  if (!env.mode && argv.mode) {
    env.mode = argv.mode
  }
  if (!env.mode) {
    env.mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
  }
  
  let config = await createExpoWebpackConfigAsync(env, argv)
  config = withAlias(config, {
    'react-native$': 'react-native-web',
    'react-native-webview': 'react-native-web-webview',
    // Force ESM version
    'unicode-segmenter/grapheme': require
      .resolve('unicode-segmenter/grapheme')
      .replace(/\.cjs$/, '.js'),
    'react-native-gesture-handler': false, // RNGH should not be used on web, so let's cause a build error if it sneaks in
  })
  config.module.rules = [
    ...(config.module.rules || []),
    reactNativeWebWebviewConfiguration,
  ]
  
  // Override devServer config for port 5000 and allow all hosts
  // Remove invalid options that are not compatible with webpack-dev-server v5
  const { https, _assetEmittingPreviousFiles, ...devServerRest } = config.devServer || {}
  config.devServer = {
    ...devServerRest,
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all',
    server: https ? 'https' : 'http',
  }
  
  if (env.mode === 'development') {
    config.plugins.push(new ReactRefreshWebpackPlugin())
  } else {
    // Support static CDN for chunks
    config.output.publicPath = 'auto'
  }

  if (GENERATE_STATS || OPEN_ANALYZER) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: OPEN_ANALYZER,
        generateStatsFile: true,
        statsFilename: '../stats.json',
        analyzerMode: OPEN_ANALYZER ? 'server' : 'json',
        defaultSizes: 'parsed',
      }),
    )
  }
  if (process.env.SENTRY_AUTH_TOKEN) {
    config.plugins.push(
      sentryWebpackPlugin({
        org: 'blueskyweb',
        project: 'app',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        release: {
          // fallback needed for Render.com deployments
          name: process.env.SENTRY_RELEASE || version,
          dist: process.env.SENTRY_DIST,
        },
      }),
    )
  }
  return config
}
