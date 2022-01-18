import merge from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'
import { commonConfig } from './webpack.common'
import pkg from '../package.json'

export default merge(commonConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin([
      {
        from: './src/manifest.json',
        to: '.',
        transform: (content: Buffer) => {
          // eslint-disable-next-line
          const { content_security_policy, ...manifest } = JSON.parse(
            content.toString()
          )

          return JSON.stringify(
            {
              ...manifest,
              version: pkg.version,
            },
            null,
            2
          )
        },
      },
    ]),
  ],
})
