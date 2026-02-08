import { TelegramJSONMain } from '../../main';
import { Components, Util } from '../../component';

export namespace WeatherWarningTimeseries {
  export interface Schema {
    type: 'weather-warning-timeseries';
    version: '1.0.0';
  }

  /**
   * 危険度
   */
  export type RiskTypes =
    '土砂災害危険度' |
    '大雨浸水危険度' |
    '風危険度' |
    '波危険度' |
    '雪危険度' |
    '高潮危険度' |
    '雷危険度' |
    '融雪危険度' |
    '着雪危険度' |
    '着氷危険度' |
    'なだれ危険度' |
    '濃霧危険度' |
    '乾燥危険度' |
    '霜危険度' |
    '低温危険度';

  // 危険度
  export interface Significancy {
    refId: string;
    type: RiskTypes;
    code: '50' | '30' | '20' | '01' | '51' | '41' | '31' | '22' | '21' | '11' | '00';
    name: '特別警報級' | '警報級' | '注意報級' | '注意報級未満' | '警戒レベル５相当' | '警戒レベル４相当' | '警戒レベル３相当' | '警戒レベル２相当' | '警戒レベル２' | '警戒レベル２未満' | '値なし';
  }

  export interface SignificancesBase {
    significances: Significancy[];
  }

  export type SignificancesLocal = Util.Local<SignificancesBase>;
  export type SignificancesPart = Util.Part<SignificancesBase, SignificancesLocal>;

  // 風向
  export type Direction = Util.TimeRefID<Util.ValueElement<'風向', '８方位漢字', '風雪'>>;

  export interface WindDirectionsBase {
    directions: Direction[];
  }

  export type WindDirectionsLocal = Util.Local<WindDirectionsBase>;
  export type WindDirectionsPart = Util.Part<WindDirectionsBase, WindDirectionsLocal>;

  // 風速
  export type Speed = Util.TimeRefID<Util.ValueElement<'最大風速', 'm/s', '風雪'>>;

  export interface WindSpeedsBase {
    speeds: Speed[];
  }

  export type WindSpeedsLocal = Util.Local<WindSpeedsBase>;
  export type WindSpeedsPart = Util.Part<WindSpeedsBase, WindSpeedsLocal>;

  // 波
  type WaveHeightTypes = '波高' | 'うちあげ高水位' | '最高うちあげ高水位';

  export type WaveHeight<Type extends WaveHeightTypes> = Util.TimeRefID<Util.ValueElement<Type, 'm', '以下' | '未満'>>;

  export interface WaveHeightsBase<Type extends WaveHeightTypes> {
    waveHeights: WaveHeight<Type>[];
  }

  export type WaveHeightsLocal<Type extends WaveHeightTypes> = Util.Local<WaveHeightsBase<Type>>;
  export type WaveHeightsPart<Type extends WaveHeightTypes> = Util.Part<WaveHeightsBase<Type>, WaveHeightsLocal<Type>>;

  // 潮位
  type TidalLevelTypes = '潮位' | '最高潮位';

  export type TidalLevel<Type extends TidalLevelTypes> = Util.TimeRefID<Util.ValueElement<Type, 'm', '以下' | '未満'>>;

  export interface TidalLevelsBase<Type extends TidalLevelTypes> {
    tidalLevels: TidalLevel<Type>[];
  }

  export type TidalLevelsLocal<Type extends TidalLevelTypes> = Util.Local<TidalLevelsBase<Type>>;
  export type TidalLevelsPart<Type extends TidalLevelTypes> = Util.Part<TidalLevelsBase<Type>, TidalLevelsLocal<Type>>;

  // 雪
  export type SnowfallDepthType = '６時間最大降雪量' | '１２時間最大降雪量' | '２４時間最大降雪量';

  export interface SnowfallDepth<Type extends SnowfallDepthType = SnowfallDepthType> {
    refId: string;
    type: Type;
    uint: 'cm';
    value: string;
    condition?: '以下' | '未満';
  }

  export interface SnowfallDepthsBase<Type extends SnowfallDepthType> {
    snowfallDepths: SnowfallDepth<Type>[];
  }

