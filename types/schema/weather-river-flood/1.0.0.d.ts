import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace WeatherRiverFlood {
  export interface Schema {
    type: 'weather-river-flood';
    version: '1.0.0';
  }

  export interface TargetKind extends Components.CodeName {
    condition: string;
  }

  export interface Target extends Components.CodeName {
    kind: TargetKind;
  }

  export interface MainTextRiver extends Components.CodeName {
  }

  export interface MainTextStation extends Components.CodeName {
    location: string;
  }

  export interface MainText {
    text: string | null;
    rivers: MainTextRiver[];
    stations: MainTextStation[];
  }

  export interface SuppositionKind extends Components.CodeName {
  }

  export interface SuppositionDistrictPrefecture {
    code: string | null;
    name: string | null;
  }

  export interface SuppositionDistrictCity {
    code: string | null;
    name: string | null;
  }

  export interface SuppositionDistrict {
    code?: string;
    name: string;
    prefecture: SuppositionDistrictPrefecture;
    city: SuppositionDistrictCity;
    district: string | null;
  }

  export interface Supposition {
    type: '浸水想定地区' | '浸水想定地区（氾濫発生情報）';
    description: string;
    kind: SuppositionKind;
    districts: SuppositionDistrict[];
  }

  export interface RainfallTimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export interface RainfallTimeSeriesItemForecast {
    refId: string;
    unit: string;
    value: string | null;
  }

  export interface RainfallTimeSeriesItem {
    name: string;
    forecasts: RainfallTimeSeriesItemForecast [];
  }

  export interface RainfallTimeSeries {
    timeDefines: RainfallTimeSeriesTimeDefine[];
    items: RainfallTimeSeriesItem[];
  }

  export interface Rainfall {
    dateTime: string;
    text: string;
    timeSeries: RainfallTimeSeries[];
  }

  export interface WaterLevelTimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    name: string;
  }

  export interface WaterLevelTimeSeriesItemForecast {
    refId: string;
    unit: string;
    value: string | null;
    level: string | null;
    condition?: string;
  }

  export interface WaterLevelTimeSeriesItem extends Components.CodeName {
    location: string;
    type: '水位' | '流量';
    forecasts: WaterLevelTimeSeriesItemForecast [];
  }

  export interface WaterLevelTimeSeries {
    timeDefines: WaterLevelTimeSeriesTimeDefine[];
    items: WaterLevelTimeSeriesItem[];
  }

  export interface WaterLevel {
    timeSeries: WaterLevelTimeSeries[];
  }

  export interface FloodedWaterAssumptionsAttainmentTime {
    value: string;
    dubious: '頃';
  }

  export interface FloodedWaterAssumptionsAttainmentDeepestTime {
    value: string;
    dubious: '頃';
  }

  export interface FloodedWaterAssumptionsFloodDepth {
    from: string | null;
    to: string | null;
  }

  export interface FloodedWaterAssumptions {
    district: string | null;
    attainmentTime: FloodedWaterAssumptionsAttainmentTime;
    attainmentDeepestTime: FloodedWaterAssumptionsAttainmentDeepestTime;
    floodDepth: FloodedWaterAssumptionsFloodDepth;
  }

  export interface FloodedWater extends Components.CodeName {
    dateTime: string;
    text: string;
    assumptions: FloodedWaterAssumptions[];
  }

  export interface Office extends Components.CodeName {
    type: '水位関係' | '気象関係';
    contact: string;
    url: string;
  }

  export interface ReferenceCriterion {
    type: string;
    unit: string;
    value: string | null;
    condition: '有効' | '無効';
  }

  export interface Reference extends Components.CodeName {
    location: string;
    district: string | null;
    sections: string[];
    criteria: ReferenceCriterion[];
  }

  export interface PublicBody {
    notice?: string;
    target: Target;
    mainTexts?: MainText[];
    supposition?: Supposition;
    rainfall?: Rainfall;
    waterLevel?: WaterLevel;
    floodedWaters?: FloodedWater[];
    offices?: Office[];
    reference?: Reference[];
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '指定河川洪水予報';
    title: string;
    infoType: '発表' | '訂正' | '取消';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: string;
    serialNo: string;
    infoKind: '指定河川洪水予報';
    body: PublicBody;
  }

  export type Main = Public;
}
