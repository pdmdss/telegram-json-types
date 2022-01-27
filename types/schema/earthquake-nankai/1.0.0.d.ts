import { TelegramJSONMain } from '@t/main';
import { CodeName } from '@t/component/code-name';

export namespace EarthquakeNankai {
  export interface Schema {
    type: 'earthquake-nankai';
    version: '1.0.0';
  }

  export interface EarthquakeInfoKind extends CodeName{
  }

  export interface EarthquakeInfo {
    kind?: EarthquakeInfoKind;
    text: string;
    appendix?: string;
  }


  export interface PublicBody {
    earthquakeInfo?: EarthquakeInfo;
    nextAdvisory?: string;
    text?: string;
  }

  export interface CancelBody {
    text: string;
  }

  export interface PublicVYSE50 extends TelegramJSONMain {
    _schema: Schema;
    type: '南海トラフ地震臨時情報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '南海トラフ地震に関連する情報';
    body: PublicBody;
  }

  export interface PublicVYSE51 extends TelegramJSONMain {
    _schema: Schema;
    type: '南海トラフ地震関連解説情報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '南海トラフ地震に関連する情報';
    body: PublicBody;
  }

  export interface PublicVYSE52 extends TelegramJSONMain {
    _schema: Schema;
    type: '南海トラフ地震関連解説情報';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: null;
    infoKind: '南海トラフ地震に関連する情報';
    body: PublicBody;
  }

  export interface Cancel extends TelegramJSONMain {
    _schema: Schema;
    type: '南海トラフ地震臨時情報' | '南海トラフ地震関連解説情報';
    title: string;
    infoType: '取消';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    infoKind: '南海トラフ地震に関連する情報';
    body: CancelBody;
  }

  export type Main = PublicVYSE50 | PublicVYSE51 | PublicVYSE52 | Cancel;
}
