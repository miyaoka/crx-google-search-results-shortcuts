import webpack from 'webpack'
import path from 'path'
import glob from 'glob'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const distDir = path.resolve(__dirname, '../dist/')
const srcDir = path.resolve(__dirname, '../src/')

const entryList = glob
  .sync('+(scripts|pages)/**/index.ts', { cwd: srcDir })
  .reduce((acc: Record<string, string>, filename) => {
    const entry = filename.replace(/\/index\.ts$/, '')
    const filepath = path.join(srcDir, filename)
    return {
      ...acc,
      [entry]: filepath
    }
  }, {})

const htmlPluginList = glob
  .sync('pages/**/index.html', { cwd: srcDir })
  .reduce((acc: HtmlWebpackPlugin[], filename) => {
    const entry = filename.replace(/\/index\.html$/, '')
    const filepath = path.resolve(srcDir, filename)
    return [
      ...acc,
      new HtmlWebpackPlugin({
        template: filepath,
        filename: `${entry}.html`,
        chunks: [entry]
      })
    ]
  }, [])

export const commonConfig: webpack.Configuration = {
  entry: entryList,
  output: {
    path: distDir,
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
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
    new CopyPlugin([{ from: 'src/static', to: '.', ignore: ['.gitkeep'] }])
  ]
}
