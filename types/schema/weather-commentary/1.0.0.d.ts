import { TelegramJSONMain } from '../../main';
import { Components, Util } from '../../component';

export namespace WeatherCommentary {
  export interface Schema {
    type: 'weather-commentary';
    version: '1.0.0';
  }

  export interface TimeRef {
    refId: string;
  }

  export interface ReferableString {
    type: string;
    text: string;
  }

  export interface ReferableStringTimeRef {
    refId?: string;
    type: string;
    text: string;
  }

  // 雨量 観測データ形式、観測実況形式(M)、観測実況形式(T)、予想
  type PrecipitationTypes = `前${'１' | '２４' | '４８' | '７２'}時間降水量` | '前１時間解析雨量' | `${'１' | '２４' | '４８' | '７２'}時間最大雨量` | '降水量' | string;

  export type Precipitation = Util.ValueElement<PrecipitationTypes, 'mm', '以上' | '約'>;

  export interface PrecipitationBase {
    sentence?: string;
    precipitation: Precipitation;
    time: string;
    remark?: string;
  }

  export interface PrecipitationsBase {
    sentence?: string;
    precipitations: Util.TimeRefID<Precipitation>[];
    time?: string;
    remark?: string;
  }

  export type PrecipitationLocal = Util.Local<PrecipitationBase>;
  export type PrecipitationPart = Util.PartNoBase<PrecipitationBase, PrecipitationLocal>;

  export interface PrecipitationsBasePart extends PrecipitationsBase {
  }

  export type PrecipitationsLocal = Util.Local<PrecipitationsBase>;
  export type PrecipitationsPart = Util.Part<PrecipitationsBase, PrecipitationsLocal>;

  // 降雪量 観測データ形式、観測実況形式(M)、観測実況形式(T)、予想
  export type SnowfallDepthTypes = `${'３' | '６' | '１２' | '２４' | '４８' | '７２'}時間の降雪深さ` | '積雪量' | string;

  export interface SnowfallDepth {
    type: SnowfallDepthTypes;
    unit: 'cm';
    value: string;
    condition?: '以上' | '約';
  }

  export interface SnowfallDepthBase {
    sentence?: string;
    snowfallDepths: [SnowfallDepth];
    time: string;
    remark?: string;
  }

  interface SnowfallDepthTimeRef extends TimeRef, SnowfallDepth {
  }

  export interface SnowfallDepthsBase {
    sentence?: string;
    snowfallDepths: SnowfallDepthTimeRef[];
    time?: string;
    remark?: string;
  }

  export type SnowfallDepthLocal = Util.Local<SnowfallDepthBase>;
  export type SnowfallDepthPart = Util.PartNoBase<SnowfallDepthBase, SnowfallDepthLocal>;

  export interface SnowfallDepthsBasePart extends SnowfallDepthsBase {
  }

  export type SnowfallDepthsLocal = Util.Local<SnowfallDepthsBase>;
  export type SnowfallDepthsPart = Util.Part<SnowfallDepthsBase, SnowfallDepthsLocal>;

  // 積雪 観測データ形式、観測実況形式(M)、観測実況形式(T)
  export interface SnowDepth {
    type: '積雪深' | string;
    unit: 'cm';
    value: string;
    condition?: '以上' | '約';
  }

  export interface SnowDepthBase {
    sentence?: string;
    snowDepth: SnowDepth;
    time: string;
    remark?: string;
  }

  interface SnowDepthTimeRef extends TimeRef, SnowDepth {
  }

  export interface SnowDepthsBase {
    sentence?: string;
    snowDepths: SnowDepthTimeRef[];
    time: string;
    remark?: string;
  }

  export type SnowDepthLocal = Util.Local<SnowDepthBase>;
  export type SnowDepthPart = Util.PartNoBase<SnowDepthBase, SnowDepthLocal>;

  export interface SnowDepthsBasePart extends SnowDepthsBase {
  }

  export type SnowDepthsLocal = Util.Local<SnowDepthsBase>;
  export type SnowDepthsPart = Util.Part<SnowDepthsBase, SnowDepthsLocal>;

  // 風向風速 観測データ形式、観測実況形式(T)
  export type SpeedTypes = '風速' | '最大風速' | '最大瞬間風速';

  export type Direction = Util.ValueElement<'風向', '８方位漢字' | '１６方位漢字'>;
  export type Speed = Util.ValueElement<SpeedTypes, 'm/s'>;

  export interface WindBase {
    direction: Direction;
    speed: Speed;
    time: string;
    remark?: string;
  }

  export interface WindsBase {
    sentence?: string;
    directions: Util.TimeRefID<Direction>[];
    speeds: Util.TimeRefID<Speed>[];
    time: string;
    remark?: string;
  }

  export interface WindSpeedsBase {
    speeds: Util.TimeRefID<Speed>[];
  }

  export interface WindDirectionsBase {
    directions: Util.TimeRefID<Direction>[];
  }

  export type WindPart = WindBase;

  export interface WindsBasePart extends WindsBase {
  }

  export type WindsLocal = Util.Local<WindsBase>;
  export type WindsPart = Util.Part<WindsBase, WindsLocal>;

  export type WindSpeedsLocal = Util.Local<WindSpeedsBase>;
  export type WindSpeedsPart = Util.Part<WindSpeedsBase, WindSpeedsLocal>;

