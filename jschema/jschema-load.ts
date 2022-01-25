import { readdirSync } from 'fs';
import { resolve } from 'path';

import { distDir } from './config';

const schemas = new Map<string, string>();

const jschemaList = readdirSync(distDir).filter(file => /\.json$/.test(file));

jschemaList.forEach(jschema => {
  schemas.set(
    jschema.replace('.json', ''),
    resolve(distDir, jschema)
  );
});


export function getJSchema(name: string) {
  const filePath = schemas.get(name);

  if (!filePath) {
    return null;
  }

  return import(filePath);
}
