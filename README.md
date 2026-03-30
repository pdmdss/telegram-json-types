# @dmdata/telegram-json-types

## 概要

DMDATA.JP が提供する [JSON Schema](https://dmdata.jp/doc/reference/conversion/json/) の、TypeScript型定義を公開しています。

## 使い方

### インストール

`$ npm i -D @dmdata/telegram-json-types`

### 型の使用

```typescript
import { EarthquakeInformation }  from '@dmdata/telegram-json-types';

const data = await fetch('https://data.api.dmdata.jp/v1/...')
      .then(res => res.json()) as Promise<EarthquakeInformation.Latest.Main>
      
```

## JSON Schema による整合性チェック

Telegram JSON が、仕様通り整合するかチェックができます。

`$ npm i @dmdata/telegram-json-types ajv`

```typescript
import { getJSchema } from '@dmdata/telegram-json-types';

// 実際の電文データ
const telegramData = {
  _schema: {
    type: 'earthquake-information',
    version: '1.1.0'
  }
};

async function check() {
  // Schema 名から JSON Schema 定義を読み込む 
  const jschema = await getJSchema(telegramData._schema.type, telegramData._schema.version);

  const validate = ajv.complite(jschema);

  console.log(validate(telegramData)); // false
}

check();
```

## 使える型定義

* [earthquake-information v1.1.0](https://dmdata.jp/doc/reference/conversion/json/schema/earthquake-information)
* [earthquake-explantion v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/earthquake-explantion)
* [earthquake-counts v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/earthquake-counts)
* [earthquake-hypocenter-update v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/earthquake-hypocenter-update)
* [earthquake-nankai v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/earthquake-nankai)
* [eew-information v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/eew-information)
* [forecast-2week-temperature v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/forecast-2week-temperature)
* [forecast-prefecture v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/forecast-prefecture)
* [forecast-season v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/forecast-season)
* [forecast-warning-possibility v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/forecast-warning-possibility)
* [forecast-weathermap v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/forecast-weathermap)
* [tsunami-information v1.1.0](https://dmdata.jp/doc/reference/conversion/json/schema/tsunami-information)
    * [tsunami-information v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/legacy/tsunami-information_1.0.0)
* [volcano-information v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/volcano-information)
* [weather-warning v1.1.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-warning)
    * [weather-warning v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/legacy/weather-warning_1.0.0)
* [weather-warning-timeseries v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-warning-timeseries)
* [weather-commentary v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-commentary)
* [weather-information v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-information)
* [weather-impact-society v1.0.1](https://dmdata.jp/doc/reference/conversion/json/schema/weather-impact-society)
    * [weather-impact-society v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/legacy/weather-impact-society_1.0.0)
* [weather-early v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-early)
* [weather-tornado v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-tornado)
* [weather-typhoon v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-typhoon)
* [weather-landslide v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-landslide)
* [weather-river-flood v1.0.0](https://dmdata.jp/doc/reference/conversion/json/schema/weather-river-flood)
