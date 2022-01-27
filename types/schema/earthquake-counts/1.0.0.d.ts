import { TelegramJSONMain } from '@t/main';

export namespace EarthquakeCounts {
  export interface Schema {
    type: 'earthquake-counts';
    version: '1.0.0';
  }

  export interface EarthquakeCountTargetTime {
    start: string;
    end: string;
  }

  export interface EarthquakeCountValues {
    all: string | null;
    felt: string | null;
  }

  export interface EarthquakeCount {
    type: '１時間地震回数' | '累積地震回数' | '地震回数';
    targetTime: EarthquakeCountTargetTime;
    values: EarthquakeCountValues;
  }

  export interface Comments {
    free: string;
  }

  export interface PublicBody {
    earthquakeCounts?: EarthquakeCount[];
    nextAdvisory?: string;
    text?: string;
    comments?: Comments;
  }

  export interface CancelBody {
    text: string;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '地震回数に関する情報';
    title: '地震回数に関する情報';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '地震回数情報';
    body: PublicBody;
  }

  export interface Cancel extends TelegramJSONMain {
    _schema: Schema;
    type: '地震回数に関する情報';
    title: '地震回数に関する情報';
    infoType: '取消';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '地震回数情報';
    body: CancelBody;
  }

  export type Main = Public | Cancel;
}
