import { Coordinate } from './coordinate';
import { UnitValueNotNull } from './unit-value';

type Depth = {
  type: '深さ';
  unit: 'km';
} & ({
  value: null;
  condition: '不明';
} | {
  value: '0';
  condition: 'ごく浅い';
} | {
  value: '700';
  condition: '７００ｋｍ以上';
} | {
  value: string;
  condition: never;
});
type Magnitude = {
  type: 'マグニチュード';
  unit: 'Mj' | 'M';
} & ({
  value: null;
  condition: 'Ｍ不明' | 'Ｍ８を超える巨大地震';
} | {
  value: string;
  condition: never;
});

export interface Earthquake {
  originTime: string;
  arrivalTime: string;
  hypocenter: {
    name: string;
    code: string;
    coordinate: Coordinate<'日本測地系' | undefined>;
    depth: Depth;
    detailed?: {
      code: string;
      name: string;
    };
    auxiliary?: {
      text: string;
      code: string;
      name: string;
      direction: string;
      distance: Omit<UnitValueNotNull<never, 'km'>, 'type' | 'condition'>;
    };
    source?: 'ＰＴＷＣ' | 'ＵＳＧＳ' | 'ＷＣＡＴＷＣ';
  };
  magnitude: Magnitude;
}



