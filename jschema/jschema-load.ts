import { readdirSync } from 'fs';
import { resolve } from 'path';

import { distDir } from './config';

const schemas = new Map<string, Map<string, string>>();

const jschemaList = readdirSync(distDir)
  .filter(file => /\.json$/.test(file))
  .sort();

jschemaList.forEach(file => {
  const [, schemaName, schemaVersion] = file.match(/^([\w-]+)_(\w+\.\w+\.\w+)\.json$/) ?? [];

  const schemaVersions = schemas.get(schemaName) ?? schemas.set(schemaName, new Map()).get(schemaName);
  const jschemaFile = resolve(distDir, file);

  schemaVersions?.set(schemaVersion, jschemaFile);
  schemaVersions?.set('latest', jschemaFile);
});


export async function getJSchema(name: string, version: string = 'latest') {
  const filePath = schemas.get(name)?.get(version);

  if (!filePath) {
    return null;
  }

  return await import(filePath);
}