  export type WindDirectionsLocal = Util.Local<WindDirectionsBase>;
  export type WindDirectionsBecoming = Util.Becoming<WindDirectionsBase, WindDirectionsLocal>;
  export type WindDirectionsPart = Util.Part<WindDirectionsBase, WindDirectionsLocal, WindDirectionsBecoming[]>;

  // イベント 観測データ形式、観測実況形式(M)、観測実況形式(T)、予想
  export interface Event {
    type: '線状降水帯' | '高潮' | string;
    sentence?: string;
    eventName?: '越流' | '越波' | '堤防決壊' | '警戒・注意' | '線状降水帯発生' | '線状降水帯予想' | string;
    eventClass?: string;
    time?: string;
    duration?: string;
  }

  export interface EventBase {
    sentence?: string;
    event: Event;
  }

  interface EventTimeRef extends TimeRef, Event {
  }

  export interface EventsBase {
    sentence?: string;
    events: EventTimeRef[];
  }

  export type EventLocal = Util.Local<EventBase>;
  export type EventPart = Util.PartNoBase<EventBase, EventLocal>;

  export interface EventsBasePart extends EventsBase {
  }

  export type EventsLocal = Util.Local<EventsBase>;
  export type EventsPart = Util.Part<EventsBase, EventsLocal>;

  // 視程 観測実況形式(M)、観測実況形式(T)、予想
  export type Visibility = Util.ValueElement<'視程', 'm' | 'km', '以上' | '以下' | '未満'>;

  export interface VisibilityBase {
    sentence?: string;
    visibility: Visibility;
    time: string;
    remark?: string;
  }

  export interface VisibilitiesBase {
    sentence?: string;
    visibilities: Util.TimeRefID<Visibility>[];
    time?: string;
    remark?: string;
  }

  export type VisibilityPart = VisibilityBase;

  export interface VisibilitiesBasePart extends VisibilitiesBase {
  }

  export type VisibilitiesLocal = Util.Local<VisibilitiesBase>;
  export type VisibilitiesPart = Util.Part<VisibilitiesBase, VisibilitiesLocal>;

  // 水位 観測実況形式(T)、予想
  export type WaveHeightTypes = '波高' | 'うちあげ高水位' | '最高うちあげ高水位' | string;

  export type WaveHeight = Util.ValueElement<WaveHeightTypes, 'm' | 'cm', '以上' | '約' | 'うねり'>;

  export interface WaveHeightsBase {
    sentence?: string;
    waveHeights: Util.TimeRefID<WaveHeight>[];
    time?: string;
    remark?: string;
  }

  export interface WaveHeightsBasePart extends WaveHeightsBase {
  }

  export type WaveHeightsLocal = Util.Local<WaveHeightsBase>;
  export type WaveHeightsPart = Util.Part<WaveHeightsBase, WaveHeightsLocal>;

  // 潮位 観測実況形式(M)、観測実況形式(T)、予想
  export type TidalLevelTypes = '潮位' | '最高潮位' | '満潮潮位' | '干潮潮位' | '副振動の山から谷の高さ' | string;

  export type TidalLevel = Util.ValueElement<TidalLevelTypes, 'm' | 'cm', '以上' | '約'>;
  export type TidalPeriod = Util.ValueElement<'副振動の周期', '分', '約'>;

  export interface TidalLevelBase {
    sentence?: string;
    tidalLevel: TidalLevel;
    tidalPeriod?: TidalPeriod;
    time: string;
    remark?: string;
  }

  export interface TidalLevelSequence {
    refId: string;
    sentence?: string;
    tidalLevels?: TidalLevel[];
    time?: string;
    remark?: string;
  }

  export type TidalLevelsBase = {
    sentence?: string;
    tidalLevels: Util.TimeRefID<TidalLevel>[];
    sequences?: never;
    time?: string;
    remark?: string;
  } | {
    sentence?: never;
    tidalLevels?: never;
    sequences: TidalLevelSequence[];
    time?: string;
    remark?: string;
  }


  export type TidalLevelPart = TidalLevelBase;
  export type TidalLevelsBasePart = TidalLevelsBase & {};
  export type TidalLevelsLocal = Util.Local<TidalLevelsBase>;
  export type TidalLevelsPart = Util.Part<TidalLevelsBase, TidalLevelsLocal>;

  // 気温 観測実況形式(M)、観測実況形式(T)、予想
  export type TemperatureTypes = '気温' | '最低気温' | '最高気温' | '朝の最低気温' | '日中の最高気温' | string;

  export type Temperature = Util.ValueElement<TemperatureTypes, '度', '以上' | '以下' | '未満'>;

  export interface TemperatureBase {
    sentence?: string;
    temperature: Temperature;
    time: string;
    remark?: string;
  }

  export interface TemperaturesBase {
    sentence?: string;
    temperatures: Util.TimeRefID<Temperature>[];
    time?: string;
    remark?: string;
  }

  export type TemperaturePart = TemperatureBase;

  export interface TemperaturesBasePart extends TemperaturesBase {
  }

  export type TemperaturesLocal = Util.Local<TemperaturesBase>;
  export type TemperaturesPart = Util.Part<TemperaturesBase, TemperaturesLocal>;

  // 湿度 観測実況形式(T)、予想
  export type HumidityTypes = '湿度' | '実効湿度' | '最小湿度' | string;

