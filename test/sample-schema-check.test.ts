import Ajv from 'ajv';
import fetch from 'node-fetch';
import { getJSchema } from '../jschema/jschema-load';

const checkSchemaTypes = [
  'eew-information',
  'earthquake-information',
  'earthquake-explanation',
  'earthquake-counts',
  'earthquake-hypocenter-update',
  'earthquake-nankai',
  'tsunami-information',
  'volcano-information',
  'weather-information',
  'weather-warning',
  'weather-typhoon',
];

const ajv = new Ajv({
  strictTuples: false
});

test.each(checkSchemaTypes)('CheckSchemaType: %s', async schemaType => {
  const sampleList = await getList(schemaType);

  for (let i = 0; i < sampleList.length; i++) {
    const url = sampleList[i];
    const json: any = await fetch(url).then(res => res.json());
    const schema = await getJSchema(json._schema.type, json._schema.version);
    const validate = ajv.compile(schema);
    const valid = validate(json);

    console.group(url);
    expect(validate.errors ?? []).toEqual([]);
    console.groupEnd();
  }
});


async function getList(schemaType: string) {
  const url = `https://sample.dmdata.jp/conversion/json/schema/${schemaType}/`;
  return await fetch(url).then(res => res.text())
    .then(html => html
      .replace(/^.+?<pre>.+?<hr>(.+?)<\/pre>.+?$/s, '$1')
      .match(/<a\shref="(.+?)">/g)
      ?.map(a => url + a.replace(/^<a\shref="(.+?)">$/, '$1'))
      .filter(href => /\.json$/.test(href)) ?? []
    );
}
