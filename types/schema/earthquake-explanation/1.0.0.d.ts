import { TelegramJSONMain } from '@t/main';

export namespace EarthquakeExplanation {
  export interface Schema {
    type: 'earthquake-explanation';
    version: '1.0.0';
  }

  export interface Naming {
    text: string;
    en?: string;
  }

  export interface Comments {
    free: string;
  }

  export interface PublicBody {
    naming?: Naming;
    text: string;
    comments?: Comments;
  }

  export interface CancelBody {
    text: string;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '地震の活動状況等に関する情報';
    title: '地震の活動状況等に関する情報';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '地震の活動状況等に関する情報';
    body: PublicBody;
  }

  export interface Cancel extends TelegramJSONMain {
    _schema: Schema;
    type: '地震の活動状況等に関する情報';
    title: '地震の活動状況等に関する情報';
    infoType: '取消';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '地震の活動状況等に関する情報';
    body: CancelBody;
  }

  export type Main = Public | Cancel;
}
