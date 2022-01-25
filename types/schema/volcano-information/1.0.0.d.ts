import { TelegramJSONMain } from '../../main';
import { Coordinate } from '../component/coordinate';

export namespace VolcanoInformation {
  export interface Schema {
    type: 'volcano-information';
    version: '1.0.0';
  }

  export type VolcanoCoordinate = Required<Coordinate>;
  export type Direction8 = '北' | '北東' | '東' | '南東' | '南' | '南西' | '西' | '北西';

  export interface TargetCrater {
    name: string | null;
    coordinate: VolcanoCoordinate;
  }

  export interface TargetKind {
    code: string;
    name: string;
  }

  export interface TargetKindEWF extends TargetKind {
    formalName?: string;
    condition: string;
    lastKind: {
      code: string;
      name: string;
    };
  }

  export interface Target {
    code: string;
    name: string;
    coordinate: VolcanoCoordinate;
    areaFromMark?: string;
    crater?: TargetCrater;
    kind: TargetKind;
  }

  export interface TargetEWF extends Target {
    crater: never;
    kind: TargetKindEWF;
  }

  export interface CityKind {
    code: string;
    name: string;
  }

  export interface CityKindVFVO50 extends CityKind {
    condition: string;
    lastKind: {
      name: string;
      code: string;
    };
  }

  export interface City {
    code: string;
    name: string;
    kinds: CityKind[];
  }

  export interface CityVFVO50 extends City {
    kinds: [CityKindVFVO50];
  }

  export interface CityVFVO56 extends City {
    kinds: [CityKind];
  }

  export interface OceanZoneKind {
    code: string;
    name: string;
    condition: string;
    lastKind: {
      name: string;
      code: string;
    };
  }

  export interface OceanZone {
    code: string;
    name: string;
    kinds: [OceanZoneKind];
  }

  export interface DisasterPreventionKind {
    code: string;
    name: string;
    condition: string;
    lastKind: {
      name: string;
      code: string;
    };
  }

  export interface DisasterPrevention {
    code: string;
    name: string;
    kinds: [DisasterPreventionKind];
  }

  export interface Comments {
    headline?: string;
    activity?: string;
    prevention?: string;
    nextAdvisor?: string;
    otherInfo?: string;
    appendix?: string;
    text?: string;
  }

  export interface EruptionEventDateTime {
    value: string;
    validFormat: string;
    dubious?: '頃';
  }

  export type EruptionPlumeHeightAboveCrater = {
    type: '火口上噴煙高度' | '海面上噴煙高度';
    unit: 'm';
  } & ({
    value: string;
    condition?: '以上';
  } | {
    value: null;
    condition?: '噴煙なし' | '不明';
  })

  export type EruptionPlumeHeightSeaLevel = {
    type: '海抜噴煙高度';
    unit: 'ft';
  } & ({
    value: string;
    condition?: '以上';
  } | {
    value: null;
    condition?: '噴煙なし' | '不明';
  })

  export type EruptionPlumeDirection = {
    type: '噴煙の流向';
    unit: '漢字';
  } & ({
    value: Direction8 | '直上' | '流行不明';
    condition: never;
  } | {
    value: null;
    condition: '噴煙なし';
  })

  export interface EruptionPlume {
    heightAboveCrater?: EruptionPlumeHeightAboveCrater;
    heightSeaLevel?: EruptionPlumeHeightSeaLevel;
    direction?: EruptionPlumeDirection;
    comment?: string;
  }

  export interface Eruption {
    eventDateTime?: EruptionEventDateTime;
    colorPlume?: EruptionPlume;
    whitePlume?: EruptionPlume;
    appendix?: string;
    otherObservation?: string;
  }

  export type AshForecastItemSize = {
    type: '降灰量';
    unit: 'g/m2';
    value: string;
  } | {
    type: '降灰の厚さ';
    unit: 'mm';
    value: string;
  } | {
    type: '小さな噴石の大きさ';
    unit: 'cm';
    value: string;
  }

  export interface AshForecastItemDirection {
    type: '降灰の方向' | '小さな噴石の落下方向';
    unit: '漢字';
    value: Direction8 | '火口近傍' | '方向不定';
  }

  export interface AshForecastItemDistance {
    type: '降灰の到達距離' | '小さな噴石の到達距離';
    unit: 'km';
    value: string;
  }

  export interface AshForecastItemCity {
    code: string;
    name: string;
  }

  export interface AshForecastItem {
    code: string;
    name: string;
    polygons: [number, number][][];
    size: AshForecastItemSize;
    direction: AshForecastItemDirection;
    distance: AshForecastItemDistance;
    remake?: string;
    cities: AshForecastItemCity[];
  }

  export interface AshForecast {
    type: '予報';
    elapsedTime: string;
    startTime: string;
    endTime: string;
    items: AshForecastItem;
  }

  export interface Ash {
    forecasts: AshForecast[];
  }

  export interface PublicBodyVFVO50 {
    notice?: string;
    target: TargetEWF;
    cities: CityVFVO50[];
    disasterPreventions: DisasterPrevention[];
    comment: Comments;
    text?: string;
  }

