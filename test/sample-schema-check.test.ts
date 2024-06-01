import { test } from 'node:test';
import { deepEqual } from 'node:assert';
import Ajv from 'ajv';
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
  'weather-impact-society',
  'weather-early',
  'weather-warning',
  'weather-tornado',
  'weather-typhoon',
  'weather-landslide',
  'weather-river-flood'
];

const ajv = new Ajv({
  strictTuples: false
});

for (const schemaType of checkSchemaTypes) {
  test(schemaType, async t => {
    const sampleList = await getList(schemaType);

    for (let i = 0; i < sampleList.length; i++) {
      const url = sampleList[i];
      const json: any = await fetch(url).then(res => res.json());
      const schema = await getJSchema(json._schema.type, json._schema.version);
      const validate = ajv.compile(schema);
      const valid = validate(json);

      await t.test(url, () => {
        deepEqual(validate.errors ?? [], []);
      });
    }
  });

}


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
