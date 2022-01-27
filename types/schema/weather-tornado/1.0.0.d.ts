import { TelegramJSONMain } from '@t/main';
import { CodeName } from '@t/component/code-name';

export namespace WeatherTornado {
  export interface Schema {
    type: 'weather-tornado';
    version: '1.0.0';
  }

  export interface Witness extends CodeName {
  }

  export interface TargetKind extends CodeName {
    code: '1' | '0';
    name: '竜巻注意情報' | 'なし';
    status: '発表' | 'なし';
  }

  export interface Target extends CodeName {
    kinds: [TargetKind];
  }

  export interface Region extends Target {
  }

  export interface City extends Target {
  }

  export interface PublicBody {
    witnesses?: Witness[];
    targets: Target[];
    regions: Region[];
    cities: City[];
  }

  export interface PublicEvent extends TelegramJSONMain {
    _schema: Schema;
    type: '竜巻注意情報（目撃情報付き）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: string;
    eventId: null;
    serialNo: string;
    infoKind: '竜巻注意情報';
    body: PublicBody;
  }

  export type Main = PublicEvent;
}
