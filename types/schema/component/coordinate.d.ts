import { UnitValue } from './unit-value';

export type Coordinate<Geo = never> = {
  latitude: { text: string, value: string };
  longitude: { text: string, value: string };
  height?: UnitValue<'深さ', 'km'>;
  condition: undefined;
  geodeticSystem: Geo;
} | {
  latitude: undefined;
  longitude: undefined;
  height: undefined;
  geodeticSystem: never;
  condition: '不明';
}
