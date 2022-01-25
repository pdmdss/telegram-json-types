import { TelegramJSONMain } from '../main';
import { Coordinate } from './component/coordinate';
import { UnitValue, UnitValueNotNull } from './component/unit-value';

export namespace WeatherTyphoon {
  export interface Schema {
    type: 'weather-typhoon';
    version: '1.0.0';
  }

  export interface Direction {
    type: string;
    unit: string;
    value: string | null;
    azimuth: string | null;
    condition?: string;
  }

  export interface Axis {
    direction: Direction;
    radius: UnitValue;
  }

  export interface RealStateClassification {
    category: 'TD' | 'TY' | 'STS' | 'Hurricane' | 'Tropical Storm' | 'LOW' | null;
    name: '熱帯低気圧' | '台風' | 'ハリケーン' | '発達した熱帯低気圧' | '温帯低気圧' | null;
    area: '大型' | '超大型' | null;
    intensity: '強い' | '非常に強い' | '猛烈な' | null;
  }

  export type ForecastClassification = Omit<RealStateClassification, 'area'>;

  export interface RealStateCenter {
    coordinate: Coordinate;
    location: string;
    direction: Direction;
    speed: UnitValue;
    pressure: UnitValueNotNull;
  }

  export type ForecastCenter = {
    probabilityCircle: {
      basePoint: Coordinate;
      axes: Axis[];
    };
  } & Omit<RealStateCenter, 'location'>;

  export interface RealStateWindArea {
    strong: Axis[];
    storm: Axis[];
  }

  export interface RealStateWind {
    average: UnitValue;
    instantaneous: UnitValue;
    area: RealStateWindArea;
  }

  export interface ForecastWindArea {
    stormWarning: Axis[];
  }

  export interface ForecastWind {
    average: UnitValue;
    instantaneous: UnitValue;
    area: ForecastWindArea;
  }

  export interface RealState {
    type: '実況' | '推定';
    elapsedTime: 'PT0H' | 'PT1H';
    dateTime: string;
    classification: RealStateClassification;
    center: RealStateCenter;
    wind?: RealStateWind;
  }

  interface Forecast {
    type: '予報' | '延長予報';
    elapsedTime: string;
    dateTime: string;
    classification: ForecastClassification;
    center: ForecastCenter;
    wind: ForecastWind;
  }

  export interface TyphoonName {
    text: string | null;
    kana: string | null;
    number: string | null;
  }

  export type TyphoonRemark = '台風発生' | '台風発生（域外から入る）' | '台風消滅（域外へ出る）' | '台風消滅（温帯低気圧化）' | '台風消滅（熱帯低気圧化）' |
    '台風発生の可能性が小さくなった' | '発表間隔変更（毎時から３時間毎）' | '発表間隔変更（３時間毎から毎時）' | '台風発生予想' | '温帯低気圧化しつつある' | null;

  export interface Typhoon {
    tcNumber: string;
    name: TyphoonName;
    remark: TyphoonRemark;
  }

  export interface PublicBody {
    typhoon: Typhoon;
    forecasts: [RealState] | [RealState, ...Forecast[]] | [RealState, RealState] | [RealState, RealState, ...Forecast[]];
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