  export type Humidity = Util.ValueElement<HumidityTypes, '%', '以上' | '以下' | '未満'>;

  export interface HumiditiesBase {
    sentence?: string;
    humidities: Util.TimeRefID<Humidity>[];
    time?: string;
    remark?: string;
  }

  export interface HumiditiesBasePart extends HumiditiesBase {
  }

  export type HumiditiesLocal = Util.Local<HumiditiesBase>;
  export type HumiditiesPart = Util.Part<HumiditiesBase, HumiditiesLocal>;

  // 警報級の可能性 予想
  export type PossibilityRankOfWarningTypes = `${ '大雨' | '土砂災害' | '風（風雪）' | '波' | '潮位' }の警報級の可能性`;

  export type PossibilityRankOfWarning = {
    refId: string;
    type: PossibilityRankOfWarningTypes
    value: '中' | '高';
    condition?: never;
  } | {
    refId: string;
    type: PossibilityRankOfWarningTypes;
    value: null;
    condition: '値なし';
  };

  export type PossibilityRankOfWarnings = PossibilityRankOfWarning[];


  // 危険度 予想
  export type SignificancyTypes =
    '土砂災害危険度' |
    '大雨浸水危険度' |
    '雪危険度' |
    '風危険度' |
    '波危険度' |
    '高潮危険度';

// 危険度
  export interface Significancy {
    refId: string;
    type: SignificancyTypes;
    sentence?: string;
    code: '50' | '30' | '20' | '01' | '51' | '41' | '31' | '22' | '21' | '11' | '00';
    name: '特別警報級' | '警報級' | '注意報級' | '注意報級未満' | '警戒レベル５相当' | '警戒レベル４相当' | '警戒レベル３相当' | '警戒レベル２相当' | '警戒レベル２' | '警戒レベル２未満' | '値なし';
  }

  export interface SignificancesBase {
    significances: Significancy[];
  }

  export type SignificancesLocal = Util.Local<SignificancesBase>;
  export type SignificancesPart = Util.Part<SignificancesBase, SignificancesLocal>;


  export interface InfoPropertySentence<Type extends string = string> {
    type: Type;
    texts: ReferableString[];
  }

  export interface InfoObservationPropertyPrecipitation {
    type: '雨の実況';
    precipitationParts: [PrecipitationPart];
  }

  export interface InfoObservationPropertySnowfallDepth {
    type: '雪の実況';
    snowfallDepthPart: SnowfallDepthPart;
  }

  export interface InfoObservationPropertySnowDepth {
    type: '雪の実況';
    snowDepthPart: SnowDepthPart;
  }

  export interface InfoObservationPropertyWind {
    type: '風の実況';
    windPart: WindPart;
  }

  export interface InfoObservationPropertyEvent {
    type: '気象現象の実況';
    eventPart: EventPart;
  }

  export interface InfoObservationPropertyVisibility {
    type: '視程の実況';
    visibilityPart: VisibilityPart;
  }

  export interface InfoObservationPropertyTidalLevel {
    type: '副振動の実況';
    tidalLevelPart: TidalLevelPart;
  }

  export interface InfoObservationPropertyTemperature {
    type: '気温の実況';
    temperaturePart: TemperaturePart;
  }


  export interface TimeSeriesPropertySentence {
    type: string;
    texts: ReferableStringTimeRef[];
  }

  export interface TimeSeriesObservationPropertyPrecipitation {
    type: '雨の実況';
    precipitationParts: [PrecipitationsBasePart];
  }

  export interface TimeSeriesObservationPropertySnowfallDepth {
    type: '雪の実況';
    snowfallDepthPart: SnowfallDepthsBasePart;
  }

  export interface TimeSeriesObservationPropertySnowDepth {
    type: '雪の実況';
    snowDepthPart: SnowDepthsBasePart;
  }

  export interface TimeSeriesObservationPropertyWind {
    type: '風の実況';
    windPart: WindsBasePart;
  }

  export interface TimeSeriesObservationPropertyWaveHeight {
    type: '波の実況' | '水位の実況';
    waveHeightPart: WaveHeightsBasePart;
  }

  export interface TimeSeriesObservationPropertyVisibility {
    type: '視程の実況';
    visibilityPart: VisibilitiesBasePart;
  }

  export interface TimeSeriesObservationPropertyTidalLevel {
    type: '潮位の実況' | '副振動の実況';
    tidalLevelPart: TidalLevelsBasePart;
  }

  export interface TimeSeriesObservationPropertyTemperature {
    type: '気温の実況';
    temperaturePart: TemperaturesBasePart;
  }

  export interface TimeSeriesObservationPropertyHumidity {
    type: '湿度の実況';
    humidityParts: [HumiditiesBasePart];
  }

  export interface TimeSeriesObservationPropertyEvent {
    type: '気象現象の実況';
    eventPart: EventsBasePart;
  }

  export interface TimeSeriesForecastPropertyPrecipitation {
    type: '雨の予想';
    precipitationParts: [PrecipitationsPart];
  }

  export interface TimeSeriesForecastPropertySnowfallDepth {
    type: '雪の予想';
    snowfallDepthPart: SnowfallDepthsPart;
  }

  /**
   *2026年05月現在、運用されないが、将来の拡張のため定義
   */
  export interface TimeSeriesForecastPropertySnowDepth {
    type: '雪の予想';
    snowDepthPart: SnowDepthsPart;
  }

