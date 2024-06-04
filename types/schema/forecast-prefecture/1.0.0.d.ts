import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace ForecastPrefecture {
  export interface Schema {
    type: 'forecast-prefecture';
    version: '1.0.0';
  }


  export interface WindDirection {
    type: '風向';
    unit: '８方位漢字';
    value: '北' | '北東' | '東' | '南東' | '南' | '南西' | '西' | '北西' | null;
    condition?: 'やや強く' | '強く' | '非常に強く' | string;
  }

  export interface WindDirectionMildWind extends WindDirection {
    value: null;
    condition: '風弱く';
  }

  export interface WindDirectionWindSubside extends WindDirection {
    condition: 'おさまり';
  }

  export interface WindSpeedLevel {
    type: '風速階級';
    value: string;
    range: {
      type: '風速階級の範囲';
      unit: 'm/s';
      from: string;
      to: string | 'over';
    };
  }

  export interface WaveHeight {
    type: '波高';
    unit: 'm';
    value: string | null;
    condition?: 'うねり　を伴う' | '流氷におおわれている';
  }

  export interface PrecipitationProbability<Type extends '６時間降水確率' | '日降水確率'> {
    type: Type;
    unit: '%';
    value: string;
  }

  export interface Temperature<Type extends '日中の最高気温' | '最高気温' | '最低気温' | '朝の最低気温' | '気温' | '最高気温平年値' | '最低気温平年値'> {
    type: Type;
    unit: '度';
    value: string;
  }

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }


  /**
   * 府県天気予報（VPFD51）
   */

  export interface TimeSeriesRegionDayItemWeather extends Components.CodeName {
    refId: string;
  }

  export interface TimeSeriesRegionDayItemWeatherDetail {
    refId: string;
    text: string;
    base: {
      name: string;
      condition?: string;
    };
    temporaries?: {
      timeModifier: string;
      name: string;
    }[];
    becomings?: {
      timeModifier: string;
      name: string;
    }[];
    subArea?: {
      text: string;
    };
  }

  export interface TimeSeriesRegionDayItemKindWeather {
    type: '天気';
    weathers: TimeSeriesRegionDayItemWeather[];
    details: TimeSeriesRegionDayItemWeatherDetail[];
  }

  export interface TimeSeriesRegionDayItemWindDetail {
    refId: string;
    text: string;
    base: {
      direction: WindDirection | WindDirectionMildWind;
    };
    becomings?: {
      timeModifier: string;
      direction: WindDirection | WindDirectionWindSubside;
    }[];
    subArea?: {
      name: string;
      base?: {
        timeModifier?: string;
        direction: WindDirection;
      };
      becomings?: {
        timeModifier: string;
        direction: WindDirection | WindDirectionWindSubside;
      }[];
    };
  }

  export interface TimeSeriesRegionDayItemKindWind {
    type: '風';
    details: TimeSeriesRegionDayItemWindDetail[];
  }

  export interface TimeSeriesRegionDayItemWaveDetail {
    refId: string;
    text: string;
    base: {
      height: WaveHeight;
    };
    becomings?: {
      timeModifier: string;
      height: WaveHeight;
    }[];
    subArea?: {
      name: string;
      base?: {
        timeModifier?: string;
        height: WaveHeight;
      };
      becomings?: {
        timeModifier: string;
        height: WaveHeight;
      }[];
    };
  }

  export interface TimeSeriesRegionDayItemKindWave {
    type: '波';
    details: TimeSeriesRegionDayItemWaveDetail[];
  }

  export interface TimeSeriesRegionDayItem extends Components.CodeName {
    kinds: [
      TimeSeriesRegionDayItemKindWeather,
      TimeSeriesRegionDayItemKindWind,
      TimeSeriesRegionDayItemKindWave
    ] | [
      TimeSeriesRegionDayItemKindWeather,
      TimeSeriesRegionDayItemKindWind
    ];
  }

  export interface TimeSeriesRegionDay {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesRegionDayItem[];
  }

  export interface TimeSeriesRegion6HoursItemPrecipitationProbability extends PrecipitationProbability<'６時間降水確率'> {
    refId: string;
    condition: '雨' | '雪' | '雨か雪' | '雪か雨';
  }

  export interface TimeSeriesRegion6HoursItemKindPrecipitationProbability {
    type: '降水確率';
    probabilities: TimeSeriesRegion6HoursItemPrecipitationProbability[];
  }

  export interface TimeSeriesRegion6HoursItem extends Components.CodeName {
    kinds: [
      TimeSeriesRegion6HoursItemKindPrecipitationProbability
    ];
  }

  export interface TimeSeriesRegion6Hours {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesRegion6HoursItem[];
  }

  export interface TimeSeriesRegion3HoursItemWeather {
    refId: string;
    name: string;
  }

  export interface TimeSeriesRegion3HoursItemKindWeather {
    type: '３時間内卓越天気';
    weathers: TimeSeriesRegion3HoursItemWeather[];
  }

  export interface TimeSeriesRegion3HoursItemWindDirection extends Omit<WindDirection, 'condition'> {
    refId: string;
  }

  export interface TimeSeriesRegion3HoursItemWindSpeedLevel extends WindSpeedLevel {
    refId: string;
  }

  export interface TimeSeriesRegion3HoursItemForecastWind {
    type: '３時間内代表風';
    directions: TimeSeriesRegion3HoursItemWindDirection[];
    speedLevels: TimeSeriesRegion3HoursItemWindSpeedLevel[];
  }


  export interface TimeSeriesRegion3HoursItem extends Components.CodeName {
    kinds: [
      TimeSeriesRegion3HoursItemKindWeather,
      TimeSeriesRegion3HoursItemForecastWind
    ];
  }

  export interface TimeSeriesRegion3Hours {
    timeDefines: Omit<TimeSeriesTimeDefine, 'name'>[];
    items: TimeSeriesRegion3HoursItem[];
  }

  export interface VPFD51Region {
    timeSeries: [
      TimeSeriesRegionDay,
      TimeSeriesRegion6Hours,
      TimeSeriesRegion3Hours
    ];
  }

  /**
   * 地点予報
   */

  export interface TimeSeriesStationDayItemTemperatureDiurnalMaximum extends Temperature<'日中の最高気温'> {
    refId: string;
  }

  export interface TimeSeriesStationDayItemTemperatureMaximum extends Temperature<'最高気温'> {
    refId: string;
  }

  export interface TimeSeriesStationDayItemTemperatureMorningMinimum extends Temperature<'朝の最低気温'> {
    refId: string;
  }

  export interface TimeSeriesStationDayItemKindTemperature {
    type: '気温';
    temperatures: [
      TimeSeriesStationDayItemTemperatureDiurnalMaximum,
      TimeSeriesStationDayItemTemperatureMaximum,
      TimeSeriesStationDayItemTemperatureMorningMinimum,
      TimeSeriesStationDayItemTemperatureDiurnalMaximum
    ] | [
      TimeSeriesStationDayItemTemperatureMorningMinimum,
      TimeSeriesStationDayItemTemperatureDiurnalMaximum
    ];
  }

  export interface TimeSeriesStationDayItem extends Components.CodeName {
    kinds: [
      TimeSeriesStationDayItemKindTemperature
    ];
  }

  export interface TimeSeriesStationDay {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesStationDayItem[];
  }


  export interface TimeSeriesStation3HoursItemTemperature extends Temperature<'気温'> {
    refId: string;
  }

  export interface TimeSeriesStation3HoursItemKindTemperature {
    type: '３時間毎気温';
    temperatures: TimeSeriesStation3HoursItemTemperature[];
  }

  export interface TimeSeriesStation3HoursItem extends Components.CodeName {
    kinds: [
      TimeSeriesStation3HoursItemKindTemperature
    ];
  }

  export interface TimeSeriesStation3Hours {
    timeDefines: Omit<TimeSeriesTimeDefine, 'duration' | 'name'>[];
    items: TimeSeriesStation3HoursItem[];
  }

  export interface VPFD51Station {
    timeSeries: [
      TimeSeriesStationDay,
      TimeSeriesStation3Hours
    ];
  }

  export interface AdditionalForecastItem extends Components.CodeName {
    text: string;
  }

  export interface AdditionalForecast {
    type: '独自予報';
    period: {
      dateTime: {
        value: string;
      };
      duration: string;
    };
    items: [AdditionalForecastItem];
  }

  export interface PublicBodyVPFD51 {
    region: VPFD51Region;
    station: VPFD51Station;
    additionForecasts?: [AdditionalForecast];
  }

  /**
   * 府県週間天気予報（VPFW50）
   */
  export interface TimeSeriesRegionWeekItemWeather extends Components.CodeName {
    refId: string;
  }

  export interface TimeSeriesRegionWeekItemKindWeather {
    type: '天気';
    weathers: TimeSeriesRegionWeekItemWeather[];
  }

  export interface TimeSeriesRegionWeekItemPrecipitationProbability extends PrecipitationProbability<'日降水確率'> {
    refId: string;
    condition?: never;
  }

  export interface TimeSeriesRegionWeekItemPrecipitationProbabilityNoValue extends Omit<PrecipitationProbability<'日降水確率'>, 'value'> {
    refId: string;
    value: null;
    condition: '値なし';
  }

  export interface TimeSeriesRegionWeekItemKindPrecipitationProbability {
    type: '降水確率';
    probabilities: (TimeSeriesRegionWeekItemPrecipitationProbabilityNoValue | TimeSeriesRegionWeekItemPrecipitationProbability)[];
  }

  export interface TimeSeriesRegionWeekItemReliabilityClass {
    refId: string;
    type: '信頼度階級';
    value: 'A' | 'B' | 'C';
    condition?: never;
  }

  export interface TimeSeriesRegionWeekItemReliabilityClassNoValue {
    refId: string;
    type: '信頼度階級';
    value: null;
    condition: '値なし';
  }

  export interface TimeSeriesRegionWeekItemKindReliabilityClass {
    type: '信頼度';
    reliabilityClasses: (TimeSeriesRegionWeekItemReliabilityClassNoValue | TimeSeriesRegionWeekItemReliabilityClass)[];
  }

  export interface TimeSeriesRegionWeekItem extends Components.CodeName {
    kinds: [
      TimeSeriesRegionWeekItemKindWeather,
      TimeSeriesRegionWeekItemKindPrecipitationProbability,
      TimeSeriesRegionWeekItemKindReliabilityClass
    ];
  }

  export interface TimeSeriesRegionWeek {
    timeDefines: Omit<TimeSeriesTimeDefine, 'name'>[];
    items: TimeSeriesRegionWeekItem[];
  }

  export interface VPFW50Region {
    timeSeries: [TimeSeriesRegionWeek];
  }

  export interface TimeSeriesStationWeekItemTemperatureRange<Type extends '最低気温' | '最高気温'> extends Temperature<Type> {
    refId: string;
    range: {
      type: `${Type}予測範囲`;
      unit: '度';
      from: string;
      to: string;
    };
    condition?: never;
  }

  export interface TimeSeriesStationWeekItemTemperatureRangeNoValue<Type extends '最低気温' | '最高気温'> extends Omit<Temperature<Type>, 'value'> {
    refId: string;
    range: {
      type: `${Type}予測範囲`;
      unit: '度';
      from: null;
      to: null;
    };
    value: null;
    condition: '値なし';
  }

  export interface TimeSeriesStationWeekItemKindTemperature {
    type: '最低・最高気温';
    minimums: (TimeSeriesStationWeekItemTemperatureRange<'最低気温'> | TimeSeriesStationWeekItemTemperatureRangeNoValue<'最低気温'>)[];
    maximums: (TimeSeriesStationWeekItemTemperatureRange<'最高気温'> | TimeSeriesStationWeekItemTemperatureRangeNoValue<'最高気温'>)[];
  }


  export interface TimeSeriesStationWeekItem extends Components.CodeName {
    kinds: [
      TimeSeriesStationWeekItemKindTemperature
    ];
  }

  export interface TimeSeriesStationWeek {
    timeDefines: Omit<TimeSeriesTimeDefine, 'name'>[];
    items: TimeSeriesStationWeekItem[];
  }

  export interface VPFW50Station {
    timeSeries: [TimeSeriesStationWeek];
  }

  export interface TimeSeriesReferenceItemTemperature<Type extends '最低気温平年値' | '最高気温平年値'> extends Omit<Temperature<Type>, 'value'> {
    refId: string;
  }

  export interface TimeSeriesReferenceItemKindTemperature {
    type: '最低・最高気温平年値';
    averageMinimums: TimeSeriesReferenceItemTemperature<'最低気温平年値'>[];
    averageMaximums: TimeSeriesReferenceItemTemperature<'最高気温平年値'>[];
  }

  export interface TimeSeriesReferenceItem extends Components.CodeName {
    kinds: [
      TimeSeriesReferenceItemKindTemperature
    ];
  }

  export interface TimeSeriesReference {
    timeDefines: Omit<TimeSeriesTimeDefine, 'name'>[];
    items: TimeSeriesReferenceItem[];
  }

  export interface ReferenceStatisticStationThresholds<Type extends string> {
    type: Type;
    unit: 'mm';
    value: string;
  }

  export interface ReferenceStatisticStation extends Components.CodeName {
    type: '降水量７日間合計階級閾値';
    thresholds: [
      ReferenceStatisticStationThresholds<'降水量７日間合計階級最小値'>,
      ReferenceStatisticStationThresholds<'降水量７日間合計階級かなり少ない'>,
      ReferenceStatisticStationThresholds<'降水量７日間合計階級少ない'>,
      ReferenceStatisticStationThresholds<'降水量７日間合計階級多い'>,
      ReferenceStatisticStationThresholds<'降水量７日間合計階級かなり多い'>,
      ReferenceStatisticStationThresholds<'降水量７日間合計階級最大値'>,
    ];
  }

  export interface ReferenceStatistic {
    type: '７日間平年値';
    period: {
      dateTime: {
        value: string;
      };
      duration: string;
    };
    stations: ReferenceStatisticStation[];
  }

  export interface Reference {
    timeSeries: [TimeSeriesReference];
    statistics: [ReferenceStatistic];
  }

  export interface PublicBodyVPFW50 {
    region: VPFW50Region;
    station: VPFW50Station;
    reference: Reference;
  }


  export interface PublicVPFD51 extends TelegramJSONMain {
    _schema: Schema;
    type: '府県天気予報（Ｒ１）';
    title: string;
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: string;
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: '府県天気予報';
    body: PublicBodyVPFD51;
  }

  export interface PublicVPFW50 extends TelegramJSONMain {
    _schema: Schema;
    type: '府県週間天気予報';
    title: string;
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: string;
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: '府県週間天気予報';
    body: PublicBodyVPFW50;
  }

  export type Main = PublicVPFD51 | PublicVPFW50;
}
