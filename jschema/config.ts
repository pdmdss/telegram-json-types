import { resolve } from 'path';

export const baseDir = resolve(__dirname, '../types/');
export const schemaDir = resolve(baseDir, '../types/schema/');
export const distDir = resolve(__dirname, '../dist/jschema/');