  export type SnowfallDepthsLocal<Type extends SnowfallDepthType> = Util.Local<SnowfallDepthsBase<Type>>;
  export type SnowfallDepthsPart<Type extends SnowfallDepthType> = Util.Part<SnowfallDepthsBase<Type>, SnowfallDepthsLocal<Type>>;

  // 湿度
  type HumidityTypes = '実効湿度' | '最小湿度';

  export type Humidity<Type extends HumidityTypes> = Util.TimeRefID<Util.ValueElement<Type, '%'>>;

  export interface HumiditiesBase<Type extends HumidityTypes> {
    humidities: Humidity<Type>[];
  }

  export type HumiditiesLocal<Type extends HumidityTypes> = Util.Local<HumiditiesBase<Type>>;
  export type HumiditiesPart<Type extends HumidityTypes> = Util.Part<HumiditiesBase<Type>, HumiditiesLocal<Type>>;

  // 雨
  type PrecipitationTypes = '１時間最大雨量' | '２４時間最大雨量';

  export type Precipitation<Type extends PrecipitationTypes> = Util.TimeRefID<Util.ValueElement<Type, 'mm', '以下' | '未満'>>;

  export interface PrecipitationsBase<Type extends PrecipitationTypes> {
    precipitations: [Precipitation<Type>];
  }

  export type PrecipitationsLocal<Type extends PrecipitationTypes> = Util.Local<PrecipitationsBase<Type>>;
  export type PrecipitationsPart<Type extends PrecipitationTypes> = Util.Part<PrecipitationsBase<Type>, PrecipitationsLocal<Type>>;


  export interface TimeSeriesPropertyRisk {
    type: RiskTypes;
    significancesPart: SignificancesPart;
  }

  export interface TimeSeriesPropertyPrecipitation<Type extends PrecipitationTypes> {
    type: '雨';
    precipitationParts: PrecipitationsPart<Type>[];
  }

  export interface TimeSeriesPropertyWind {
    type: '風';
    windDirectionPart: WindDirectionsPart;
    windSpeedPart: WindSpeedsPart;
  }

  export interface TimeSeriesPropertyWave {
    type: '波';
    waveHeightPart: WaveHeightsPart<'波高'>;
  }


  export interface TimeSeriesPropertyStormSurge {
    type: '高潮';
    waveHeightPart?: WaveHeightsPart<'うちあげ高水位'>;
    tidalLevelPart: TidalLevelsPart<'潮位'>;
  }

  export interface TimeSeriesPropertySnow<Type extends SnowfallDepthType> {
    type: '雪';
    snowfallDepthPart: SnowfallDepthsPart<Type>;
  }

  type HumiditiesPartEffective = HumiditiesPart<'実効湿度'>;
  type HumiditiesPartMinimum = HumiditiesPart<'最小湿度'>;

  export interface TimeSeriesPropertyDryAir {
    type: '乾燥';
    humidityParts: [HumiditiesPartEffective, HumiditiesPartMinimum] | [HumiditiesPartEffective | HumiditiesPartMinimum];
  }

  export type TimeSeriesProperty =
    TimeSeriesPropertyRisk |
    TimeSeriesPropertyPrecipitation<PrecipitationTypes> |
    TimeSeriesPropertyWind |
    TimeSeriesPropertyWave |
    TimeSeriesPropertyStormSurge |
    TimeSeriesPropertySnow<SnowfallDepthType> |
    TimeSeriesPropertyDryAir;

  export interface TimeSeriesKind<P extends [TimeSeriesProperty]> {
    status: '発表' | '継続';
    dateTime: string;
    properties: P;
  }

  export type TimeSeriesPropertiesRainRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesPrecipitation<Type extends PrecipitationTypes> = [TimeSeriesPropertyPrecipitation<Type>];
  export type TimeSeriesPropertiesLandslideRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesWindRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesWind = [TimeSeriesPropertyWind];
  export type TimeSeriesPropertiesSnowRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesSnow<Type extends SnowfallDepthType> = [TimeSeriesPropertySnow<Type>];
  export type TimeSeriesPropertiesWaveRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesWave = [TimeSeriesPropertyWave];
  export type TimeSeriesPropertiesStormSurgeRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesStormSurge = [TimeSeriesPropertyStormSurge];
  export type TimeSeriesPropertiesThunderRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesSnowMeltingRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesDenseFogRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesDryAirRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesDryAir = [TimeSeriesPropertyDryAir];
  export type TimeSeriesPropertiesAvalancheRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesLowTemperatureRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesFrostRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesIceAccretionRisk = [TimeSeriesPropertyRisk];
  export type TimeSeriesPropertiesSnowAccretionRisk = [TimeSeriesPropertyRisk];

  export type TimeSeriesKindProperties =
    TimeSeriesPropertiesRainRisk |
    TimeSeriesPropertiesPrecipitation<PrecipitationTypes> |
    TimeSeriesPropertiesLandslideRisk |
    TimeSeriesPropertiesWindRisk |
    TimeSeriesPropertiesWind |
    TimeSeriesPropertiesSnowRisk |
    TimeSeriesPropertiesSnow<SnowfallDepthType> |
    TimeSeriesPropertiesWaveRisk |
    TimeSeriesPropertiesWave |
    TimeSeriesPropertiesStormSurgeRisk |
    TimeSeriesPropertiesStormSurge |
    TimeSeriesPropertiesThunderRisk |
    TimeSeriesPropertiesSnowMeltingRisk |
    TimeSeriesPropertiesDenseFogRisk |
    TimeSeriesPropertiesDryAirRisk |
    TimeSeriesPropertiesDryAir |
    TimeSeriesPropertiesAvalancheRisk |
    TimeSeriesPropertiesLowTemperatureRisk |
    TimeSeriesPropertiesFrostRisk |
    TimeSeriesPropertiesIceAccretionRisk |
    TimeSeriesPropertiesSnowAccretionRisk;

  export type TimeSeriesKindRainRisk = TimeSeriesKind<TimeSeriesPropertiesRainRisk>;
  export type TimeSeriesKindPrecipitation<Type extends PrecipitationTypes> = TimeSeriesKind<TimeSeriesPropertiesPrecipitation<Type>>;
  export type TimeSeriesKindLandslideRisk = TimeSeriesKind<TimeSeriesPropertiesLandslideRisk>;
  export type TimeSeriesKindWindRisk = TimeSeriesKind<TimeSeriesPropertiesWindRisk>;
  export type TimeSeriesKindWind = TimeSeriesKind<TimeSeriesPropertiesWind>;
  export type TimeSeriesKindSnowRisk = TimeSeriesKind<TimeSeriesPropertiesSnowRisk>;
  export type TimeSeriesKindSnow<Type extends SnowfallDepthType> = TimeSeriesKind<TimeSeriesPropertiesSnow<Type>>;
  export type TimeSeriesKindWaveRisk = TimeSeriesKind<TimeSeriesPropertiesWaveRisk>;
  export type TimeSeriesKindWave = TimeSeriesKind<TimeSeriesPropertiesWave>;
  export type TimeSeriesKindStormSurgeRisk = TimeSeriesKind<TimeSeriesPropertiesStormSurgeRisk>;
  export type TimeSeriesKindStormSurge = TimeSeriesKind<TimeSeriesPropertiesStormSurge>;
  export type TimeSeriesKindThunderRisk = TimeSeriesKind<TimeSeriesPropertiesThunderRisk>;
  export type TimeSeriesKindSnowMeltingRisk = TimeSeriesKind<TimeSeriesPropertiesSnowMeltingRisk>;
  export type TimeSeriesKindDenseFogRisk = TimeSeriesKind<TimeSeriesPropertiesDenseFogRisk>;
  export type TimeSeriesKindDryAirRisk = TimeSeriesKind<TimeSeriesPropertiesDryAirRisk>;
  export type TimeSeriesKindDryAir = TimeSeriesKind<TimeSeriesPropertiesDryAir>;
  export type TimeSeriesKindAvalancheRisk = TimeSeriesKind<TimeSeriesPropertiesAvalancheRisk>;
  export type TimeSeriesKindLowTemperatureRisk = TimeSeriesKind<TimeSeriesPropertiesLowTemperatureRisk>;
  export type TimeSeriesKindFrostRisk = TimeSeriesKind<TimeSeriesPropertiesFrostRisk>;
  export type TimeSeriesKindIceAccretionRisk = TimeSeriesKind<TimeSeriesPropertiesIceAccretionRisk>;
  export type TimeSeriesKindSnowAccretionRisk = TimeSeriesKind<TimeSeriesPropertiesSnowAccretionRisk>;

