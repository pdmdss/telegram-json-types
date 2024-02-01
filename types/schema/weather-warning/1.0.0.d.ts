import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace WeatherWarning {
  export interface Schema {
    type: 'weather-warning';
    version: '1.0.0';
  }

  export interface KindNextKindDateTime {
    value: string;
    validFormat: string;
    precision: string;
  }

  export interface KindNextKind extends Components.CodeName {
    condition?: '土砂災害' | '浸水害' | '土砂災害、浸水害';
    dateTime: KindNextKindDateTime;
  }


  export interface Kind extends Components.CodeName {
    status: '発表' | '継続' | '特別警報から警報' | '特別警報から注意報' | '警報から注意報' | '解除';
    condition?: '土砂災害' | '浸水害' | '土砂災害、浸水害';
    attentions?: string[];
    additions?: string[];
    lastKind?: Components.CodeName;
    nextKinds?: KindNextKind[];
  }

  export interface KindVPOA50 extends Components.CodeName {
    status: '発表' | 'なし';
  }

  export interface PrefectureBase extends Components.CodeName {
    kinds: Kind[];
    changeStatus: '警報・注意報種別に変化有' | '警報・注意報種別に変化無、量的予想事項等に変化有' | '変化無';
    fullStatus: '全域' | '一部';
    editingMark: boolean;
    condition?: never;
  }

  export interface PrefectureNone extends Components.CodeName {
    kinds: [];
    changeStatus?: never;
    fullStatus?: never;
    editingMark?: never;
    condition: '発表警報・注意報はなし';
  }

  export type Prefecture = PrefectureBase | PrefectureNone;

  export interface PrefectureVPOA50 extends Components.CodeName {
    kinds: [KindVPOA50];
  }

  export type Region = Prefecture;
  export type Area = Prefecture;
  export type City = Omit<PrefectureBase, 'fullStatus' | 'editingMark'> | PrefectureNone;

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export interface TimeSeriesItemKindRiskDegreeLocalSignificance extends Components.CodeName {
    refId: string;
  }

  export interface TimeSeriesItemKindRiskDegreeLocalPeakTime {
    date?: string;
    term: string;
  }

  export interface TimeSeriesItemKindRiskDegreeLocalFuture extends Components.CodeName {
    sentence: string;
  }

  export interface TimeSeriesItemKindRiskDegreeLocal {
    name: string | null;
    significances: TimeSeriesItemKindRiskDegreeLocalSignificance[];
    peakTime?: TimeSeriesItemKindRiskDegreeLocalPeakTime;
    attentions?: string[];
    additions?: string[];
    future?: TimeSeriesItemKindRiskDegreeLocalFuture;
  }

  export interface TimeSeriesItemKindRiskDegree {
    type: string;
    locals: TimeSeriesItemKindRiskDegreeLocal[];
  }

  export interface TimeSeriesItemKindQuantitativeTimelineLocalForecastValue {
    refId: string;
    unit: string;
    value: string | null;
    condition?: string;
  }

  export interface TimeSeriesItemKindQuantitativeTimelineLocalForecastNotValue {
    refId: string;
    unit: string;
    value: null;
    condition?: '値なし';
  }

  export type TimeSeriesItemKindQuantitativeTimelineLocalForecast =
    TimeSeriesItemKindQuantitativeTimelineLocalForecastValue
    | TimeSeriesItemKindQuantitativeTimelineLocalForecastNotValue

  export interface TimeSeriesItemKindQuantitativeTimelineLocal {
    name: string | null;
    forecasts: TimeSeriesItemKindQuantitativeTimelineLocalForecast [];
  }

  export interface TimeSeriesItemKindQuantitativeWholeLocalForecastValue {
    unit: string;
    value: string;
    condition?: string;
  }

  export interface TimeSeriesItemKindQuantitativeWholeLocalForecastNotValue {
    unit: string;
    value: null;
    condition: '値なし';
  }

  export type TimeSeriesItemKindQuantitativeWholeLocalForecast =
    TimeSeriesItemKindQuantitativeWholeLocalForecastValue
    | TimeSeriesItemKindQuantitativeWholeLocalForecastNotValue;

  export interface TimeSeriesItemKindQuantitativeWholeLocal {
    name: string | null;
    forecast: TimeSeriesItemKindQuantitativeWholeLocalForecast;
  }

  export interface TimeSeriesItemKindQuantitativeTimeline {
    type: string;
    forecastType: 'timeline';
    locals: TimeSeriesItemKindQuantitativeTimelineLocal [];
  }

  export interface TimeSeriesItemKindQuantitativeWhole {
    type: string;
    forecastType: 'whole';
    locals: TimeSeriesItemKindQuantitativeWholeLocal[];
  }

  export type TimeSeriesItemKindQuantitative =
    TimeSeriesItemKindQuantitativeTimeline
    | TimeSeriesItemKindQuantitativeWhole;

  export interface TimeSeriesItemKind extends Components.CodeName {
    riskDegrees: TimeSeriesItemKindRiskDegree[];
    quantitative?: TimeSeriesItemKindQuantitative[];
  }

  export interface TimeSeriesItem extends Components.CodeName {
    kinds: TimeSeriesItemKind[];
  }

  export interface TimeSeries {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesItem[];
  }

  export interface PublicBodyVPWW54 {
    notice?: string;
    prefectures: Prefecture[];
    regions: Region[];
    areas: Area[];
    cities: City[];
    timeSeries?: [TimeSeries] | [TimeSeries, TimeSeries];
  }

  export interface PublicBodyVPOA50 {
    notice?: string;
    prefectures: PrefectureVPOA50[];
  }

  export interface PublicVPWW54 extends TelegramJSONMain {
    _schema: Schema;
    type: '気象警報・注意報（Ｈ２７）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: null;
    serialNo: null;
    infoKind: '気象警報・注意報';
    body: PublicBodyVPWW54;
  }

  export interface PublicVPOA50 extends TelegramJSONMain {
    _schema: Schema;
    type: '記録的短時間大雨情報';
    title: string;
    infoType: '発表' | '訂正' | '取消';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: string;
    serialNo: string;
    infoKind: '記録的短時間大雨情報';
    body: PublicBodyVPOA50;
  }

  export type Main = PublicVPWW54 | PublicVPOA50;
}
