const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: './configs/webpack/postcss.config.js',
    },
  },
};

module.exports = {
  entry: './core/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {  // aliases
      core: path.resolve(__dirname, '../../src/core'),
      features: path.resolve(__dirname, '../../src/features'),
      shared: path.resolve(__dirname, '../../src/shared'),
      styles: path.resolve(__dirname, '../../src/styles'),
    },
  },
  context: path.resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', postcssLoader],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', postcssLoader, 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: "asset/inline",
        parser: { dataUrlCondition: { maxSize: 15000 } },
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'core/index.html' }),
    new ProvidePlugin({
      React: 'react',
    }),
  ],
};
