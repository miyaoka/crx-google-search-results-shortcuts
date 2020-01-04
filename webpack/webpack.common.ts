import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import WebpackExtensionManifestPlugin from 'webpack-extension-manifest-plugin'
import pkg from '../package.json'

const distDir = path.resolve(__dirname, '../dist/')
const srcDir = path.resolve(__dirname, '../src/')
const jsDir = path.join(srcDir, 'js')
const templateDir = path.join(srcDir, 'template')

const scriptList = ['popup', 'options', 'background', 'content'].reduce(
  (acc: Record<string, string>, entry) => {
    const filepath = path.join(jsDir, `${entry}`)

    if (!fs.existsSync(filepath)) return acc
    return {
      ...acc,
      [entry]: filepath
    }
  },
  {}
)

const htmlPluginList = ['options', 'popup'].reduce(
  (acc: HtmlWebpackPlugin[], entry) => {
    const filename = `${entry}.html`
    const filepath = path.resolve(templateDir, filename)
    if (!fs.existsSync(filepath)) return acc
    return [
      ...acc,
      new HtmlWebpackPlugin({
        template: filepath,
        filename,
        chunks: [entry]
      })
    ]
  },
  []
)

const config: webpack.Configuration = {
  entry: scriptList,
  output: {
    path: distDir,
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    ...htmlPluginList,
    new CopyPlugin([{ from: 'src/static', to: '.', ignore: ['.gitkeep'] }]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: require('../src/template/manifest.json'),
        extend: { version: pkg.version }
      }
    })
  ]
}

export default config
