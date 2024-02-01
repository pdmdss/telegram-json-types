import { TelegramJSONMain } from '../../main';

export namespace WeatherInformation {
  export interface Schema {
    type: 'weather-information';
    version: '1.0.0';
  }

  export interface PublicBody {
    target?: never;
    notice: string | null;
    comment: string;
  }

  export interface PublicEvent extends TelegramJSONMain {
    _schema: Schema;
    type: '全般台風情報' | '全般台風情報（定型）' | '全般台風情報（詳細）' | '全般スモッグ気象情報' | 'スモッグ気象情報' | '地方高温注意情報' | '府県高温注意情報' | '熱中症警戒アラート' | '全般潮位情報' | '地方潮位情報' | '府県潮位情報' | '全般気象情報' | '地方気象情報' | '府県気象情報';
    title: string;
    infoType: '発表' | '訂正' | '取消';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: string;
    serialNo: string | null;
    infoKind: '同一現象用平文情報';
    body: PublicBody;
  }

  export type Main = PublicEvent;
}
