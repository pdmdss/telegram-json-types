import { TelegramJSONMain } from '@t/main';
import { CodeName } from '@t/component/code-name';
import { Coordinate } from '@t/component/coordinate';
import { UnitValueNotNull } from '@t/component/unit-value';


export namespace EewInformation {
  export interface Schema {
    type: 'eew-information';
    version: '1.0.0';
  }

  export type IntensityClass = '0' | '1' | '2' | '3' | '4' | '5-' | '5+' | '6-' | '6+' | '7';
  export type LpgmIntensityClass = '0' | '1' | '2' | '3' | '4';

  export interface WarningAreaKindLastKind extends CodeName {
  }

  export interface WarningAreaKind extends CodeName {
    lastKind: WarningAreaKindLastKind;
  }

  export interface WarningArea extends CodeName {
    kind: WarningAreaKind;
  }

  export interface EarthquakeHypocenterReduce extends CodeName {
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

  export interface EarthquakeHypocenter extends CodeName {
    coordinate: Coordinate<'日本測地系'>;
    depth: UnitValueNotNull<'深さ', 'km'>;
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

  export interface IntensityRegionKind extends CodeName {
  }

  export interface IntensityRegion extends CodeName {
    forecastMaxInt: IntensityForecastMaxInt;
    forecastLpgmMaxInt?: IntensityForecastLpgmMaxInt;
    kind: IntensityRegionKind;
  }


  export interface Intensity {
    forecastMaxInt: IntensityForecastMaxInt;
    forecastLpgmMaxInt?: IntensityForecastLpgmMaxInt;
    appendix?: IntensityAppendix;
    regions: IntensityRegion[];
  }


  export type Comment = {
    free?: string;
    warning?: {
      text: string;
      codes: string[];
    };
  };

  export interface PublicCommonBody {
    isLastInfo: boolean;
    zones?: WarningArea[];
    prefectures?: WarningArea[];
    regions?: WarningArea[];
    earthquake: Earthquake;
    intensity?: Intensity;
    text?: string;
    comments: Comment;
  }

  export interface PublicTestingBody {
    isLastInfo: false;
    text: string;
  }

  export interface CancelBody {
    isLastInfo: true;
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
    type: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）' | '緊急地震速報配信テスト';
    title: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）' | '緊急地震速報配信テスト';
    infoType: '取消';
    targetDateTimeDubious: never;
    targetDuration: never;
    validDateTime: never;
    eventId: string;
    serialNo: string;
    infoKind: '緊急地震速報';
    body: CancelBody;
  }

  export type Main = PublicCommon | PublicTesting | Cancel;

}