  export interface TimeSeriesForecastPropertyWind {
    type: '風の予想';
    windDirectionPart?: WindDirectionsPart;
    windSpeedPart: WindSpeedsPart;
  }

  export interface TimeSeriesForecastPropertyWaveHeight {
    type: '波の予想' | '水位の予想';
    waveHeightPart: WaveHeightsPart;
  }

  export interface TimeSeriesForecastPropertyVisibility {
    type: '視程の予想';
    visibilityPart: VisibilitiesPart;
  }

  export interface TimeSeriesForecastPropertyTidalLevel {
    type: '潮位の予想';
    tidalLevelPart: TidalLevelsPart;
  }

  export interface TimeSeriesForecastPropertyTemperature {
    type: '湿度の予想';
    temperaturePart: TemperaturesPart;
  }

  export interface TimeSeriesForecastPropertyHumidity {
    type: '湿度の実況';
    humidityParts: [HumiditiesPart];
  }

  export interface TimeSeriesForecastPropertyEvent {
    type: '気象現象の予想';
    eventPart: EventsPart;
  }

  export interface TimeSeriesForecastPropertyPossibilityRankOfWarning {
    type: PossibilityRankOfWarningTypes;
    possibilityRankOfWarnings: PossibilityRankOfWarnings;
    texts?: [{ text: string }];
  }

  export interface TimeSeriesForecastPropertySignificancy {
    type: SignificancyTypes;
    significancyPart: SignificancesPart;
  }

  export type InfoProperty =
    InfoPropertySentence |
    InfoObservationPropertyPrecipitation |
    InfoObservationPropertySnowfallDepth |
    InfoObservationPropertySnowDepth |
    InfoObservationPropertyWind |
    InfoObservationPropertyEvent |
    InfoObservationPropertyVisibility |
    InfoObservationPropertyTidalLevel |
    InfoObservationPropertyTemperature;


  export type TimeSeriesObservationProperty =
    TimeSeriesPropertySentence |
    TimeSeriesObservationPropertyPrecipitation |
    TimeSeriesObservationPropertySnowfallDepth |
    TimeSeriesObservationPropertySnowDepth |
    TimeSeriesObservationPropertyWind |
    TimeSeriesObservationPropertyWaveHeight |
    TimeSeriesObservationPropertyVisibility |
    TimeSeriesObservationPropertyTidalLevel |
    TimeSeriesObservationPropertyTemperature |
    TimeSeriesObservationPropertyHumidity |
    TimeSeriesObservationPropertyEvent;

  export type TimeSeriesForecastProperty =
    TimeSeriesPropertySentence |
    TimeSeriesForecastPropertyPrecipitation |
    TimeSeriesForecastPropertySnowfallDepth |
    TimeSeriesForecastPropertySnowDepth |
    TimeSeriesForecastPropertyWind |
    TimeSeriesForecastPropertyWaveHeight |
    TimeSeriesForecastPropertyVisibility |
    TimeSeriesForecastPropertyTidalLevel |
    TimeSeriesForecastPropertyTemperature |
    TimeSeriesForecastPropertyHumidity |
    TimeSeriesForecastPropertyEvent |
    TimeSeriesForecastPropertyPossibilityRankOfWarning |
    TimeSeriesForecastPropertySignificancy;

  export interface InfoKindBase<P extends InfoProperty[]> {
    properties: P;
  }

  export interface TimeSeriesKindBase<P extends (TimeSeriesObservationProperty | TimeSeriesForecastProperty)[]> {
    properties: P;
  }

  export type InfoPropertiesSentence = InfoPropertySentence[];
  export type InfoObservationPropertiesPrecipitation = [InfoObservationPropertyPrecipitation];
  export type InfoObservationPropertiesSnowfallDepth = [InfoObservationPropertySnowfallDepth];
  export type InfoObservationPropertiesSnowDepth = [InfoObservationPropertySnowDepth];
  export type InfoObservationPropertiesWind = InfoObservationPropertyWind[];
  export type InfoObservationPropertiesEvent = [InfoObservationPropertyEvent];
  export type InfoObservationPropertiesVisibility = [InfoObservationPropertyVisibility];
  export type InfoObservationPropertiesTidalLevel = [InfoObservationPropertyTidalLevel];
  export type InfoObservationPropertiesTemperature = [InfoObservationPropertyTemperature];

