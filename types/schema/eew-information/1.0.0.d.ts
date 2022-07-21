import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';


export namespace EewInformation {
  export interface Schema {
    type: 'eew-information';
    version: '1.0.0';
  }

  export type IntensityClass = '0' | '1' | '2' | '3' | '4' | '5-' | '5+' | '6-' | '6+' | '7';
  export type LpgmIntensityClass = '0' | '1' | '2' | '3' | '4';

  export interface WarningAreaKindLastKind extends Components.CodeName {
  }

  export interface WarningAreaKind extends Components.CodeName {
    lastKind: WarningAreaKindLastKind;
  }

  export interface WarningArea extends Components.CodeName {
    kind: WarningAreaKind;
  }

  export interface EarthquakeHypocenterReduce extends Components.CodeName {
  }

  export interface EarthquakeHypocenterAccuracy {
    epicenters: [
        '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8',
        '0' | '1' | '2' | '3' | '4' | '9'
    ];
    depth: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
    magnitudeCalculation: '0' | '2' | '3' | '4' | '5' | '6' | '8';
    numberOfMagnitudeCalculation: '0' | '1' | '2' | '3' | '4' | '5';
  }

  export interface EarthquakeHypocenter extends Components.CodeName {
    coordinate: Components.Coordinate<'日本測地系'>;
    depth: Components.UnitValueNotNull<'深さ', 'km'>;
    reduce: EarthquakeHypocenterReduce;
    landOrSea?: '内陸' | '海域';
    accuracy: EarthquakeHypocenterAccuracy;
  }

  export interface EarthquakeMagnitude {
    type: 'マグニチュード';
    unit: 'Mj' | 'M';
    value: string | null;
    condition?: 'Ｍ不明';
  }

  export interface Earthquake {
    originTime?: string;
    arrivalTime: string;
    condition?: '仮定震源要素';
    hypocenter: EarthquakeHypocenter;
    magnitude: EarthquakeMagnitude;
  }

  export interface IntensityForecastMaxInt {
    from: IntensityClass | '不明';
    to: IntensityClass | 'over' | '不明';
  }

  export interface IntensityForecastLpgmMaxInt {
    from: LpgmIntensityClass | '不明';
    to: LpgmIntensityClass | 'over' | '不明';
  }

  export interface IntensityAppendix {
    maxIntChange: '0' | '1' | '2';
    maxLpgmIntChange?: '0' | '1' | '2';
    maxIntChangeReason: '0' | '1' | '2' | '3' | '4' | '9';
  }

  export interface IntensityRegionKind extends Components.CodeName {
  }

  export interface IntensityRegion extends Components.CodeName {
    forecastMaxInt: IntensityForecastMaxInt;
    forecastLpgmMaxInt?: IntensityForecastLpgmMaxInt;
    isPlum: boolean;
    isWarning: boolean;
    kind: IntensityRegionKind;
    condition?: '既に主要動到達と推測';
    arrivalTime?: string;
  }

  export interface IntensityRegionReached extends IntensityRegion {
    condition: '既に主要動到達と推測';
    arrivalTime: never;
  }

  export interface IntensityRegionUnReached extends IntensityRegion {
    condition: never;
    arrivalTime: string;
  }

  export type IntensityRegionItem = IntensityRegionReached | IntensityRegionUnReached

  export interface IntensityRealtimeStation {
    code: string;
    name: string;
    int: IntensityClass;
    k: string;
  }

  export interface Intensity {
    forecastMaxInt: IntensityForecastMaxInt;
    forecastLpgmMaxInt?: IntensityForecastLpgmMaxInt;
    appendix?: IntensityAppendix;
    regions: IntensityRegionItem[];
  }

  export interface IntensityRealtime {
    stations: IntensityRealtimeStation[];
  }


  export interface Comments {
    free?: string;
    warning?: {
      text: string;
      codes: string[];
    };
  }

  export interface PublicCommonBody {
    isLastInfo: boolean;
    isCanceled: boolean;
    isWarning: boolean;
    zones?: WarningArea[];
    prefectures?: WarningArea[];
    regions?: WarningArea[];
    earthquake: Earthquake;
    intensity?: Intensity;
    text?: string;
    comments?: Comments;
  }

  export interface PublicRealtimeBody {
    isLastInfo: boolean;
    isCanceled: boolean;
    earthquake: Earthquake;
    intensity?: IntensityRealtime;
    text?: string;
  }

  export interface PublicTestingBody {
    isLastInfo: false;
    isCanceled: false;
    text: string;
  }

  export interface CancelBody {
    isLastInfo: true;
    isCanceled: true;
    text: string;
  }

  export interface PublicCommon extends TelegramJSONMain {
    _schema: Schema;
    type: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）';
    title: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '緊急地震速報';
    body: PublicCommonBody;
  }

  export interface PublicRealtime extends TelegramJSONMain {
    _schema: Schema;
    type: 'リアルタイム震度';
    title: 'リアルタイム震度';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '緊急地震速報';
    body: PublicRealtimeBody;
  }


  export interface PublicTesting extends TelegramJSONMain {
    _schema: Schema;
    type: '緊急地震速報配信テスト';
    title: '緊急地震速報配信テスト';
    infoType: '発表' | '訂正';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '緊急地震速報';
    body: PublicTestingBody;
  }

  export interface Cancel extends TelegramJSONMain {
    _schema: Schema;
    type: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）' | 'リアルタイム震度' | '緊急地震速報配信テスト';
    title: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）' | 'リアルタイム震度' | '緊急地震速報配信テスト';
    infoType: '取消';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '緊急地震速報';
    body: CancelBody;
  }

  export type Main = PublicCommon | PublicRealtime | PublicTesting | Cancel;

}
