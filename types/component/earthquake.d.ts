import { Coordinate } from './coordinate';
import { UnitValueNotNull } from './unit-value';

interface DepthBase {
  type: '深さ';
  unit: 'km';
  value: string | null;
  condition: string | never;
}

interface DepthNormal extends DepthBase {
  value: string;
  condition: never;
}

interface DepthShallow extends DepthBase {
  value: '0';
  condition: 'ごく浅い';
}

interface DepthDeep extends DepthBase {
  value: '700';
  condition: '７００ｋｍ以上';
}

interface DepthUnknown extends DepthBase {
  value: null;
  condition: '不明';
}

type Depth = DepthNormal | DepthShallow | DepthDeep | DepthUnknown;


interface MagnitudeBase {
  type: 'マグニチュード';
  unit: 'Mj' | 'M';
  value: string | null;
  condition: string | never;
}

interface MagnitudeNormal extends MagnitudeBase {
  value: string;
  condition: never;
}

interface MagnitudeUnknown extends MagnitudeBase {
  value: null;
  condition: 'Ｍ不明' | 'Ｍ８を超える巨大地震';
}

type Magnitude = MagnitudeNormal | MagnitudeUnknown;

interface Hypocenter {
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
}

export interface Earthquake {
  originTime: string;
  arrivalTime: string;
  hypocenter: Hypocenter;
  magnitude: Magnitude;
}