  export type TimeSeriesPropertiesSentence = [TimeSeriesPropertySentence];
  export type TimeSeriesObservationPropertiesPrecipitation = [TimeSeriesObservationPropertyPrecipitation];
  export type TimeSeriesObservationPropertiesSnowfallDepth = [TimeSeriesObservationPropertySnowfallDepth];
  export type TimeSeriesObservationPropertiesSnowDepth = [TimeSeriesObservationPropertySnowDepth];
  export type TimeSeriesObservationPropertiesWind = TimeSeriesObservationPropertyWind[];
  export type TimeSeriesObservationPropertiesWaveHeight = [TimeSeriesObservationPropertyWaveHeight];
  export type TimeSeriesObservationPropertiesVisibility = [TimeSeriesObservationPropertyVisibility];
  export type TimeSeriesObservationPropertiesTidalLevel = [TimeSeriesObservationPropertyTidalLevel];
  export type TimeSeriesObservationPropertiesTemperature = [TimeSeriesObservationPropertyTemperature];
  export type TimeSeriesObservationPropertiesHumidity = [TimeSeriesObservationPropertyHumidity];
  export type TimeSeriesObservationPropertiesEvent = [TimeSeriesObservationPropertyEvent];
  export type TimeSeriesForecastPropertiesPrecipitation = [TimeSeriesForecastPropertyPrecipitation];
  export type TimeSeriesForecastPropertiesSnowfallDepth = [TimeSeriesForecastPropertySnowfallDepth];
  export type TimeSeriesForecastPropertiesSnowDepth = [TimeSeriesForecastPropertySnowDepth];
  export type TimeSeriesForecastPropertiesWind = [TimeSeriesForecastPropertyWind];
  export type TimeSeriesForecastPropertiesWaveHeight = [TimeSeriesForecastPropertyWaveHeight];
  export type TimeSeriesForecastPropertiesVisibility = [TimeSeriesForecastPropertyVisibility];
  export type TimeSeriesForecastPropertiesTidalLevel = [TimeSeriesForecastPropertyTidalLevel];
  export type TimeSeriesForecastPropertiesTemperature = [TimeSeriesForecastPropertyTemperature];
  export type TimeSeriesForecastPropertiesHumidity = [TimeSeriesForecastPropertyHumidity];
  export type TimeSeriesForecastPropertiesEvent = [TimeSeriesForecastPropertyEvent];
  export type TimeSeriesForecastPropertiesPossibilityRankOfWarning = [TimeSeriesForecastPropertyPossibilityRankOfWarning];
  export type TimeSeriesForecastPropertiesSignificancy = [TimeSeriesForecastPropertySignificancy];

  export type InfoKindProperties =
    InfoPropertiesSentence |
    InfoObservationPropertiesPrecipitation |
    InfoObservationPropertiesSnowfallDepth |
    InfoObservationPropertiesSnowDepth |
    InfoObservationPropertiesWind |
    InfoObservationPropertiesEvent |
    InfoObservationPropertiesVisibility |
    InfoObservationPropertiesTidalLevel |
    InfoObservationPropertiesTemperature;

  export type TimeSeriesKindProperties =
    TimeSeriesPropertiesSentence |
    TimeSeriesObservationPropertiesPrecipitation |
    TimeSeriesObservationPropertiesSnowfallDepth |
    TimeSeriesObservationPropertiesSnowDepth |
    TimeSeriesObservationPropertiesWind |
    TimeSeriesObservationPropertiesWaveHeight |
    TimeSeriesObservationPropertiesVisibility |
    TimeSeriesObservationPropertiesTidalLevel |
    TimeSeriesObservationPropertiesTemperature |
    TimeSeriesObservationPropertiesHumidity |
    TimeSeriesObservationPropertiesEvent |
    TimeSeriesForecastPropertiesPrecipitation |
    TimeSeriesForecastPropertiesSnowfallDepth |
    TimeSeriesForecastPropertiesSnowDepth |
    TimeSeriesForecastPropertiesWind |
    TimeSeriesForecastPropertiesWaveHeight |
    TimeSeriesForecastPropertiesVisibility |
    TimeSeriesForecastPropertiesTidalLevel |
    TimeSeriesForecastPropertiesTemperature |
    TimeSeriesForecastPropertiesHumidity |
    TimeSeriesForecastPropertiesEvent |
    TimeSeriesForecastPropertiesPossibilityRankOfWarning |
    TimeSeriesForecastPropertiesSignificancy;

  export type InfoKindSentence = InfoKindBase<InfoPropertiesSentence>;
  export type InfoObservationKindPrecipitation = InfoKindBase<InfoObservationPropertiesPrecipitation>;
  export type InfoObservationKindSnowfallDepth = InfoKindBase<InfoObservationPropertiesSnowfallDepth>;
  export type InfoObservationKindSnowDepth = InfoKindBase<InfoObservationPropertiesSnowDepth>;
  export type InfoObservationKindWind = InfoKindBase<InfoObservationPropertiesWind>;
  export type InfoObservationKindEvent = InfoKindBase<InfoObservationPropertiesEvent>;
  export type InfoObservationKindVisibility = InfoKindBase<InfoObservationPropertiesVisibility>;
  export type InfoObservationKindTidalLevel = InfoKindBase<InfoObservationPropertiesTidalLevel>;
  export type InfoObservationKindTemperature = InfoKindBase<InfoObservationPropertiesTemperature>;

