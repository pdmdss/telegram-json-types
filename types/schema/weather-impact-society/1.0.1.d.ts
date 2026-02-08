import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace WeatherImpactSociety {
  export interface Schema {
    type: 'weather-impact-society';
    version: '1.0.1';
  }

  export interface Target extends Components.CodeName {
  }

  export interface TargetTimeDateTime {
    value: string;
    validFormat: string;
  }

  export interface TargetTime {
    dateTime: TargetTimeDateTime;
    duration?: string;
  }

  export interface MainTextZone extends Components.CodeName {
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

  export interface StatisticStation extends Components.CodeName {
    type: '天候の状況（速報値）';
    remark?: string;
    observedValues: StatisticStationObservedValue[];
  }

  export interface Statistic {
    type: '気象官署及び特別地域気象観測所' | 'アメダス';
    period: StatisticPeriod;
    text?: string;
    stations: StatisticStation[];
  }

  export interface SeasonZoneEventDataDate {
    value: string;
    dubious: '頃';
  }

  export interface SeasonZoneEventData {
    date?: SeasonZoneEventDataDate;
    normal: SeasonZoneEventDataDate;
    lastYear?: SeasonZoneEventDataDate;
    remark?: string;
  }

  export interface SeasonZone extends Components.CodeName {
    type: '梅雨入り' | '梅雨明け';
    eventData: SeasonZoneEventData;
  }

  export interface Season {
    type: '梅雨';
    zones: SeasonZone[];
  }

  export interface PublicBody {
    notice?: string;
    target: Target;
    targetTime: TargetTime;
    mainTexts: MainText [];
    statistics?: Statistic[];
    comment?: string;
  }

  export interface PublicBodySeason extends PublicBody {
    season: Season;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '全般天候情報' | '地方天候情報';
    title: string;
    infoType: '発表' | '訂正' | '取消';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: string;
    eventId: string;
    serialNo: string;
    infoKind: '天候情報';
    body: PublicBody;
  }

  export interface PublicZoneSeason extends Public {
    type: '地方天候情報';
    validDateTime?: never;
    body: PublicBodySeason;
  }

  export type Main = Public | PublicZoneSeason;
}
