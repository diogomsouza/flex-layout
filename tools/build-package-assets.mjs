import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import * as sass from 'sass';

const root = resolve('.');
const sourceScss = resolve(root, 'projects/flex-layout/src/styles/flex-layout.scss');
const distRoot = resolve(root, 'dist/flex-layout');
const distStyles = resolve(distRoot, 'styles');
const distCss = resolve(distStyles, 'flex-layout.css');
const distRootCss = resolve(distRoot, 'flex-layout.css');
const distRootScss = resolve(distRoot, 'flex-layout.scss');
const distLicense = resolve(distRoot, 'LICENSE');

if (!existsSync(distRoot)) {
  throw new Error('dist/flex-layout was not found. Run ng build flex-layout first.');
}

mkdirSync(distStyles, { recursive: true });
mkdirSync(dirname(distRootCss), { recursive: true });

const compiled = sass.compile(sourceScss, {
  style: 'compressed',
  sourceMap: false,
});

copyFileSync(resolve(root, 'LICENSE'), distLicense);
copyFileSync(sourceScss, distRootScss);
copyFileSync(sourceScss, resolve(distStyles, 'flex-layout.scss'));

await import('node:fs').then(({ writeFileSync }) => {
  writeFileSync(distCss, `${compiled.css}\n`);
  writeFileSync(distRootCss, `${compiled.css}\n`);
});