  export type TimeSeriesKindSentence = TimeSeriesKindBase<TimeSeriesPropertiesSentence>;
  export type TimeSeriesObservationKindPrecipitation = TimeSeriesKindBase<TimeSeriesObservationPropertiesPrecipitation>;
  export type TimeSeriesObservationKindSnowfallDepth = TimeSeriesKindBase<TimeSeriesObservationPropertiesSnowfallDepth>;
  export type TimeSeriesObservationKindSnowDepth = TimeSeriesKindBase<TimeSeriesObservationPropertiesSnowDepth>;
  export type TimeSeriesObservationKindWind = TimeSeriesKindBase<TimeSeriesObservationPropertiesWind>;
  export type TimeSeriesObservationKindWaveHeight = TimeSeriesKindBase<TimeSeriesObservationPropertiesWaveHeight>;
  export type TimeSeriesObservationKindVisibility = TimeSeriesKindBase<TimeSeriesObservationPropertiesVisibility>;
  export type TimeSeriesObservationKindTidalLevel = TimeSeriesKindBase<TimeSeriesObservationPropertiesTidalLevel>;
  export type TimeSeriesObservationKindTemperature = TimeSeriesKindBase<TimeSeriesObservationPropertiesTemperature>;
  export type TimeSeriesObservationKindHumidity = TimeSeriesKindBase<TimeSeriesObservationPropertiesHumidity>;
  export type TimeSeriesObservationKindEvent = TimeSeriesKindBase<TimeSeriesObservationPropertiesEvent>;
  export type TimeSeriesForecastKindPrecipitation = TimeSeriesKindBase<TimeSeriesForecastPropertiesPrecipitation>;
  export type TimeSeriesForecastKindSnowfallDepth = TimeSeriesKindBase<TimeSeriesForecastPropertiesSnowfallDepth>;
  export type TimeSeriesForecastKindSnowDepth = TimeSeriesKindBase<TimeSeriesForecastPropertiesSnowDepth>;
  export type TimeSeriesForecastKindWind = TimeSeriesKindBase<TimeSeriesForecastPropertiesWind>;
  export type TimeSeriesForecastKindWaveHeight = TimeSeriesKindBase<TimeSeriesForecastPropertiesWaveHeight>;
  export type TimeSeriesForecastKindVisibility = TimeSeriesKindBase<TimeSeriesForecastPropertiesVisibility>;
  export type TimeSeriesForecastKindTidalLevel = TimeSeriesKindBase<TimeSeriesForecastPropertiesTidalLevel>;
  export type TimeSeriesForecastKindTemperature = TimeSeriesKindBase<TimeSeriesForecastPropertiesTemperature>;
  export type TimeSeriesForecastKindHumidity = TimeSeriesKindBase<TimeSeriesForecastPropertiesHumidity>;
  export type TimeSeriesForecastKindEvent = TimeSeriesKindBase<TimeSeriesForecastPropertiesEvent>;
  export type TimeSeriesForecastKindPossibilityRankOfWarning = TimeSeriesKindBase<TimeSeriesForecastPropertiesPossibilityRankOfWarning>;
  export type TimeSeriesForecastKindSignificancy = TimeSeriesKindBase<TimeSeriesForecastPropertiesSignificancy>;

  export type InfoKind =
    InfoKindSentence |
    InfoObservationKindPrecipitation |
    InfoObservationKindSnowfallDepth |
    InfoObservationKindSnowDepth |
    InfoObservationKindWind |
    InfoObservationKindEvent |
    InfoObservationKindVisibility |
    InfoObservationKindTidalLevel |
    InfoObservationKindTemperature;

  export type TimeSeriesObservationKind =
    TimeSeriesKindSentence |
    TimeSeriesObservationKindPrecipitation |
    TimeSeriesObservationKindSnowfallDepth |
    TimeSeriesObservationKindSnowDepth |
    TimeSeriesObservationKindWind |
    TimeSeriesObservationKindWaveHeight |
    TimeSeriesObservationKindVisibility |
    TimeSeriesObservationKindTidalLevel |
    TimeSeriesObservationKindTemperature |
    TimeSeriesObservationKindHumidity |
    TimeSeriesObservationKindEvent;

  export type TimeSeriesForecastKind =
    TimeSeriesKindSentence |
    TimeSeriesForecastKindPrecipitation |
    TimeSeriesForecastKindSnowfallDepth |
    TimeSeriesForecastKindSnowDepth |
    TimeSeriesForecastKindWind |
    TimeSeriesForecastKindWaveHeight |
    TimeSeriesForecastKindVisibility |
    TimeSeriesForecastKindTidalLevel |
    TimeSeriesForecastKindTemperature |
    TimeSeriesForecastKindHumidity |
    TimeSeriesForecastKindEvent |
    TimeSeriesForecastKindPossibilityRankOfWarning |
    TimeSeriesForecastKindSignificancy;

  export type TimeSeriesKind = TimeSeriesObservationKind | TimeSeriesForecastKind;

  export interface AreaSubCity {
    names?: string[];
    codes?: string[];
  }

  export interface InfoArea<Kinds extends InfoKind[]> {
    code?: string;
    codeType: '気象情報／府県予報区・細分区域等' | '気象・地震・火山情報／市町村等';
    name: string;
    subCity?: AreaSubCity;
    status?: '付近';
    kinds: Kinds;
  }

  export interface InfoStation<Kinds extends InfoKind[]> {
    code: string;
    codeType: '国際地点番号' | 'アメダス地点番号' | '他機関観測地点番号' | '潮位観測地点番号';
    name: string;
    location: string;
    kinds: Kinds;
  }

  export interface InfoSentence<Kinds extends InfoKindSentence[]> {
    kinds: Kinds;
  }

  export interface TimeSeriesArea<Kinds extends TimeSeriesKind[]> {
    code?: string;
    codeType: '全国・地方予報区等' | '気象情報／府県予報区・細分区域等' | '気象・地震・火山情報／市町村等';
    name: string;
    codes?: string[];
    subCity?: AreaSubCity;
    status?: '付近';
    kinds: Kinds;
  }

