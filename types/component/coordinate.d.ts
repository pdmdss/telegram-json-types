import { UnitValue } from './unit-value';


interface CoordinateNormal<Geo> {
  latitude: {
    text: string;
    value: string;
  };
  longitude: {
    text: string;
    value: string;
  };
  height?: UnitValue<'高さ', 'm'>;
  condition: never;
  geodeticSystem: Geo;
}

interface CoordinateUnknown {
  latitude: never;
  longitude: never;
  height: never;
  geodeticSystem: never;
  condition: '不明';
}


export type Coordinate<Geo = never> = CoordinateNormal<Geo> | CoordinateUnknown;
