var fs = require ('fs-extra')
var path = require ('path')
var config = require ('../config')
var manifest = require ('../src/manifest.json')

module.exports = function () {

  Object.assign(manifest, {
    version: process.env.npm_package_version,
  })

  if (process.env.NODE_ENV === 'development') {
    Object.assign(manifest, {
      background: {
        scripts: [
          'js/hot-reload.js'
        ]
      }
    })
  }
  fs.emptyDirSync(config.build.assetsRoot)

  fs.writeFileSync(
    path.join(config.build.assetsRoot, 'manifest.json'),
    JSON.stringify(manifest)
  )
}
