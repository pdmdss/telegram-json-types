import { resolve } from 'path';
import { mkdir, readdir, rm, writeFile } from 'fs/promises';

import * as TJS from 'typescript-json-schema';

const basePath = resolve(__dirname, '../types/schema/');
const distDir = resolve(__dirname, '../dist/jschema/');


const settings: TJS.PartialArgs = {
  required: true,
};

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

readdir(basePath)
  .then(files => programTypescript(files));


async function programTypescript(files: string[]) {
  const tsTypeFiles = files.filter(file => /\.ts$/.test(file));
  const filepath = tsTypeFiles.map(file => resolve(basePath, file));

  const program = TJS.getProgramFromFiles(filepath, compilerOptions);
  const generator = TJS.buildGenerator(program, settings);

  const objectMaps = tsTypeFiles.map(file => tsTypeFileName2TypeSymbolName(file));

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  for (let i = 0; i < objectMaps.length; i++) {
    const { schemaName, typeName } = objectMaps[i];
    console.log(`Build ok: ${schemaName}: ${typeName}`);

    const schema = generator?.getSchemaForSymbol(typeName, true);

    await writeFile(
      resolve(distDir, `${schemaName}.json`),
      JSON.stringify(schema, undefined, 4)
    );
  }

  console.log('Build complete');
}

function tsTypeFileName2TypeSymbolName(file: string) {
  const schemaName = file.replace(/^([\w-]+?)(\.d)?\.ts$/, '$1');
  const nameScope = schemaName.replace(/-(\w)|(^\w)/g, (match, p1 = '', p2 = '') => `${p1}${p2}`.toUpperCase());

  return {
    schemaName,
    typeName: nameScope + '.Main'
  };
}
