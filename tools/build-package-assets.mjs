import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as sass from 'sass';

const root = resolve('.');
const sourceScss = resolve(root, 'projects/flex-layout/src/styles/flex-layout.scss');
const distRoot = resolve(root, 'dist/flex-layout');
const distStyles = resolve(distRoot, 'styles');
const distLicense = resolve(distRoot, 'LICENSE');
const distPackageJson = resolve(distRoot, 'package.json');
const cssName = 'flex-layout.css';
const scssName = 'flex-layout.scss';

if (!existsSync(distRoot)) {
  throw new Error('dist/flex-layout was not found. Run ng build flex-layout first.');
}

mkdirSync(distStyles, { recursive: true });
copyFileSync(resolve(root, 'LICENSE'), distLicense);

for (const directory of [distRoot, distStyles]) {
  for (const fileName of readdirSync(directory)) {
    if (/^flex-layout.*\.(css|scss)$/.test(fileName)) {
      rmSync(resolve(directory, fileName), { force: true });
    }
  }
}

const compiled = sass.compile(sourceScss, {
  style: 'compressed',
  sourceMap: false,
});

copyFileSync(sourceScss, resolve(distStyles, scssName));
writeFileSync(resolve(distStyles, cssName), `${compiled.css}\n`);

const packageJson = JSON.parse(readFileSync(distPackageJson, 'utf8'));
packageJson.exports = {
  './package.json': {
    default: './package.json',
  },
  '.': packageJson.exports?.['.'] ?? {
    types: './types/stagyra-flex-layout.d.ts',
    default: './fesm2022/stagyra-flex-layout.mjs',
  },
  './styles/flex-layout.css': {
    style: './styles/flex-layout.css',
    default: './styles/flex-layout.css',
  },
  './styles/flex-layout.scss': {
    sass: './styles/flex-layout.scss',
    default: './styles/flex-layout.scss',
  },
  './styles/flex-layout': {
    sass: './styles/flex-layout.scss',
    style: './styles/flex-layout.css',
    default: './styles/flex-layout.scss',
  },
};

writeFileSync(distPackageJson, `${JSON.stringify(packageJson, null, 2)}\n`);
