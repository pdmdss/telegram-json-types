import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace ForecastWarningPossibility {
  export interface Schema {
    type: 'forecast-warning-possibility';
    version: '1.0.0';
  }

  export interface WindSpeed {
    type: '最大風速';
    unit: 'm/s';
    value: string;
    condition?: '以下' | '以上';
    range?: never;
  }

  export interface WindSpeedRange {
    type: '最大風速';
    range: {
      type: '範囲';
      unit: 'm/s';
      from: string;
      to: string;
    };
    value?: never;
    condition?: never;
  }

  export interface WaveHeight {
    type: '波高';
    unit: 'm';
    value: string;
    condition?: '以下' | '以上';
    range?: never;
  }

  export interface WaveHeightNoValue {
    type: '波高';
    unit: 'm';
    value: null;
    condition: '流氷に覆われている' | string;
    range?: never;
  }

  export interface WaveHeightRange {
    type: '波高';
    range: {
      type: '範囲';
      unit: 'm';
      from: string;
      to: string;
    };
    value?: never;
    condition?: never;
  }

  export interface Precipitation<Type extends '１時間最大雨量' | '３時間最大雨量' | '２４時間最大雨量'> {
    type: Type;
    unit: 'mm';
    value: string;
    condition?: '以下' | '以上';
    range?: never;
  }

  export interface PrecipitationRange<Type extends '１時間最大雨量' | '３時間最大雨量' | '２４時間最大雨量'> {
    type: Type;
    range: {
      type: '範囲';
      unit: 'mm';
      from: string;
      to: string;
    };
    value?: never;
    condition?: never;
  }

  export interface SnowfallDepth<Type extends '６時間最大降雪量' | '２４時間最大降雪量'> {
    type: Type;
    unit: 'cm';
    value: string;
    condition?: '以上';
    range?: never;
  }

  export interface SnowfallDepthRange<Type extends '６時間最大降雪量' | '２４時間最大降雪量'> {
    type: Type;
    range: {
      type: '範囲';
      unit: 'cm';
      from: string;
      to: string;
    };
    value?: never;
    condition?: never;
  }

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export interface TimeSeriesItemPrecipitationNoRangeDetail<Type extends '１時間最大雨量' | '３時間最大雨量'> {
    refId: string;
    text: string;
    base: {
      locals: [
        {
          name: null;
          precipitation: Precipitation<Type>;
        }
      ] |
        {
          name: string;
          precipitation: Precipitation<Type>;
        }[]
    };
    subArea?: {
      name: string;
      base: {
        precipitation: Precipitation<Type>;
      };
    };
  }

  export interface TimeSeriesItemKindPrecipitationNoRange<Type extends '１時間最大雨量' | '３時間最大雨量'> {
    type: Type;
    details: TimeSeriesItemPrecipitationNoRangeDetail<Type>[];
  }

  export interface TimeSeriesItemSnowfallDepthNoRangeDetail {
    refId: string;
    text: string;
    base: {
      locals: [
        {
          name: null;
          depth: SnowfallDepth<'６時間最大降雪量'>;
        }
      ] |
        {
          name: string;
          depth: SnowfallDepth<'６時間最大降雪量'>;
        }[]
    };
    subArea?: {
      name: string;
      base: {
        depth: SnowfallDepth<'６時間最大降雪量'>;
      };
    };
  }

  export interface TimeSeriesItemKindSnowfallDepthNoRange {
    type: '６時間最大降雪量';
    details: TimeSeriesItemSnowfallDepthNoRangeDetail[];
  }

  export interface TimeSeriesItemWindSpeedDetail {
    refId: string;
    text: string;
    base: {
      locals: [
        {
          name: null;
          speed: WindSpeed | WindSpeedRange;
        }
      ] |
        {
          name: string;
          speed: WindSpeed | WindSpeedRange;
        }[]
    };
    subArea?: {
      name: string;
      base: {
        speed: WindSpeed | WindSpeedRange;
      };
    };
  }

  export interface TimeSeriesItemKindWindSpeed {
    type: '最大風速';
    details: TimeSeriesItemWindSpeedDetail[];
  }

  export interface TimeSeriesItemWaveHeightDetail {
    refId: string;
    text: string;
    base: {
      locals: [
        {
          name: null;
          height: WaveHeight | WaveHeightRange | WaveHeightNoValue;
        }
      ] |
        {
          name: string;
          height: WaveHeight | WaveHeightRange | WaveHeightNoValue;
        }[]
    };
    subArea?: {
      name: string;
      base: {
        height: WaveHeight | WaveHeightRange | WaveHeightNoValue;
      };
    };
  }

  export interface TimeSeriesItemKindWaveHeight {
    type: '波';
    details: TimeSeriesItemWaveHeightDetail[];
  }


  export interface TimeSeries6HoursItem extends Components.CodeName {
    kinds: [
      TimeSeriesItemKindPrecipitationNoRange<'１時間最大雨量'>,
      TimeSeriesItemKindPrecipitationNoRange<'３時間最大雨量'>,
      TimeSeriesItemKindSnowfallDepthNoRange,
      TimeSeriesItemKindWindSpeed,
      TimeSeriesItemKindWaveHeight
    ] | [
      TimeSeriesItemKindPrecipitationNoRange<'１時間最大雨量'>,
      TimeSeriesItemKindPrecipitationNoRange<'３時間最大雨量'>,
      TimeSeriesItemKindSnowfallDepthNoRange,
      TimeSeriesItemKindWindSpeed,
    ];
  }

  export interface TimeSeries6Hours {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeries6HoursItem[];
  }

  export interface TimeSeriesItemPrecipitationDetail {
    refId: string;
    text: string;
    base: {
      locals: [
        {
          name: null;
          precipitation: Precipitation<'２４時間最大雨量'> | PrecipitationRange<'２４時間最大雨量'>;
        }
      ] |
        {
          name: string;
          precipitation: Precipitation<'２４時間最大雨量'> | PrecipitationRange<'２４時間最大雨量'>;
        }[]
    };
    subArea?: {
      name: string;
      base: {
        precipitation: Precipitation<'２４時間最大雨量'> | PrecipitationRange<'２４時間最大雨量'>;
      };
    };
  }

  export interface TimeSeriesItemKindPrecipitation {
    type: '２４時間最大雨量';
    details: TimeSeriesItemPrecipitationDetail[];
  }

  export interface TimeSeriesItemSnowfallDepthDetail {
    refId: string;
    text: string;
    base: {
      locals: [
        {
          name: null;
          depth: SnowfallDepth<'２４時間最大降雪量'> | SnowfallDepthRange<'２４時間最大降雪量'>;
        }
      ] |
        {
          name: string;
          depth: SnowfallDepth<'２４時間最大降雪量'> | SnowfallDepthRange<'２４時間最大降雪量'>;
        }[]
    };
    subArea?: {
      name: string;
      base: {
        depth: SnowfallDepth<'２４時間最大降雪量'> | SnowfallDepthRange<'２４時間最大降雪量'>;
      };
    };
  }

  export interface TimeSeriesItemKindSnowfallDepth {
    type: '２４時間最大降雪量';
    details: TimeSeriesItemSnowfallDepthDetail[];
  }

  export interface TimeSeries24HoursItem extends Components.CodeName {
    kinds: [
      TimeSeriesItemKindPrecipitation,
      TimeSeriesItemKindSnowfallDepth
    ];
  }

  export interface TimeSeries24Hours {
    timeDefines: [TimeSeriesTimeDefine];
    items: TimeSeries24HoursItem[];
  }

  export interface TimeSeriesPossibilityRanksItemRank<Type extends '雨' | '雪' | '風（風雪）' | '波' | '潮位'> {
    refId: string;
    type: `${Type}の警報級の可能性`;
    value: '高' | '中' | 'なし' | null;
    condition?: '値なし';
  }

  export interface TimeSeriesPossibilityRanksItemKind<Type extends '雨' | '雪' | '風（風雪）' | '波' | '潮位'> {
    type: `${Type}の警報級の可能性`;
    text?: string;
    possibilityRanks: TimeSeriesPossibilityRanksItemRank<Type>[];
  }

  export interface TimeSeriesPossibilityRanksItem extends Components.CodeName {
    kinds: [
      TimeSeriesPossibilityRanksItemKind<'雨'>,
      TimeSeriesPossibilityRanksItemKind<'雪'>,
      TimeSeriesPossibilityRanksItemKind<'風（風雪）'>,
      TimeSeriesPossibilityRanksItemKind<'波'>,
      TimeSeriesPossibilityRanksItemKind<'潮位'>
    ] | [
      TimeSeriesPossibilityRanksItemKind<'雨'>,
      TimeSeriesPossibilityRanksItemKind<'雪'>,
      TimeSeriesPossibilityRanksItemKind<'風（風雪）'>
    ];
  }


  export interface TimeSeriesPossibilityRanks<TimeDefineName extends boolean = true> {
    timeDefines: TimeDefineName extends true ? TimeSeriesTimeDefine[] : Omit<TimeSeriesTimeDefine, 'name'>[];
    items: TimeSeriesPossibilityRanksItem[];
  }

  export interface PublicBodyVPFD60 {
    timeSeries: [
      TimeSeries6Hours,
      TimeSeries24Hours,
      TimeSeriesPossibilityRanks
    ];
  }

  export interface PublicBodyVPFW60 {
    timeSeries: [
      TimeSeriesPossibilityRanks<false>
    ];
  }

  export interface PublicVPFD60 extends TelegramJSONMain {
    _schema: Schema;
    type: '警報級の可能性（明日まで）';
    title: string;
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: string;
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: '警報級の可能性（明日まで）';
    body: PublicBodyVPFD60;
  }

  export interface PublicVPFW60 extends TelegramJSONMain {
    _schema: Schema;
    type: '警報級の可能性（明後日以降）';
    title: string;
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: string;
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: '警報級の可能性（明後日以降）';
    body: PublicBodyVPFW60;
  }

  export type Main = PublicVPFD60 | PublicVPFW60;
}
