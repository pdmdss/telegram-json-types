import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace ForecastSeason {
  export interface Schema {
    type: 'forecast-season';
    version: '1.0.0';
  }

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export interface SeasonSummarySignificant {
    type: '気温' | '降水量' | '日照時間' | '降雪量';
    value: string;
  }

  export interface SeasonSummary {
    text?: string;
    significances: SeasonSummarySignificant[];
  }

  export interface SeasonProbability<Type = '気温' | '降水量' | '日照時間' | '降雪量'> {
    type: Type;
    belowNormal: {
      type: `平年より${Type extends '気温' ? '低い' : '少ない'}確率`;
      unit: '%';
      value: string;
      significant?: true;
    };
    norma: {
      type: '平年並みの確率';
      unit: '%';
      value: string;
      significant?: true;
    };
    aboveNormal: {
      type: `平年より${Type extends '気温' ? '高い' : '多い'}確率`;
      unit: '%';
      value: string;
      significant?: true;
    };
  }

  export interface Target extends Components.CodeName {
  }

  export interface SeasonZone extends Components.CodeName {
  }

  export interface SeasonItemSummaryKind {
    type: '出現の可能性が最も大きい天候と、特徴のある気温、降水量等の確率';
    summaries: [SeasonSummary] | [];
  }

  export interface SeasonItemSummary {
    kinds: [
      SeasonItemSummaryKind
    ];
    zones: [SeasonZone];
    condition?: never;
  }

  export interface SeasonItemSummaryNoElement {
    condition: '要素なし';
  }

  export interface SeasonItemProbabilityKind {
    type: '地域・期間平均平年偏差各階級の確率';
    probabilities: [SeasonProbability];
  }

  export interface SeasonItemProbability {
    kinds: [
      SeasonItemProbabilityKind
    ];
    zones: [SeasonZone];
  }

  export interface SeasonPeriod {
    dateTime: {
      value: string;
      validFormat: 'yyyy-mm-dd';
    };
    duration: 'P1M' | 'P2M' | 'P3M';
    name: '向こう１か月' | '向こう３か月' | '冬（１２月から２月）' | '夏（６月から８月）' |
      '梅雨の時期（６月から７月、沖縄・奄美では５月から６月）' | '梅雨の時期（５月から６月）' |
      '梅雨の時期（九州南部では６月から７月、奄美地方では５月から６月）' | '梅雨の時期（６月から７月）';
  }

  export interface Season {
    type: '季節予報';
    period: SeasonPeriod;
    items: [SeasonItemSummary | SeasonItemSummaryNoElement, ...SeasonItemProbability[]];
  }

  export interface TimeSeriesZoneItemSummary extends SeasonSummary {
    refId: string;
  }

  export interface TimeSeriesZoneItemSummaryKind {
    type: '出現の可能性が最も大きい天候と、特徴のある気温、降水量等の確率';
    summaries: TimeSeriesZoneItemSummary[];
  }

  export interface TimeSeriesZoneItemProbability extends SeasonProbability {
    refId: string;
  }

  export interface TimeSeriesZoneItemProbabilityKind {
    type: '地域・期間平均平年偏差各階級の確率';
    probabilities: TimeSeriesZoneItemProbability[];
  }

  export interface TimeSeriesZoneItemKindSummary {
    kinds: [TimeSeriesZoneItemSummaryKind];
    zones: [SeasonZone];
  }

  export interface TimeSeriesZoneItemKindProbability {
    kinds: [TimeSeriesZoneItemProbabilityKind];
    zones: [SeasonZone];
  }

  export interface TimeSeriesZone {
    timeDefines: TimeSeriesTimeDefine[];
    items: [TimeSeriesZoneItemKindSummary, ...TimeSeriesZoneItemKindProbability[]];
  }

  export interface NextForecastSchedule {
    type: '１か月予報' | '３か月予報' | '暖候期予報' | '寒候期予報';
    text: string;
    dateTime: string;
  }

  export interface ForecastAddition {
    nextForecastSchedules: NextForecastSchedule[];
    scheduleNotice: string | null;
    additionalNotice: string | null;
  }

  export interface PublicBody {
    notice?: string;
    target: Target;
    seasons: Season[];
    timeSeries?: TimeSeriesZone[];
    forecastAddition: ForecastAddition;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '全般１か月予報' | '地方１か月予報' | '全般３か月予報' | '地方３か月予報' | '全般暖・寒候期予報' | '地方暖・寒候期予報';
    title: string;
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: string;
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: '季節予報';
    body: PublicBody;
  }

  export type Main = Public;
}
