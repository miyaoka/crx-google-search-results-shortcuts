import { build } from 'esbuild';
import path from 'path';
import glob from 'glob';
import chokidar from 'chokidar';
import fs from 'fs';

const distDir = path.resolve('./dist');
const staticDir = path.resolve('./src/static');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}

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
