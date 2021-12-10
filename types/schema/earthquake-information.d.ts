import { Earthquake } from './component/earthquake';
import { TelegramJSONMain } from '../main';

type Intensity = '1' | '2' | '3' | '4' | '5-' | '5+' | '6-' | '6+' | '7';

export namespace EarthquakeInformation {
  export interface Schema {
    type: 'earthquake-information';
    version: '1.0.0';
  }



  export interface PublicBodyVXSE51 {
    intensity: {
      maxInt: string;
      prefectures: {
        name: string;
        code: string;
        maxInt: Intensity;
      }[];
      regions: {
        name: string;
        code: string;
        maxInt: Intensity;
      }[];
    };
    text?: string;
    comments: {
      free?: string;
      forecast?: {
        text: string;
        codes: string[];
      };
    };
  }

  export interface PublicBodyVXSE52 {
    earthquake: Earthquake;
    text?: string;
    comments: {
      free?: string;
      forecast?: {
        text: string;
        codes: string[];
      };
    };
  }

  export interface PublicBodyVXSE53 {
    earthquake: Earthquake;
    intensity?: {
      maxInt: string;
      prefectures: {
        name: string;
        code: string;
        maxInt?: Intensity;
        revise?: '上方修正' | '追加';
      }[];
      regions: {
        name: string;
        code: string;
        maxInt?: Intensity;
        revise?: '上方修正' | '追加';
      }[];
      cities: {
        name: string;
        code: string;
        maxInt?: Intensity;
        revise?: '上方修正' | '追加';
        condition?: '震度５弱以上未入電';
      }[];
      stations: {
        name: string;
        code: string;
        int: Intensity | '!5-';
        revise?: '上方修正' | '追加';
        condition?: '震度５弱以上未入電';
      }[];
    };
    text?: string;
    comments: {
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

  export interface Channel extends TelegramJSONMain {
    infoType: '取消';
    body: ChancelBody;
  }

  export type Main = (PublicVXSE51 | PublicVXSE52 | PublicVXSE53) | Channel;

}
