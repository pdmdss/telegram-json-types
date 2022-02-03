import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace WeatherLandslide {
  export interface Schema {
    type: 'weather-landslide';
    version: '1.0.0';
  }


  export interface Target extends Components.CodeName {
  }

  export interface CityKind extends Components.CodeName {
    code: '3' | '1' | '0';
    name: '警戒' | '解除' | 'なし';
    status: '発表' | '継続' | '解除' | 'なし';
  }

  export interface City extends Components.CodeName {
    kinds: [CityKind];
  }

  export interface Office {
    type: '都道府県' | '気象庁';
    name: string;
    contact: string;
  }

  export interface PublicBody {
    target: Target;
    cities: City[];
    offices: Office[];
  }

  export interface PublicEvent extends TelegramJSONMain {
    _schema: Schema;
    type: '土砂災害警戒情報';
    title: string;
    infoType: '発表';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '土砂災害警戒情報';
    body: PublicBody;
  }

  export type Main = PublicEvent;
}