  export interface TimeSeriesStation<Kinds extends TimeSeriesKind[]> {
    code: string;
    codeType: '国際地点番号' | 'アメダス地点番号' | '他機関観測地点番号' | '委託観測所番号' | '高潮予報区間' | '潮位観測地点番号';
    name: string;
    location: string;
    kinds: Kinds;
  }

  export interface TimeSeriesSentence<Kinds extends TimeSeriesKindSentence[]> {
    kinds: Kinds;
  }

  export interface InfoBase<Items extends (InfoSentence<InfoKindSentence[]> | InfoArea<InfoKind[]> | InfoStation<InfoKind[]>)[]> {
    dateTime: string;
    items: Items;
  }

  export interface TimeSeriesTimeDefine {
    timeId: string;
    dateTime: string;
    duration: string;
    name: string;
  }

  export interface TimeSeriesBase<Items extends (TimeSeriesSentence<TimeSeriesKindSentence[]> | TimeSeriesArea<TimeSeriesKind[]> | TimeSeriesStation<TimeSeriesKind[]>)[]> {
    timeDefines: TimeSeriesTimeDefine[];
    items: Items;
  }

  export type InfoComment = InfoBase<[InfoSentence<[InfoKindSentence]>]>;
  export type InfoObservation = InfoBase<[
    InfoSentence<[InfoKindSentence]>,
    ...(InfoArea<[InfoKind]> | InfoStation<[InfoKind]> | InfoSentence<[InfoKindSentence]>)[],
  ]> | InfoBase<(InfoArea<[InfoKind]> | InfoStation<[InfoKind]>)[]>;

  export type TimeSeriesObservationItems<Kind extends TimeSeriesObservationKind = TimeSeriesObservationKind> = [
    TimeSeriesSentence<[TimeSeriesKindSentence]>,
    ...((TimeSeriesArea<[Kind]> | TimeSeriesStation<[Kind]> | TimeSeriesSentence<[TimeSeriesKindSentence]>)[])
  ];
  export type TimeSeriesForecastItems<Kind extends TimeSeriesForecastKind = TimeSeriesForecastKind> = [
    TimeSeriesSentence<[TimeSeriesKindSentence]>,
    ...((TimeSeriesArea<[Kind]> | TimeSeriesStation<[Kind]> | TimeSeriesSentence<[TimeSeriesKindSentence]>)[])
  ];
  //
  // export type TimeSeriesObservationItemsPrecipitation = TimeSeriesItemsBase<'雨の実況', TimeSeriesObservationKindPrecipitation>;
  // export type TimeSeriesObservationItemsSnowfallDepth = TimeSeriesItemsBase<'雪の実況', TimeSeriesObservationKindSnowfallDepth>;
  // export type TimeSeriesObservationItemsSnowDepth = TimeSeriesItemsBase<'雪の実況', TimeSeriesObservationKindSnowDepth>;
  // export type TimeSeriesObservationItemsWind = TimeSeriesItemsBase<'風の実況', TimeSeriesObservationKindWind>;
  // export type TimeSeriesObservationItemsWaveHeight = TimeSeriesItemsBase<'波の実況' | '水位の実況', TimeSeriesObservationKindWaveHeight>;
  // export type TimeSeriesObservationItemsVisibility = TimeSeriesItemsBase<'視程の実況', TimeSeriesObservationKindVisibility>;
  // export type TimeSeriesObservationItemsTidalLevel = TimeSeriesItemsBase<'潮位の実況' | '副振動の実況', TimeSeriesObservationKindTidalLevel>;
  // export type TimeSeriesObservationItemsTemperature = TimeSeriesItemsBase<'気温の実況', TimeSeriesObservationKindTemperature>;
  // export type TimeSeriesObservationItemsHumidity = TimeSeriesItemsBase<'湿度の実況', TimeSeriesObservationKindHumidity>;
  // export type TimeSeriesObservationItemsEvent = TimeSeriesItemsBase<'気象現象の実況', TimeSeriesKindSentence>;
  // export type TimeSeriesObservationItemsText = TimeSeriesItemsBase<'その他の実況', TimeSeriesObservationKindEvent>;
  // export type TimeSeriesForecastItemsPrecipitation = TimeSeriesItemsBase<'雨の予想', TimeSeriesForecastKindPrecipitation>;
  // export type TimeSeriesForecastItemsSnowfallDepth = TimeSeriesItemsBase<'雪の予想', TimeSeriesForecastKindSnowfallDepth>;
  // export type TimeSeriesForecastItemsWind = TimeSeriesItemsBase<'風の予想', TimeSeriesForecastKindWind>;
  // export type TimeSeriesForecastItemsWaveHeight = TimeSeriesItemsBase<'波の予想' | '水位の予想', TimeSeriesForecastKindWaveHeight>;
  // export type TimeSeriesForecastItemsVisibility = TimeSeriesItemsBase<'視程の予想', TimeSeriesForecastKindVisibility>;
  // export type TimeSeriesForecastItemsTidalLevel = TimeSeriesItemsBase<'潮位の予想', TimeSeriesForecastKindTidalLevel>;
  // export type TimeSeriesForecastItemsTemperature = TimeSeriesItemsBase<'気温の予想', TimeSeriesForecastKindTemperature>;
  // export type TimeSeriesForecastItemsHumidity = TimeSeriesItemsBase<'湿度の予想', TimeSeriesForecastKindHumidity>;
  // export type TimeSeriesForecastItemsEvent = TimeSeriesItemsBase<'気象現象の予想', TimeSeriesForecastKindEvent>;
  // export type TimeSeriesForecastItemsText = TimeSeriesItemsBase<'その他の予想', TimeSeriesKindSentence>;
  // export type TimeSeriesForecastItemsPossibilityRankOfWarning = TimeSeriesItemsBase<PossibilityRankOfWarningTypes, TimeSeriesForecastKindPossibilityRankOfWarning>;
  // export type TimeSeriesForecastItemsSignificancy = TimeSeriesItemsBase<SignificancyTypes, TimeSeriesForecastKindSignificancy>;
  //
  // export type TimeSeriesObservation =
  //   TimeSeriesObservationItemsPrecipitation |
  //   TimeSeriesObservationItemsSnowfallDepth |
  //   TimeSeriesObservationItemsSnowDepth |
  //   TimeSeriesObservationItemsWind |
  //   TimeSeriesObservationItemsWaveHeight |
  //   TimeSeriesObservationItemsVisibility |
  //   TimeSeriesObservationItemsTidalLevel |
  //   TimeSeriesObservationItemsTemperature |
  //   TimeSeriesObservationItemsHumidity |
  //   TimeSeriesObservationItemsEvent |
  //   TimeSeriesObservationItemsText;
  // export type TimeSeriesForecast =
  //   TimeSeriesForecastItemsPrecipitation |
  //   TimeSeriesForecastItemsWind |
  //   TimeSeriesForecastItemsWaveHeight |
  //   TimeSeriesForecastItemsVisibility |
  //   TimeSeriesForecastItemsTidalLevel |
  //   TimeSeriesForecastItemsTemperature |
  //   TimeSeriesForecastItemsHumidity |
  //   TimeSeriesForecastItemsEvent |
  //   TimeSeriesForecastItemsText |
  //   TimeSeriesForecastItemsPossibilityRankOfWarning |
  //   TimeSeriesForecastItemsSignificancy;

