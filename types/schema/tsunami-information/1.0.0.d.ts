import { TelegramJSONMain } from '@t/main';
import { CodeName } from '@t/component/code-name';
import { Earthquake } from '@t/component/earthquake';


export namespace TsunamiInformation {
  export interface Schema {
    type: 'tsunami-information';
    version: '1.0.0';
  }

  export interface TsunamiForecastKindLastKind extends CodeName {
  }

  export interface TsunamiForecastKind extends CodeName {
    lastKind: TsunamiForecastKindLastKind;
  }

  export type TsunamiForecastFirstHeight = ({
    arrivalTime: string;
    condition?: 'ただちに津波来襲と予測';
  } | {
    arrivalTime: never;
    condition: '津波到達中と推測' | '第１波の到達を確認';
  }) &
    {
      revise?: '追加' | '更新';
    };

  export type TsunamiForecastMaxHeightValue = {
    type: '津波の高さ';
    unit: 'm';
  } & ({
    value: string;
    over?: true;
    condition: never;
  } | {
    value: null;
    over: never;
    condition?: '巨大' | '高い';
  });

  export interface TsunamiForecastMaxHeight {
    height: TsunamiForecastMaxHeightValue;
    condition?: '重要';
    revise?: '追加' | '更新';
  }

  export interface TsunamiForecastStation extends CodeName {
    highTideDateTime: string;
    firstHeight: TsunamiForecastFirstHeight;
  }

  export interface TsunamiForecast extends CodeName {
    kind: TsunamiForecastKind;
    firstHeight?: TsunamiForecastFirstHeight;
    maxHeight?: TsunamiForecastMaxHeight;
    stations?: TsunamiForecastStation[] | never;
  }

  export interface TsunamiForecastVXSE41 extends TsunamiForecast {
    stations: never;
  }

  export interface TsunamiForecastVXSE51 extends TsunamiForecast {
    stations?: TsunamiForecastStation[];
  }

  export type TsunamiObservationStationFirstHeight = ({
    arrivalTime: string;
    initial?: '押し' | '引き';
    condition: never;
  } | {
    arrivalTime: never;
    initial: never;
    condition: '第１波識別不能';
  }) & {
    revise?: '追加' | '更新';
  };

  export interface TsunamiObservationStationMaxHeightValue {
    type: 'これまでの最大波の高さ';
    unit: 'm';
    value: string;
    over?: true;
    condition?: '上昇中';
  }

  export type TsunamiObservationStationMaxHeight =
    ({
      dateTime: string;
      height: TsunamiObservationStationMaxHeightValue;
      condition?: '重要';
    } | {
      dateTime: string;
      height: never;
      condition: '微弱';
    } | {
      dateTime: never;
      height: never;
      condition: '観測中';
    }) &
    {
      revise?: '追加' | '更新';
    }

  export interface TsunamiObservationStation extends CodeName {
    sensor?: string;
    firstHeight: TsunamiObservationStationFirstHeight;
    maxHeight: TsunamiObservationStationMaxHeight;
  }

  export interface TsunamiObservation {
    code: string | null;
    name: string | null;
    stations: TsunamiObservationStation[];
  }

  export interface TsunamiObservationVXSE51 extends TsunamiObservation {
    code: string;
    name: string;
  }

  export interface TsunamiObservationVXSE52 extends TsunamiObservation {
    code: null;
    name: null;
  }

  export interface TsunamiEstimationFirstHeight {
    arrivalTime: string;
    condition?: '早いところでは既に津波到達と推定';
    revise?: '追加' | '更新';
  }

  export type TsunamiEstimationMaxHeightValue = TsunamiForecastMaxHeightValue;

  export type TsunamiEstimationMaxHeight =
    ({
      dateTime: string;
      height: TsunamiEstimationMaxHeightValue;
      condition?: '重要';
    } | {
      dateTime: never;
      height: never;
      condition: '推定中';
    }) &
    {
      revise?: '追加' | '更新';
    };

  export interface TsunamiEstimation extends CodeName {
    firstHeight: TsunamiEstimationFirstHeight;
    maxHeight: TsunamiEstimationMaxHeight;
  }

  export interface PublicBodyVTSE41Tsunami {
    forecasts: TsunamiForecastVXSE41[];
  }

  export interface PublicBodyVTSE51Tsunami {
    forecasts: TsunamiForecastVXSE51[];
    observations?: TsunamiObservationVXSE51[];
  }

  export interface PublicBodyVTSE52Tsunami {
    observations: TsunamiObservationVXSE52[];
    estimations: TsunamiEstimation[];
  }

  export type Comment = {
    free?: string;
    warning?: {
      text: string;
      codes: string[];
    };
  };

  export interface CancelBody {
    text: string;
  }

  export interface PublicBodyVTSE41 {
    tsunami: PublicBodyVTSE41Tsunami;
    earthquakes: Earthquake[];
    text?: string;
    comments?: Comment;
  }

  export interface PublicBodyVTSE51 {
    tsunami: PublicBodyVTSE51Tsunami;
    earthquakes: Earthquake[];
    text?: string;
    comments?: Comment;
  }

  export interface PublicBodyVTSE52 {
    tsunami: PublicBodyVTSE52Tsunami;
    earthquakes: Earthquake[];
    text?: string;
    comments?: Comment;
  }


  export interface PublicVTSE41 extends TelegramJSONMain {
    _schema: Schema;
    type: '津波警報・注意報・予報a';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime?: string;
    eventId: string;
    serialNo: null;
    infoKind: '津波警報・注意報・予報';
    body: PublicBodyVTSE41;
  }

  export interface PublicVTSE51 extends TelegramJSONMain {
    _schema: Schema;
    type: '津波情報a';
    title:  '各地の満潮時刻・津波到達予想時刻に関する情報' | '津波観測に関する情報';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind:'津波情報';
    body: PublicBodyVTSE51;
  }


  export interface PublicVTSE52 extends TelegramJSONMain {
    _schema: Schema;
    type: '沖合の津波観測に関する情報';
    title: '沖合の津波観測に関する情報';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '津波情報';
    body: PublicBodyVTSE52;
  }



  export interface Cancel extends TelegramJSONMain {
    type: '津波警報・注意報・予報a' | '津波情報a' | '各地の満潮時刻・津波到達予想時刻に関する情報' | '津波観測に関する情報';
    infoType: '取消';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    infoKind: '津波警報・注意報・予報'| '津波情報';
    body: CancelBody;
  }

  export type Main = (PublicVTSE41 | PublicVTSE51 | PublicVTSE52) | Cancel;

}
