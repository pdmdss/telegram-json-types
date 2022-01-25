import { TelegramJSONMain } from '../../main';
import { Coordinate } from '../../component/coordinate';
import { UnitValueNotNull } from '../../component/unit-value';


export namespace EewInformation {
  export interface Schema {
    type: 'eew-information';
    version: '1.0.0';
  }

  export type IntensityClass = '0' | '1' | '2' | '3' | '4' | '5-' | '5+' | '6-' | '6+' | '7';
  export type LpgmIntensityClass = '0' | '1' | '2' | '3' | '4';

  export interface WarningAreaKind {
    code: string;
    name: string;
    lastKind: {
      code: string;
      name: string;
    };
  }

  export interface WarningArea {
    code: string;
    name: string;
    kind: WarningAreaKind;
  }

  export interface EarthquakeHypocenterReduce {
    code: string;
    name: string;
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

  export interface EarthquakeHypocenter {
    code: string;
    name: string;
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

  export interface IntensityRegion {
    code: string;
    name: string;
    forecastMaxInt: IntensityForecastMaxInt;
    forecastLpgmMaxInt?: IntensityForecastLpgmMaxInt;
    kind: WarningAreaKind;
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

  export interface PublicTesting {
    isLastInfo: false;
    text: string;
  }

  export interface ChancelBody {
    isLastInfo: true;
    text: string;
  }

  export interface PublicCommon extends TelegramJSONMain {
    _schema: Schema;
    type: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）';
    title: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）';
    infoKind: '緊急地震速報';
    eventId: string;
    serialNo: string;
    infoType: '発表' | '訂正';
    body: PublicCommonBody;
  }

  export interface PublicTesting extends TelegramJSONMain {
    _schema: Schema;
    type: '緊急地震速報テスト';
    title: '緊急地震速報テスト';
    infoKind: '緊急地震速報';
    eventId: string;
    serialNo: string;
    infoType: '発表' | '訂正';
    body: PublicTesting;
  }

  export interface Channel extends TelegramJSONMain {
    _schema: Schema;
    type: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）' | '緊急地震速報テスト';
    title: '緊急地震速報（予報）' | '緊急地震速報（地震動予報）' | '緊急地震速報（警報）' | '緊急地震速報テスト';
    infoKind: '緊急地震速報';
    eventId: string;
    serialNo: string;
    infoType: '取消';
    body: ChancelBody;
  }

  export type Main = PublicCommon | PublicTesting | Channel;

}