  export interface PublicBodyVFVO51 {
    notice?: string;
    targets: TargetEWF[];
    comment: Comments;
    text?: string;
  }

  export interface PublicBodyVFVO52 {
    notice?: string;
    target: Target;
    eruption: Eruption;
    text?: string;
  }

  export interface PublicBodyVFVO53 {
    notice?: string;
    target: Target;
    cities: City[];
    comment: Comments;
    ash: Ash;
    text?: string;
  }

  export interface PublicBodyVFVO54 {
    notice?: string;
    target: Target;
    cities: City[];
    eruption: Eruption;
    comment: Comments;
    ash: Ash;
    text?: string;
  }

  export interface PublicBodyVFVO55 extends PublicBodyVFVO54 {
  }

  export interface PublicBodyVFVO56 {
    notice?: string;
    target: Target;
    cities: CityVFVO56[];
    eruption: Pick<Eruption, 'eventDateTime'>;
    comment: Comments;
    text?: string;
  }

  export interface PublicBodyVFSVii {
    notice?: string;
    target: TargetEWF;
    oceanZones: OceanZone[];
    comment: Comments;
    text?: string;
  }

  export interface PublicBodyVZVO40 {
    text: string;
  }

  export interface CancelBody {
    text: string;
  }

  export interface PublicVFVO50 extends TelegramJSONMain {
    _schema: Schema;
    type: '噴火警報・予報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '噴火警報・予報';
    body: PublicBodyVFVO50;
  }

  export interface PublicVFVO51 extends TelegramJSONMain {
    _schema: Schema;
    type: '火山の状況に関する解説情報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '火山の状況に関する解説情報';
    body: PublicBodyVFVO51;
  }

  export interface PublicVFVO52 extends Omit<TelegramJSONMain, 'targetDateTime'> {
    _schema: Schema;
    type: '噴火に関する火山観測報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTime: string | null;
    targetDateTimeDubious?: '年頃' | '月頃' | '日頃' | '時頃' | '分頃' | '秒頃' | '頃';
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '噴火に関する火山観測報';
    body: PublicBodyVFVO52;
  }

  export interface PublicVFVO53 extends TelegramJSONMain {
    _schema: Schema;
    type: '降灰予報（定時）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTime: string;
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: string;
    eventId: string;
    serialNo: string;
    infoKind: '降灰予報';
    body: PublicBodyVFVO53;
  }

  export interface PublicVFVO54 extends TelegramJSONMain {
    _schema: Schema;
    type: '降灰予報（速報）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTime: string;
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: string;
    eventId: string;
    serialNo: string;
    infoKind: '降灰予報';
    body: PublicBodyVFVO54;
  }

  export interface PublicVFVO55 extends TelegramJSONMain {
    _schema: Schema;
    type: '降灰予報（詳細）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTime: string;
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: string;
    eventId: string;
    serialNo: string;
    infoKind: '降灰予報';
    body: PublicBodyVFVO55;
  }

  export interface PublicVFVO56 extends TelegramJSONMain {
    _schema: Schema;
    type: '噴火速報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTime: string;
    targetDateTimeDubious?: '年頃' | '月頃' | '日頃' | '時頃' | '分頃' | '秒頃' | '頃';
    targetDuration: never;
    validDateTime: string;
    eventId: string;
    serialNo: null;
    infoKind: '噴火速報';
    body: PublicBodyVFVO56;
  }

  export interface PublicVFSVii extends TelegramJSONMain {
    _schema: Schema;
    type: '火山現象に関する海上警報・海上予報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '火山現象に関する海上警報・海上予報';
    body: PublicBodyVFSVii;
  }

  export interface PublicVZVO40 extends TelegramJSONMain {
    _schema: Schema;
    type: '火山に関するお知らせ';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTime: string;
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: string;
    eventId: string;
    serialNo: null;
    infoKind: '火山に関するお知らせ';
    body: PublicBodyVZVO40;
  }

  export interface Cancel extends TelegramJSONMain {
    _schema: Schema;
    type: '噴火警報・予報' | '火山の状況に関する解説情報' | '噴火に関する火山観測報' | '降灰予報（定時）' | '降灰予報（速報）' | '降灰予報（詳細）' | '噴火速報' | '火山現象に関する海上警報・海上予報' | '火山に関するお知らせ';
    title: string;
    infoType: '取消';
    targetDateTimeDubious?: '年頃' | '月頃' | '日頃' | '時頃' | '分頃' | '秒頃' | '頃';
    targetDuration: never;
    validDateTime?: string;
    eventId: string;
    infoKind: '噴火警報・予報' | '火山の状況に関する解説情報' | '噴火に関する火山観測報' | '降灰予報' | '噴火速報' | '火山現象に関する海上警報・海上予報' | '火山に関するお知らせ';
    body: CancelBody;
  }

  export type Main =
    PublicVFVO50
    | PublicVFVO51
    | PublicVFVO52
    | PublicVFVO53
    | PublicVFVO54
    | PublicVFVO55
    | PublicVFVO56
    | PublicVFSVii
    | PublicVZVO40
    | Cancel;
}
