import { Earthquake } from '../component/earthquake';
import { TelegramJSONMain } from '../../main';

export namespace EarthquakeInformation {
  export interface Schema {
    type: 'earthquake-information';
    version: '1.1.0';
  }

  export type IntensityClass = '1' | '2' | '3' | '4' | '5-' | '5+' | '6-' | '6+' | '7';

  export type IntensityMaxInt = {
    name: string;
    code: string;
    maxInt: IntensityClass;
  };
  export type IntensityMaxIntOnRevise = {
    name: string;
    code: string;
    maxInt?: IntensityClass;
    revise?: '上方修正' | '追加';
  }

  export type IntensityCity = {
    name: string;
    code: string;
    maxInt?: IntensityClass;
    revise?: '上方修正' | '追加';
    condition?: '震度５弱以上未入電';
  };

  export type IntensityStation = {
    name: string;
    code: string;
    int: IntensityClass | '!5-';
    revise?: '上方修正' | '追加';
    condition?: '震度５弱以上未入電';
  };

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
    maxInt: IntensityClass;
    prefectures: IntensityMaxInt[];
    regions: IntensityMaxInt[];
  };

  export type IntensityVXSE53 = {
    maxInt: IntensityClass;
    prefectures: IntensityMaxIntOnRevise[];
    regions: IntensityMaxIntOnRevise[];
    cities: IntensityCity[];
    stations: IntensityStation[];
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

  export interface PublicBodyVXZSE40 {
    text: string;
  }

  export interface CancelBody {
    text: string;
  }

  export interface PublicVXSE51 extends TelegramJSONMain {
    _schema: Schema;
    type: '震度速報';
    title: '震度速報';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '震度速報';
    body: PublicBodyVXSE51;
  }

  export interface PublicVXSE52 extends TelegramJSONMain {
    _schema: Schema;
    type: '震源に関する情報';
    title: '震源に関する情報';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '震源速報';
    body: PublicBodyVXSE52;
  }

  export interface PublicVXSE53 extends TelegramJSONMain {
    _schema: Schema;
    type: '震源・震度に関する情報';
    title: '震源・震度情報' | '遠地地震に関する情報';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '地震情報';
    body: PublicBodyVXSE53;
  }

  export interface PublicVZSE40 extends TelegramJSONMain {
    _schema: Schema;
    type: '地震・津波に関するお知らせ';
    title: '地震・津波に関するお知らせ';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '地震・津波に関するお知らせ';
    body: PublicBodyVXZSE40;
  }

  export interface Cancel extends TelegramJSONMain {
    _schema: Schema;
    type: '震度速報' | '震源に関する情報' | '震源・震度に関する情報' | '地震・津波に関するお知らせ';
    title: '震度速報' | '震源に関する情報' | '震源・震度情報' | '遠地地震に関する情報' | '地震・津波に関するお知らせ';
    infoType: '取消';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    infoKind: '震度速報' | '震源速報' | '地震情報' | '地震・津波に関するお知らせ';
    body: CancelBody;
  }

  export  type Main = (PublicVXSE51 | PublicVXSE52 | PublicVXSE53 | PublicVZSE40) | Cancel;
}
