import { resolve } from 'path';
import { mkdir, readdir, rm, writeFile } from 'fs/promises';
import * as TJS from 'typescript-json-schema';

import { baseDir, distDir, schemaDir } from './config';

const settings: TJS.PartialArgs = {
  required: true,
};

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
  paths: {
    '@t/*': [
      baseDir + '/*'
    ]
  }
};

readdir(schemaDir, { withFileTypes: true })
  .then(dirs =>
    dirs.filter(dir => dir.isDirectory())
      .map<Promise<[string, string[]]>>(async dir => [dir.name, await readdir(resolve(schemaDir, dir.name))])
  )
  .then(dirs => Promise.all(dirs))
  .then(dirs => dirs
    .flatMap(([dir, files]) => files.map(file => resolve(schemaDir, dir, file)))
    .filter(file => /(\d+\.\d+\.\d+)(\.d)?\.ts$/.test(file)))
  .then(files => programTypescript(files));


async function programTypescript(files: string[]) {
  const tsTypeFiles = files.filter(file => /\.ts$/.test(file));

  const objectMaps = tsTypeFiles.map(file => tsTypeFileName2TypeSymbolName(file));

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  for (let i = 0; i < objectMaps.length; i++) {
    const { schemaName, schemaVersion, typeName, file } = objectMaps[i];

    const program = TJS.getProgramFromFiles([file], compilerOptions, baseDir);
    const schema = TJS.generateSchema(program, typeName, settings);

    console.log(`Build ok: ${schemaName}:${schemaVersion} => ${typeName}`);

    await writeFile(
      resolve(distDir, `${schemaName}_${schemaVersion}.json`),
      JSON.stringify(schema)
    );
  }

  console.log('Build complete');
}

function tsTypeFileName2TypeSymbolName(file: string) {
  const [, schemaName = null, schemaVersion = null] = file.match(/([\w-]+?)[\\/](\d+\.\d+\.\d+)(\.d)?\.ts$/) ?? [];
  const nameScope = schemaName?.replace(/-(\w)|(^\w)/g, (match, p1 = '', p2 = '') => `${p1}${p2}`.toUpperCase());

  return {
    schemaName,
    schemaVersion,
    typeName: nameScope + '.Main',
    file
  };
}
