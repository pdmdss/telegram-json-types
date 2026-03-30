import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace ForecastWarningPossibility {
  export interface Schema {
    type: 'forecast-warning-possibility';
    version: '1.1.0';
  }

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export type PossibilityRankType = `${'大雨' | '土砂災害' | '雪' | '風（風雪）' | '波' | '潮位'}の警報級の可能性`;

  export type PossibilityRankOfWarning<Type extends PossibilityRankType> = {
    refId: string;
    type: Type;
    value: '中' | '高' | 'なし';
    condition?: never;
  } | {
    refId: string;
    type: Type;
    value: null;
    condition: '値なし';
  };

  export interface Text {
    text: string;
  }

  export interface TimeSeriesPropertyPossibilityRankOfWarning<Type extends PossibilityRankType> {
    type: Type;
    possibilityRankOfWarnings: PossibilityRankOfWarning<Type>[];
    texts?: [Text];
  }

  export type TimeSeriesPropertyRain = TimeSeriesPropertyPossibilityRankOfWarning<'大雨の警報級の可能性'>;
  export type TimeSeriesPropertyLandslide = TimeSeriesPropertyPossibilityRankOfWarning<'土砂災害の警報級の可能性'>;
  export type TimeSeriesPropertySnow = TimeSeriesPropertyPossibilityRankOfWarning<'雪の警報級の可能性'>;
  export type TimeSeriesPropertyWind = TimeSeriesPropertyPossibilityRankOfWarning<'風（風雪）の警報級の可能性'>;
  export type TimeSeriesPropertyWave = TimeSeriesPropertyPossibilityRankOfWarning<'波の警報級の可能性'>;
  export type TimeSeriesPropertyTide = TimeSeriesPropertyPossibilityRankOfWarning<'潮位の警報級の可能性'>;

  export type TimeSeriesProperty =
    TimeSeriesPropertyRain |
    TimeSeriesPropertyLandslide |
    TimeSeriesPropertySnow |
    TimeSeriesPropertyWind |
    TimeSeriesPropertyWave |
    TimeSeriesPropertyTide;

  export type TimeSeriesPropertiesRain = [TimeSeriesPropertyRain];
  export type TimeSeriesPropertiesLandslide = [TimeSeriesPropertyLandslide];
  export type TimeSeriesPropertiesSnow = [TimeSeriesPropertySnow];
  export type TimeSeriesPropertiesWind = [TimeSeriesPropertyWind];
  export type TimeSeriesPropertiesWave = [TimeSeriesPropertyWave];
  export type TimeSeriesPropertiesTide = [TimeSeriesPropertyTide];

  export type TimeSeriesKindProperties =
    TimeSeriesPropertiesRain |
    TimeSeriesPropertiesLandslide |
    TimeSeriesPropertiesSnow |
    TimeSeriesPropertiesWind |
    TimeSeriesPropertiesWave |
    TimeSeriesPropertiesTide;

  export interface TimeSeriesKind<P extends [TimeSeriesProperty]> {
    properties: P;
  }

  export type TimeSeriesKinds = [
    TimeSeriesKind<TimeSeriesPropertiesRain>,
    TimeSeriesKind<TimeSeriesPropertiesLandslide>,
    TimeSeriesKind<TimeSeriesPropertiesSnow>,
    TimeSeriesKind<TimeSeriesPropertiesWind>,
    TimeSeriesKind<TimeSeriesPropertiesWave>,
    TimeSeriesKind<TimeSeriesPropertiesTide>
  ] | [
    TimeSeriesKind<TimeSeriesPropertiesRain>,
    TimeSeriesKind<TimeSeriesPropertiesLandslide>,
    TimeSeriesKind<TimeSeriesPropertiesSnow>,
    TimeSeriesKind<TimeSeriesPropertiesWind>,
      TimeSeriesKind<TimeSeriesPropertiesWave> |
      TimeSeriesKind<TimeSeriesPropertiesTide>
  ] | [
    TimeSeriesKind<TimeSeriesPropertiesRain>,
    TimeSeriesKind<TimeSeriesPropertiesLandslide>,
    TimeSeriesKind<TimeSeriesPropertiesSnow>,
    TimeSeriesKind<TimeSeriesPropertiesWind>
  ];

  export interface TimeSeriesItem extends Components.CodeName {
    kinds: TimeSeriesKinds;
  }

  export interface TimeSeries {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesItem[];
  }

  export interface Region {
    type: '区域予報';
    timeSeries: [TimeSeries];
  }

  export interface PublicBody {
    region: Region;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '早期注意情報（明後日まで）' | string;
    title: string;
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: string;
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: string;
    body: PublicBody;
  }

  export type Main = Public;
}