  export type TimeSeriesCityKind =
    TimeSeriesKindRainRisk |
    TimeSeriesKindPrecipitation<PrecipitationTypes> |
    TimeSeriesKindLandslideRisk |
    TimeSeriesKindWindRisk |
    TimeSeriesKindWind |
    TimeSeriesKindSnowRisk |
    TimeSeriesKindSnow<SnowfallDepthType> |
    TimeSeriesKindWaveRisk |
    TimeSeriesKindWave |
    TimeSeriesKindStormSurgeRisk |
    TimeSeriesKindStormSurge |
    TimeSeriesKindThunderRisk |
    TimeSeriesKindSnowMeltingRisk |
    TimeSeriesKindDenseFogRisk |
    TimeSeriesKindDryAirRisk |
    TimeSeriesKindDryAir |
    TimeSeriesKindAvalancheRisk |
    TimeSeriesKindLowTemperatureRisk |
    TimeSeriesKindFrostRisk |
    TimeSeriesKindIceAccretionRisk |
    TimeSeriesKindSnowAccretionRisk;

  export interface TimeSeriesCity<Kinds extends TimeSeriesCityKind[]> extends Components.CodeName {
    kinds: Kinds;
    dateTime: string;
  }

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export interface TimeSeries<Kinds extends TimeSeriesCityKind[]> {
    timeDefines: TimeSeriesTimeDefine[];
    items: TimeSeriesCity<Kinds>[];
  }

  export type TimeSeriesCity1Kinds = [
    TimeSeriesKindRainRisk,
    TimeSeriesKindPrecipitation<'１時間最大雨量'>,
    TimeSeriesKindLandslideRisk,
    TimeSeriesKindWindRisk,
    TimeSeriesKindWind,
    TimeSeriesKindSnowRisk,
    TimeSeriesKindSnow<'６時間最大降雪量'>,
    TimeSeriesKindWaveRisk,
    TimeSeriesKindWave,
    TimeSeriesKindStormSurgeRisk,
    TimeSeriesKindStormSurge,
    TimeSeriesKindThunderRisk,
    TimeSeriesKindSnowMeltingRisk,
    TimeSeriesKindDenseFogRisk,
    TimeSeriesKindIceAccretionRisk,
    TimeSeriesKindSnowAccretionRisk
  ];
  export type TimeSeriesCity1 = TimeSeries<TimeSeriesCity1Kinds>;

  export type TimeSeriesCity2Kinds = [
    TimeSeriesKindPrecipitation<'２４時間最大雨量'>,
    TimeSeriesKindSnow<'２４時間最大降雪量'>
  ];
  export type TimeSeriesCity2 = TimeSeries<TimeSeriesCity2Kinds>;

  export type TimeSeriesCity3Kinds = [
    TimeSeriesKindDryAirRisk,
    TimeSeriesKindDryAir,
    TimeSeriesKindAvalancheRisk,
    TimeSeriesKindLowTemperatureRisk,
    TimeSeriesKindFrostRisk
  ];
  export type TimeSeriesCity3 = TimeSeries<TimeSeriesCity3Kinds>;

  export interface QuantitativeForecast {
    type: '量的予想時系列（市町村等）';
    timeSeries: [TimeSeriesCity1, TimeSeriesCity2, TimeSeriesCity3];
  }

  export interface PublicBody {
    city: QuantitativeForecast;
  }


  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '気象警報・注意報時系列情報（Ｒ０６）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: null;
    serialNo: null;
    infoKind: '気象警報・注意報時系列';
    headline: null;
    body: PublicBody;
  }

  export type Main = Public;
}