  type TimeSeriesObservation = TimeSeriesBase<TimeSeriesObservationItems>;
  type TimeSeriesForecast = TimeSeriesBase<TimeSeriesForecastItems>;

  export interface WeatherSummary {
    type: '概況';
    infos: [InfoComment];
    text: string;
  }

  export interface Observation {
    type: '観測実況';
    infos?: InfoObservation[];
    timeSeries?: TimeSeriesObservation[];
  }

  export interface Forecast {
    type: '予想';
    timeSeries: TimeSeriesForecast[];
  }

  export interface DisasterPreventionInfo {
    type: '防災事項';
    infos: [InfoComment];
    text: string;
  }

  export interface AdditionalInfo {
    type: '付加情報';
    infos: [InfoComment];
    text: string;
  }

  export type InformationTagNames =
    '線状降水帯発生' |
    '線状降水帯直前' |
    '線状降水帯予測' |
    '記録雨' |
    '短時間大雪' |
    '大雨' |
    '洪水' |
    '大雪' |
    '雪' |
    '暴風' |
    '暴風雪' |
    '強風' |
    '風雪' |
    '高波' |
    '高潮' |
    '落雷' |
    '突風' |
    '降ひょう' |
    '低温' |
    '高温' |
    'なだれ' |
    '黄砂' |
    '霜' |
    '強い寒気' |
    '強い冬型' |
    '発達する低気圧' |
    '台風' |
    '発達する熱低' |
    '元台風の低気圧' |
    '大潮' |
    '高い潮位' |
    '副振動' |
    '異常潮位';

  export interface InformationTagArea extends Components.CodeName {
    codeType: '全国・地方予報区等' | '気象情報／府県予報区・細分区域等';
  }

  export interface InformationTag {
    tagNames: InformationTagNames[];
    typhoonNumbers?: string[];
    tcNumbers?: string[];
    areas: InformationTagArea[];
  }

  export interface PublicBody {
    informationTags: [InformationTag];
    weatherSummary?: WeatherSummary;
    observation?: Observation;
    forecast?: Forecast;
    disasterPreventionInfo?: DisasterPreventionInfo;
    additionalInfo?: AdditionalInfo;
  }

  export interface Public extends TelegramJSONMain {
    _schema: Schema;
    type: '府県気象防災速報' | '全般気象解説情報' | '地方気象解説情報' | '府県気象解説情報' | '府県気象防災速報（潮位）' | '全般気象解説情報（潮位）' | '地方気象解説情報（潮位）' | '府県気象解説情報（潮位）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: string;
    serialNo: string;
    infoKind: '気象解説情報';
    headline: string;
    body: PublicBody;
  }

  export type Main = Public;
}

/**
 *
 * JSchema 出力用にAliasを作成しなければならないもの。
 * - PrecipitationsBasePart
 * - SnowfallDepthsBasePart
 * - SnowDepthsBasePart
 * - WindsBasePart
 * - WaveHeightsBasePart
 * - TidalLevelsBasePart
 * - VisibilitiesBasePart
 * - HumiditiesBasePart
 * - TemperaturesBasePart
 * - EventsBasePart
 *
 * - SnowfallDepthTimeRef
 * - SnowDepthTimeRef
 * - EventTimeRef
 *
 */
