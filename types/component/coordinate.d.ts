import { UnitValueNotNull } from './unit-value';


interface CoordinateNormal<Geo> {
  latitude: {
    text: string;
    value: string;
  };
  longitude: {
    text: string;
    value: string;
  };
  height?: UnitValueNotNull<'ι«γ', 'm'>;
  condition: never;
  geodeticSystem: Geo;
}

interface CoordinateUnknown {
  latitude: never;
  longitude: never;
  height: never;
  geodeticSystem: never;
  condition: 'δΈζ';
}


export type Coordinate<Geo = never> = CoordinateNormal<Geo> | CoordinateUnknown;
