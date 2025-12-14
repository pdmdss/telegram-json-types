import { test } from 'node:test';
import { deepEqual } from 'node:assert/strict';
import Ajv from 'ajv';
import { getJSchema } from '../jschema/jschema-load';

const sampleUrl = 'https://sample.dmdata.jp';
const checkSchemaTypes = [
  'eew-information',
  'earthquake-information',
  'earthquake-explanation',
  'earthquake-counts',
  'earthquake-hypocenter-update',
  'earthquake-nankai',
  'forecast-prefecture',
  'forecast-warning-possibility',
  'forecast-season',
  'forecast-2week-temperature',
  'forecast-weathermap',
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
  const query = new URLSearchParams({ prefix: `conversion/json/schema/${schemaType}`, delimiter: '' });
  const url = `${sampleUrl}/?` + query.toString();

  return await fetch(url, { headers: { accept: 'application/xml' } })
    .then(res => res.text())
    .then(xml => xml
      .match(/<Key>.+?\.json<\/Key>/g)
      ?.map(element => element.replace(/^<Key>(.+?\.json)<\/Key>$/, '$1'))
      .map(href => `${sampleUrl}/${encodeURIComponent(href)}`) ?? []
    );
}
