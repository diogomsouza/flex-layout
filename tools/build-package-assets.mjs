import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as sass from 'sass';

const root = resolve('.');
const sourceStyles = resolve(root, 'projects/flex-layout/src/styles');
const distRoot = resolve(root, 'dist/flex-layout');
const distStyles = resolve(distRoot, 'styles');
const distLicense = resolve(distRoot, 'LICENSE');
const distPackageJson = resolve(distRoot, 'package.json');

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

const styleEntries = [];

for (const fileName of readdirSync(sourceStyles)) {
  if (!/^flex-layout.*\.scss$/.test(fileName)) {
    continue;
  }

  const sourceScss = resolve(sourceStyles, fileName);
  const cssName = fileName.replace(/\.scss$/, '.css');
  const entryName = fileName.replace(/\.scss$/, '');
  const compiled = sass.compile(sourceScss, {
    style: 'compressed',
    sourceMap: false,
  });

  copyFileSync(sourceScss, resolve(distStyles, fileName));
  writeFileSync(resolve(distStyles, cssName), `${compiled.css}\n`);
  styleEntries.push({ entryName, scssName: fileName, cssName });
}

const packageJson = JSON.parse(readFileSync(distPackageJson, 'utf8'));
const exportsMap = packageJson.exports ?? {};

for (const { entryName, scssName, cssName } of styleEntries) {
  exportsMap[`./styles/${cssName}`] = {
    style: `./styles/${cssName}`,
    default: `./styles/${cssName}`,
  };
  exportsMap[`./styles/${scssName}`] = {
    sass: `./styles/${scssName}`,
    default: `./styles/${scssName}`,
  };
  exportsMap[`./styles/${entryName}`] = {
    sass: `./styles/${scssName}`,
    style: `./styles/${cssName}`,
    default: `./styles/${scssName}`,
  };
}

packageJson.exports = exportsMap;
writeFileSync(distPackageJson, `${JSON.stringify(packageJson, null, 2)}\n`);
