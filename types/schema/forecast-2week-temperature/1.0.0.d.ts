import { TelegramJSONMain } from '../../main';
import { Components } from '../../component';

export namespace Forecast2weekTemperature {
  export interface Schema {
    type: 'forecast-2week-temperature';
    version: '1.0.0';
  }

  export interface TemperatureComparison {
    type: '最高気温の前後２日５日間平均値の階級' | '最低気温の前後２日５日間平均値の階級' | '前後２日の５日間平均・地域平均気温階級';
    value: '-3' | '-2' | '-1' | '0' | '1' | '2' | '3';
  }

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export interface TimeSeriesZoneItemTemperature {
    refId: string;
    type: '地域平均気温';
    comparison: TemperatureComparison;
  }

  export interface TimeSeriesZoneItemKind {
    type: '地域平均気温';
    average: TimeSeriesZoneItemTemperature[];
  }


  export interface TimeSeriesZoneItem extends Components.CodeName {
    kinds: [
      TimeSeriesZoneItemKind
    ];
  }

  export interface TimeSeriesZone {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesZoneItem[];
  }

  export interface Zone {
    timeSeries: [
      TimeSeriesZone
    ];
  }

  export interface TimeSeriesStationItemAverageTemperature<Type extends '最高気温' | '最低気温'> {
    refId: string;
    type: `${Type}の前後２日５日間平均値`;
    unit: '度';
    value: string;
    range: {
      type: `${Type}の前後２日５日間平均値の予測範囲`;
      unit: '度';
      from: string;
      to: string;
    };
    comparison: TemperatureComparison;
  }

  export interface TimeSeriesStationItemKind {
    type: '最低・最高平均気温';
    averageMaximums: TimeSeriesStationItemAverageTemperature<'最高気温'>[];
    averageMinimums: TimeSeriesStationItemAverageTemperature<'最低気温'>[];
  }


  export interface TimeSeriesStationItem extends Components.CodeName {
    kinds: [
      TimeSeriesStationItemKind
    ];
  }

  export interface TimeSeriesStation {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesStationItem[];
  }

  export interface Station {
    timeSeries: [
      TimeSeriesStation
    ];
  }

  export interface PublicBody {
    zone: Zone;
    station: Station;
  }


  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '地方季節予報（２週間気温予報）';
    title: '２週間気温予報';
    infoType: '発表' | '訂正' | '遅延';
    targetDateTimeDubious: never;
    targetDuration: 'P5D';
    validDateTime: never;
    eventId: null;
    serialNo: null;
    infoKind: '２週間気温予報';
    body: PublicBody;
  }

  export type Main = Public;
}
