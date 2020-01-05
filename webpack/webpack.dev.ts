import path from 'path'
import merge from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'
import { commonConfig } from './webpack.common'
import pkg from '../package.json'
import webpack from 'webpack'

const entry = commonConfig.entry as webpack.Entry

console.log(entry)
export default merge(commonConfig, {
  mode: 'development',
  entry: {
    'scripts/hotReload': path.resolve(
      __dirname,
      '../node_modules/crx-hotreload/hot-reload.js'
    )
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/manifest.json',
        to: '.',
        transform: (content: Buffer) => {
          const manifest = JSON.parse(content.toString())
          const background = manifest.background || {}
          const scripts = background.scripts || []
          return JSON.stringify(
            {
              ...manifest,
              version: pkg.version,
              background: {
                ...background,
                scripts: [...scripts, 'scripts/hotReload.js']
              }
            },
            null,
            2
          )
        }
      }
    ])
  ]
})
