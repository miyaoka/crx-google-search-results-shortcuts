import { build } from 'esbuild';
import path from 'path';
import glob from 'glob';
import chokidar from 'chokidar';
import fs from 'fs';

const distDir = path.resolve('./dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
const staticDir = path.resolve('./src/static');
const manifestPath = path.resolve('./src/manifest.json');

// options
const argv = process.argv.slice(2);
const isWatching = argv.includes('--dev');

// build scripts
build({
  entryPoints: glob.sync('./src/scripts/*'),
  bundle: true,
  outdir: distDir,
  watch: isWatching
    ? {
        onRebuild(error, _result) {
          if (!error) console.log('watch build succeeded');
        }
      }
    : false
});

// sync static file
chokidar
  .watch(staticDir, { persistent: isWatching })
  .on('all', (evt, filepath) => {
    const distFilepath = path.join(distDir, path.relative(staticDir, filepath));
    if (evt === 'add') {
      fs.mkdirSync(path.dirname(distFilepath), { recursive: true });
      fs.copyFileSync(filepath, distFilepath);
    } else if (evt === 'unlink') {
      fs.unlinkSync(distFilepath);
    }
  });

// build manifest
chokidar.watch(manifestPath, { persistent: isWatching }).on('all', evt => {
  if (!/^(add|change)$/.test(evt)) return;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  fs.writeFileSync(
    path.join(distDir, 'manifest.json'),
    JSON.stringify({ ...manifest, version: pkg.version }, null, 2)
  );
});
