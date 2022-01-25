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
      .then(res => res.json()) as Promise<EarthquakeInformation.Main>
      
```

## 使える型定義

* [EewInformation](https://dmdata.jp/doc/reference/conversion/json/schema/eew-information)
* [EarthquakeInformation](https://dmdata.jp/doc/reference/conversion/json/schema/earthquake-information)
* [TsunamiInformation](https://dmdata.jp/doc/reference/conversion/json/schema/tsunami-information)
* [WeatherTyphoon](https://dmdata.jp/doc/reference/conversion/json/schema/weather-typhoon)
