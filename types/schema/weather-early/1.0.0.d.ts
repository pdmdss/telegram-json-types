import { TelegramJSONMain } from '@t/main';
import { CodeName } from '@t/component/code-name';

export namespace WeatherEarly {
  export interface Schema {
    type: 'weather-early';
    version: '1.0.0';
  }

  export interface Target extends CodeName {
  }

  export interface TargetTimeDateTime {
    value: string;
    validFormat: string;
  }

  export interface TargetTime {
    dateTime: TargetTimeDateTime;
    duration?: string;
  }

  export interface MainTextZone extends CodeName {
  }


  export interface MainText {
    text: string;
    zones: MainTextZone[];
  }

  export interface StatisticPeriodDateTime {
    value: string;
    validFormat?: string;
  }

  export interface StatisticPeriod {
    dateTime: StatisticPeriodDateTime;
    duration: string;
    name: string;
  }

  export interface StatisticStationObservedValue {
    type: string;
    unit: string;
    value: string | null;
    condition?: string;
  }

  export interface StatisticStation extends CodeName {
    type: '天候の状況（速報値）';
    observedValues: StatisticStationObservedValue[];
  }


  export interface EarlyBaseZone extends CodeName {
  }

  export interface EarlyBase {
    type: string;
    forecasts: Object;
    zones: EarlyBaseZone[];
  }

  export interface EarlyHighForecastProbabilityAboveNormal {
    unit: '%';
    value: string;
    bound: '以上';
  }

  export interface EarlyHighForecastThresholdAboveNormal {
    unit: '%' | '℃';
    value: string;
    bound: '以上';
  }

  export interface EarlyLowForecastProbabilityBelowNormal {
    unit: '%';
    value: string;
    bound: '以上';
  }

  export interface EarlyLowForecastThresholdBelowNormal {
    unit: '℃';
    value: string;
    bound: '以下';
  }

  export interface EarlyHighForecast {
    probabilityAboveNormal: EarlyHighForecastProbabilityAboveNormal;
    thresholdAboveNormal: EarlyHighForecastThresholdAboveNormal;
  }

  export interface EarlyLowForecast {
    probabilityBelowNormal: EarlyLowForecastProbabilityBelowNormal;
    thresholdBelowNormal: EarlyLowForecastThresholdBelowNormal;
  }

  export interface EarlyHigh extends EarlyBase {
    type: 'かなりの高温' | '大雪';
    forecasts: EarlyHighForecast;
  }

  export interface EarlyLow extends EarlyBase {
    type: 'かなりの低温';
    forecasts: EarlyLowForecast;
  }

  export type Early = EarlyHigh | EarlyLow;

  export interface PublicBody {
    notice?: string;
    target: Target;
    targetTime: TargetTime;
    mainTexts: [MainText];
    early: Early[];
  }


  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '早期天候情報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: '頃';
    targetDuration: string;
    validDateTime: string;
    eventId: null;
    serialNo: null;
    infoKind: '早期天候情報';
    body: PublicBody;
  }

  export type Main = Public;
}
