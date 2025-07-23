const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const SRC_PATH = path.resolve(__dirname, 'src');

  return {
    entry: './src/pages/index/index.js',
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/pages/index/index.pug',
        filename: 'index.html',
        favicon: './src/assets/favicon/favicon.svg',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets',
            to: 'assets',
            noErrorOnMissing: true,
          },
        ],
      }),
      new Dotenv(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      open: true,
      port: 3000,
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '~': SRC_PATH,
        '~components': `${SRC_PATH}/components`,
        '~assets': `${SRC_PATH}/assets`,
        '~api': `${SRC_PATH}/api`,
        '~libs': `${SRC_PATH}/libs`,
        '~utils': `${SRC_PATH}/utils`,
        '~store': `${SRC_PATH}/store`,
        '~reducers': `${SRC_PATH}/reducers`,
        '~templates': `${SRC_PATH}/templates`,
        '~constants': `${SRC_PATH}/constants`,
        '~pages-base': `${SRC_PATH}/pages-base`,
      },
    },
    devtool: isProduction ? false : 'source-map',
  };
};