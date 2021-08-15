import { TelegramJSONMain } from '../main';
import { Coordinate } from './component/coordinate';
import { UnitValue } from './component/unit-value';

export namespace WeatherTyphoon {
  export interface Schema {
    type: 'weather-typhoon';
    version: '1.0.0';
  }

  type Direction = {
    type: string;
    unit: string;
    value: string;
    azimuth: string;
  } | {
    type: string;
    unit: string;
    value: null;
    azimuth: null;
    condition: string;
  }

  interface Axis {
    direction: Direction;
    radius: UnitValue;
  }


  interface A {
    type: '実況' | '推定';
    elapsedTime: 'PT0H' | 'PT1H';
    dateTime: string;
    classification: {
      category: 'TD' | 'TY' | 'STS' | 'Hurricane' | 'Tropical Storm' | 'LOW' | null;
      name: '熱帯低気圧' | '台風' | 'ハリケーン' | '発達した熱帯低気圧' | '温帯低気圧' | null;
      area: '大型' | '超大型' | null;
      intensity: '強い' | '非常に強い' | '猛烈な' | null;
    };
    center: {
      location: Coordinate;
      direction: Direction;
      speed: UnitValue;
      pressure: UnitValue;
    };
    wind?: {
      average: UnitValue;
      instantaneous: UnitValue;
      area: {
        strong: Axis[];
        storm: Axis[];
      };
    };
  }

  interface B {
    type: '予報' | '延長予報';
    elapsedTime: string;
    dateTime: string;
    classification: {
      category: 'TD' | 'TY' | 'STS' | 'Hurricane' | 'Tropical Storm' | 'LOW' | null;
      name: '熱帯低気圧' | '台風' | 'ハリケーン' | '発達した熱帯低気圧' | '温帯低気圧' | null;
      intensity?: '強い' | '非常に強い' | '猛烈な' | null;
    };
    center: {
      probabilityCircle: {
        basePoint: Coordinate;
        axes: Axis[];
      };
      direction: Direction;
      speed: UnitValue;
      pressure: UnitValue
    };
    wind: {
      average: UnitValue;
      instantaneous: UnitValue;
      area?: {
        strong?: Axis[];
        storm?: Axis[];
        stormWarning?: Axis[];
      };
    };
  }

  export interface PublicBody {
    typhoon: {
      tcNumber: string;
      name: {
        text: string | null;
        kana: string | null;
        number: string | null;
      };
      remark: '台風発生' | '台風発生（域外から入る）' | '台風消滅（域外へ出る）' | '台風消滅（温帯低気圧化）' | '台風消滅（熱帯低気圧化）' |
        '台風発生の可能性が小さくなった' | '発表間隔変更（毎時から３時間毎）' | '発表間隔変更（３時間毎から毎時）' | '台風発生予想' | '温帯低気圧化しつつある' | null;
    };
    forecasts: (A | B)[];
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '台風解析・予報情報（５日予報）（Ｈ３０）' | '台風解析・予報情報（５日予報）' | '台風解析・予報情報（３日予報）';
    title: '台風解析・予報情報';
    targetDuration: string;
    infoKind: '台風解析・予報情報（５日予報）' | '台風解析・予報情報（３日予報）';
    eventId: string;
    serialNo: string;
    infoType: '発表' | '訂正' | '取消';
    headline: null;
    body: PublicBody;
  }


  export type Main = Public;

}
