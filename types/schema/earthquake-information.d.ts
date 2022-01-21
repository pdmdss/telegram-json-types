import { Earthquake } from './component/earthquake';
import { TelegramJSONMain } from '../main';
import { UnitValueNotNull } from './component/unit-value';


export namespace EarthquakeInformation {
  export interface Schema {
    type: 'earthquake-information';
    version: '1.0.0';
  }

  export type Intensity = '1' | '2' | '3' | '4' | '5-' | '5+' | '6-' | '6+' | '7';
  export type LpgmIntensity = '0' | '1' | '2' | '3' | '4';
  export type LpgmCategory = '1' | '2' | '3' | '4';

  type OnRevise = { revise?: '上方修正' | '追加'; };
  export type IntensityMaxInt = {
    name: string;
    code: string;
    maxInt: Intensity;
  };
  export type IntensityMaxIntOnRevise = {
    name: string;
    code: string;
    maxInt?: Intensity;
  } & OnRevise;

  export type IntensityCity = {
    name: string;
    code: string;
    maxInt?: Intensity;
    revise?: '上方修正' | '追加';
    condition?: '震度５弱以上未入電';
  };

  export type IntensityStation = {
    name: string;
    code: string;
    int: Intensity | '!5-';
    revise?: '上方修正' | '追加';
    condition?: '震度５弱以上未入電';
  };

  export type IntensityLpgmMaxInt = IntensityMaxIntOnRevise & {
    maxLpgmInt: LpgmIntensity;
  };
  export type IntensityLpgmStationPrePeriod = {
    periodicBand: UnitValueNotNull<never, '秒台'>;
    lpgmInt: LpgmIntensity;
    sva: UnitValueNotNull<never, 'cm/s'>;
  };
  export type IntensityLpgmStation = IntensityStation & {
    lpgmInt: LpgmIntensity;
    sva: UnitValueNotNull<never, 'cm/s'>;
    prePeriods: IntensityLpgmStationPrePeriod[];
  }

  export type Comment = {
    free?: string;
    forecast?: {
      text: string;
      codes: string[];
    };
    var?: {
      text: string;
      codes: string[];
    };
  };


  export type IntensityVXSE51 = {
    maxInt: Intensity;
    prefectures: IntensityMaxInt[];
    regions: IntensityMaxInt[];
  };

  export type IntensityVXSE53 = {
    maxInt: Intensity;
    prefectures: IntensityMaxIntOnRevise[];
    regions: IntensityMaxIntOnRevise[];
    cities: IntensityCity[];
    stations: IntensityStation[];
  };

  export type IntensityVXSE62 = {
    maxInt: Intensity;
    maxLpgmInt: LpgmIntensity;
    lpgmCategory: LpgmCategory;
    prefectures: IntensityLpgmMaxInt[];
    regions: IntensityLpgmMaxInt[];
    stations: IntensityLpgmStation[];
  };


  export interface PublicBodyVXSE51 {
    intensity: IntensityVXSE51;
    text?: string;
    comments: Omit<Comment, 'var'>;
  }

  export interface PublicBodyVXSE52 {
    earthquake: Earthquake;
    text?: string;
    comments: Omit<Comment, 'var'>;
  }

  export interface PublicBodyVXSE53 {
    earthquake: Earthquake;
    intensity?: IntensityVXSE53;
    text?: string;
    comments: Comment;
  }

  export interface PublicBodyVXSE62 {
    earthquake: Earthquake;
    intensity?: IntensityVXSE62;
    text?: string;
    comments: Comment;
  }

  export interface ChancelBody {
    text: string;
  }

  export interface PublicVXSE51 extends TelegramJSONMain {
    _schema: Schema;
    type: '震度速報';
    title: '震度速報';
    infoKind: '震度速報';
    eventId: string;
    serialNo: null;
    infoType: '発表' | '訂正';
    body: PublicBodyVXSE51;
  }

  export interface PublicVXSE52 extends TelegramJSONMain {
    _schema: Schema;
    type: '震源に関する情報';
    title: '震源に関する情報';
    infoKind: '震源速報';
    eventId: string;
    serialNo: null;
    infoType: '発表' | '訂正';
    body: PublicBodyVXSE52;
  }

  export interface PublicVXSE53 extends TelegramJSONMain {
    _schema: Schema;
    type: '震源・震度に関する情報';
    title: '震源・震度情報' | '遠地地震に関する情報';
    infoKind: '地震情報';
    eventId: string;
    serialNo: string;
    infoType: '発表' | '訂正';
    body: PublicBodyVXSE53;
  }

  export interface PublicVXSE62 extends TelegramJSONMain {
    _schema: Schema;
    type: '長周期地震動に関する観測情報';
    title: '長周期地震動に関する観測情報';
    infoKind: '長周期地震動に関する観測情報';
    eventId: string;
    serialNo: string;
    infoType: '発表' | '訂正';
    body: PublicBodyVXSE62;
  }

  export interface Channel extends TelegramJSONMain {
    infoType: '取消';
    eventId: string;
    body: ChancelBody;
  }

  export type Main = (PublicVXSE51 | PublicVXSE52 | PublicVXSE53 | PublicVXSE62) | Channel;

}
