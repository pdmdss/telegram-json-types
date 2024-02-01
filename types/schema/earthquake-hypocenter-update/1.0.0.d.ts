import { TelegramJSONMain } from '../../main';
import { Earthquake } from '../../component/earthquake';

export namespace EarthquakeHypocenterUpdate {
  export interface Schema {
    type: 'earthquake-hypocenter-update';
    version: '1.0.0';
  }

  export interface Comments {
    free: string;
  }

  export interface PublicBody {
    earthquake: Earthquake;
    text?: string;
    comments?: Comments;
  }

  export interface CancelBody {
    text: string;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '顕著な地震の震源要素更新のお知らせ';
    title: '顕著な地震の震源要素更新のお知らせ';
    infoType: '発表' | '訂正';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: string;
    serialNo: null;
    infoKind: '震源要素更新のお知らせ';
    body: PublicBody;
  }

  export interface Cancel extends TelegramJSONMain {
    _schema: Schema;
    type: '顕著な地震の震源要素更新のお知らせ';
    title: '顕著な地震の震源要素更新のお知らせ';
    infoType: '取消';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: string;
    serialNo: null;
    infoKind: '震源要素更新のお知らせ';
    body: CancelBody;
  }

  export type Main = Public | Cancel;
}
