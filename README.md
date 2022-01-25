# @dmdata/telegram-json-type

## 概要
DMDATA.JP が提供する [JSON Schema](https://dmdata.jp/doc/reference/conversion/json/) の、TypeScript型定義（作成中）を公開しています。

## 使い方

### インストール
`$ npm i -D @dmdata/telegram-json-type`

### 型の使用

```typescript
import { EarthquakeInformation }  from '@dmdata/telegram-json-types';

const data = await fetch('https://data.api.dmdata.jp/v1/...')
      .then(res => res.json()) as Promise<EarthquakeInformation.Latest.Main>
      
```

## JSON Schema による整合性チェック

Telegram JSON が、仕様通り整合するかチェックすることができます。

`$ npm i @dmdata/telegram-json-type ajv`

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

* [EewInformation](https://dmdata.jp/doc/reference/conversion/json/schema/eew-information)
* [EarthquakeInformation](https://dmdata.jp/doc/reference/conversion/json/schema/earthquake-information)
* [TsunamiInformation](https://dmdata.jp/doc/reference/conversion/json/schema/tsunami-information)
* [WeatherTyphoon](https://dmdata.jp/doc/reference/conversion/json/schema/weather-typhoon)
