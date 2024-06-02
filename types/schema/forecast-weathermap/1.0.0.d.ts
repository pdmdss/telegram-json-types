import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace ForecastWeathermap {
  export interface Schema {
    type: 'forecast-weathermap';
    version: '1.0.0';
  }

  export interface Direction {
    type: '移動方向';
    unit: '°';
    value: string | null;
    condition?: '不定';
  }

  export interface WindDirection {
    type: '風向';
    unit: '°';
    value: string;
  }

  export interface SpeedMeter {
    type: '移動速度';
    unit: 'km/h';
    value: string | null;
    condition?: 'ゆっくり' | 'ほとんど停滞' | string;
  }

  export interface SpeedKnot {
    type: '移動速度';
    unit: 'knot';
    value: string | null;
    condition?: 'SLW' | 'ALMOST STNR' | string;
  }

  export interface WindSpeedMeter {
    type: '最大風速';
    unit: 'm/s';
    value: string;
  }

  export interface WindSpeedKnot {
    type: '最大風速';
    unit: 'knot';
    value: string;
  }

  export interface Pressure<Type extends string = ''> {
    type: `${Type}気圧`;
    unit: 'hPa';
    value: string;
  }

  export interface WeatherMapItemDisturbanceKindCenter {
    type: '低気圧' | '高気圧' | '熱帯低気圧' | '低圧部';
    coordinate: Components.Coordinate;
    direction: Direction;
    speeds: [SpeedMeter, SpeedKnot];
    pressure: Pressure<'中心'>;
  }

  export interface WeatherMapItemDisturbance {
    type: '低気圧' | '高気圧' | '熱帯低気圧' | '低圧部';
    kinds: [
      WeatherMapItemDisturbanceKindCenter
    ];
  }

  export interface WeatherMapItemTyphoonKindCenter extends Omit<WeatherMapItemDisturbanceKindCenter, 'type'> {
    type: '台風';
  }

  export interface WeatherMapItemTyphoonKindWindSpeed {
    type: '風';
    speeds: [WindSpeedMeter, WindSpeedKnot];
  }

  export interface WeatherMapItemTyphoonKindName {
    type: '呼称';
    text: string | null;
    kana: string | null;
    number: string | null;
  }

  export interface WeatherMapItemTyphoonKindClass {
    type: '階級';
    category: 'TS' | 'STS' | 'TY' | 'HR' | 'Tropical Storm' | null;
    name: '台風' | 'ハリケーン' | '発達した熱帯低気圧' | null;
  }

  export interface WeatherMapItemTyphoon {
    type: '台風';
    kinds: [
      WeatherMapItemTyphoonKindCenter,
      WeatherMapItemTyphoonKindWindSpeed,
      WeatherMapItemTyphoonKindName,
      WeatherMapItemTyphoonKindClass
    ];
  }

  export interface WeatherMapItemIsobarKind {
    type: '等圧線';
    pressure: Pressure;
    line: [number, number][];
  }

  export interface WeatherMapItemIsobar {
    type: '等圧線';
    kinds: [
      WeatherMapItemIsobarKind
    ];
  }

  export interface WeatherMapItemFrontKind {
    type: '寒冷前線' | '温暖前線' | '停滞前線' | '閉塞前線';
    line: [number, number][];
  }

  export interface WeatherMapItemFront {
    type: '寒冷前線' | '温暖前線' | '停滞前線' | '閉塞前線';
    kinds: [
      WeatherMapItemFrontKind
    ];
  }

  export interface WeatherMap {
    type: '実況' | '予想';
    elapsedTime: 'PT0H' | 'PT24H' | 'PT48H';
    dateTime: string;
    items: (WeatherMapItemDisturbance | WeatherMapItemTyphoon | WeatherMapItemIsobar | WeatherMapItemFront)[];
  }

  export interface SevereWeatherWindKind {
    type: '悪天情報（強風）';
    direction: WindDirection;
    speed: WindSpeedKnot;
  }

  export interface SevereWeatherWind {
    type: '悪天情報（強風）';
    name: '強風域';
    coordinates: [[number, number]];
    kinds: [
      SevereWeatherWindKind
    ];
  }

  export interface SevereWeatherFogPolygon {
    type: '悪天情報（霧）';
    name: '霧域';
    code?: never;
    polygons: [[number, number][]];
  }

  export interface SevereWeatherFogArea extends Components.CodeName {
    type: '悪天情報（霧）';
    polygons?: never;
  }

  export interface SevereWeatherIcePolygon {
    type: '悪天情報（海氷）' | '悪天情報（船体着氷）';
    name: '海氷域' | '船体着氷域';
    coordinates: [number, number][];
  }

  export interface SevereWeather {
    type: '実況' | '予想';
    elapsedTime: 'PT0H' | 'PT24H' | 'PT48H';
    dateTime: string;
    items: (SevereWeatherWind | SevereWeatherFogPolygon | SevereWeatherFogArea | SevereWeatherIcePolygon)[];
  }

  export interface PublicBody {
    weathermap: WeatherMap;
    severeWeather?: SevereWeather;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '地上実況図' | '地上２４時間予想図' | '地上４８時間予想図' | 'アジア太平洋地上実況図' | 'アジア太平洋海上悪天２４時間予想図' | 'アジア太平洋海上悪天４８時間予想図';
    title: '地上実況図' | '地上２４時間予想図' | '地上４８時間予想図' | 'アジア太平洋地上実況図' | 'アジア太平洋海上悪天２４時間予想図' | 'アジア太平洋海上悪天４８時間予想図';
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: '天気図情報';
    body: PublicBody;
  }

  export type Main = Public;
}
