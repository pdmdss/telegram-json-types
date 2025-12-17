import { TelegramJSONMain } from '../../main';
import { Components, Util } from '../../component';

export namespace WeatherWarning {
  export interface Schema {
    type: 'weather-warning';
    version: '1.1.0';
  }

  export type KindCodeNameKeyRain = '33:レベル５大雨特別警報' | '43:レベル４大雨危険警報' | '03:レベル３大雨警報' | '10:レベル２大雨注意報';
  export type KindCodeNameKeyLandslide =
    '39:レベル５土砂災害特別警報'
    | '49:レベル４土砂災害危険警報'
    | '09:レベル３土砂災害警報'
    | '29:レベル２土砂災害注意報';
  export type KindCodeNameKeyWind = '35:暴風特別警報' | '32:暴風雪特別警報' | '05:暴風警報' | '02:暴風雪警報' | '15:強風注意報' | '13:風雪注意報';
  export type KindCodeNameKeySnow = '36:大雪特別警報' | '06:大雪警報' | '12:大雪注意報';
  export type KindCodeNameKeyWave = '37:波浪特別警報' | '07:波浪警報' | '16:波浪注意報';
  export type KindCodeNameKeyStormSurge = '38:レベル５高潮特別警報' | '48:レベル４高潮危険警報' | '08:レベル３高潮警報' | '19:レベル２高潮注意報';
  export type KindCodeNameKeyThunder = '14:雷注意報';
  export type KindCodeNameKeySnowMelting = '17:融雪注意報';
  export type KindCodeNameKeyDenseFog = '20:濃霧注意報';
  export type KindCodeNameKeyDryAir = '21:乾燥注意報';
  export type KindCodeNameKeyAvalanche = '22:なだれ注意報';
  export type KindCodeNameKeyLowTemperature = '23:低温注意報';
  export type KindCodeNameKeyFrost = '24:霜注意報';
  export type KindCodeNameKeyIceAccretion = '25:着氷注意報';
  export type KindCodeNameKeySnowAccretion = '26:着雪注意報';

  export type KindCodeNameRain = Util.CodeNameComb<KindCodeNameKeyRain>;
  export type KindCodeNameLandslide = Util.CodeNameComb<KindCodeNameKeyLandslide>;
  export type KindCodeNameWind = Util.CodeNameComb<KindCodeNameKeyWind>;
  export type KindCodeNameSnow = Util.CodeNameComb<KindCodeNameKeySnow>;
  export type KindCodeNameWave = Util.CodeNameComb<KindCodeNameKeyWave>;
  export type KindCodeNameStormSurge = Util.CodeNameComb<KindCodeNameKeyStormSurge>;
  export type KindCodeNameThunder = Util.CodeNameComb<KindCodeNameKeyThunder>;
  export type KindCodeNameSnowMelting = Util.CodeNameComb<KindCodeNameKeySnowMelting>;
  export type KindCodeNameDenseFog = Util.CodeNameComb<KindCodeNameKeyDenseFog>;
  export type KindCodeNameDryAir = Util.CodeNameComb<KindCodeNameKeyDryAir>;
  export type KindCodeNameAvalanche = Util.CodeNameComb<KindCodeNameKeyAvalanche>;
  export type KindCodeNameLowTemperature = Util.CodeNameComb<KindCodeNameKeyLowTemperature>;
  export type KindCodeNameFrost = Util.CodeNameComb<KindCodeNameKeyFrost>;
  export type KindCodeNameIceAccretion = Util.CodeNameComb<KindCodeNameKeyIceAccretion>;
  export type KindCodeNameSnowAccretion = Util.CodeNameComb<KindCodeNameKeySnowAccretion>;
  export type KindCodeName =
    KindCodeNameRain |
    KindCodeNameLandslide |
    KindCodeNameWind |
    KindCodeNameSnow |
    KindCodeNameWave |
    KindCodeNameStormSurge |
    KindCodeNameThunder |
    KindCodeNameSnowMelting |
    KindCodeNameDenseFog |
    KindCodeNameDryAir |
    KindCodeNameAvalanche |
    KindCodeNameLowTemperature |
    KindCodeNameFrost |
    KindCodeNameIceAccretion |
    KindCodeNameSnowAccretion;

  export interface PeakTime {
    date: string;
    term: string;
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

  export type RiskCodeNameKey =
    '50:特別警報級' |
    '30:警報級' |
    '20:注意報級' |
    '01:注意報級未満' |
    '51:警戒レベル５相当' |
    '41:警戒レベル４相当' |
    '31:警戒レベル３相当' |
    '22:警戒レベル２相当' |
    '21:警戒レベル２' |
    '11:警戒レベル２未満' |
    '00:値なし';


  // 危険度
  export type Significancy<Type extends RiskTypes> = Util.Prettify<{ type: Type; } & Util.CodeNameComb<RiskCodeNameKey>>;

  export type SignificancyBase<Type extends RiskTypes> = Util.Base<{
    significancy: Significancy<Type>;
    peakTime?: PeakTime;
    attentions?: string[];
    additions?: string[];

  }>;
  export type SignificancyBaseLocalOnly<Type extends RiskTypes> = Util.BaseLocalOnly<SignificancyBase<Type>>;
  export type SignificancyLocal<Type extends RiskTypes> = Util.Local<SignificancyBase<Type>>;
  export type SignificancyPart<Type extends RiskTypes> = Util.Part<SignificancyBase<Type>>;

  export type SignificancesBase<Type extends RiskTypes> = Util.Base<{
    significances: Util.TimeRefID<Significancy<Type>>[];
  }>;
  export type SignificancesLocal<Type extends RiskTypes> = Util.Local<SignificancesBase<Type>>;
  export type SignificancesPart<Type extends RiskTypes> = Util.Part<SignificancesBase<Type>>;

  export interface Criterion extends Components.CodeName {
  }

  export type CriteriaPeriodBase = Util.Base<{
    sentence: string;
    criterion: Criterion;
    time: string;
    duration?: string;
  }>;
  export type CriteriaPeriodBaseLocalOnly = Util.BaseLocalOnly<CriteriaPeriodBase>;
  export type CriteriaPeriodLocal = Util.Local<CriteriaPeriodBase>;
  export type CriteriaPeriodPart = Util.Part<CriteriaPeriodBase>;

  // 風向
  export type Direction = Util.ValueOrNone<{ type: '風向'; uint: '８方位漢字'; condition?: '風雪' }>;

  export type WindDirectionBase = Util.Base<{
    direction: Direction;
  }>;
  export type WindDirectionLocal = Util.Local<WindDirectionBase>;
  export type WindDirectionPart = Util.Part<WindDirectionBase>;

  export type WindDirectionsBase = Util.Base<{
    directions: Util.TimeRefID<Direction>[];
  }>;
  export type WindDirectionsLocal = Util.Local<WindDirectionsBase>;
  export type WindDirectionsPart = Util.Part<WindDirectionsBase>;

  // 風速
  export type Speed = Util.ValueOrNone<{ type: '最大風速'; uint: 'm/s'; condition?: '風雪' }>;

  export type WindSpeedBase = Util.Base<{
    speed: Speed;
  }>;
  export type WindSpeedLocal = Util.Local<WindSpeedBase>;
  export type WindSpeedPart = Util.Part<WindSpeedBase>;

  export type WindSpeedsBase = Util.Base<{
    speeds: Util.TimeRefID<Speed>[];
  }>;
  export type WindSpeedsLocal = Util.Local<WindSpeedsBase>;
  export type WindSpeedsPart = Util.Part<WindSpeedsBase>;

  // 濃霧
  export interface Visibility {
    type: '視程';
    uint: 'm';
    value: string;
    condition: '以下';
  }

  export type VisibilityBase = Util.Base<{
    visibility: Visibility;
  }>;
  export type VisibilityLocal = Util.Local<VisibilityBase>;
  export type VisibilityPart = Util.Part<VisibilityBase>;

  // 波
  type WaveHeightTypes = '波高' | 'うちあげ高水位' | '最高うちあげ高水位';

  export type WaveHeight<Type extends WaveHeightTypes, C extends string = never> = Util.ValueOrNone<{ type: Type; uint: 'm'; condition?: C; }>;

  export type WaveHeightBase<Type extends WaveHeightTypes> = Util.Base<{
    waveHeight: WaveHeight<Type>;
    time?: string;
  }>;
  export type WaveHeightLocal<Type extends WaveHeightTypes> = Util.Local<WaveHeightBase<Type>>;
  export type WaveHeightPart<Type extends WaveHeightTypes> = Util.Part<WaveHeightBase<Type>>;

  export type WaveHeightsBase<Type extends WaveHeightTypes> = Util.Base<{
    waveHeights: Util.TimeRefID<WaveHeight<Type, '以下' | '未満'>>[];
  }>;
  export type WaveHeightsLocal<Type extends WaveHeightTypes> = Util.Local<WaveHeightsBase<Type>>;
  export type WaveHeightsPart<Type extends WaveHeightTypes> = Util.Part<WaveHeightsBase<Type>>;

  // 潮位
  type TidalLevelTypes = '潮位' | '最高潮位';

  export type TidalLevel<Type extends TidalLevelTypes, C extends string = never> = Util.ValueOrNone<{ type: Type; uint: 'm'; condition?: C; }>;

  export type TidalLevelBase<Type extends TidalLevelTypes> = Util.Base<{
    tidalLevel: TidalLevel<Type>;
    time?: string;
  }>;
  export type TidalLevelLocal<Type extends TidalLevelTypes> = Util.Local<TidalLevelBase<Type>>;
  export type TidalLevelPart<Type extends TidalLevelTypes> = Util.Part<TidalLevelBase<Type>>;

  export type TidalLevelsBase<Type extends TidalLevelTypes> = Util.Base<{
    tidalLevels: Util.TimeRefID<TidalLevel<Type>>[];
  }>;
  export type TidalLevelsLocal<Type extends TidalLevelTypes> = Util.Local<TidalLevelsBase<Type>>;
  export type TidalLevelsPart<Type extends TidalLevelTypes> = Util.Part<TidalLevelsBase<Type>>;

  // イベント
  export interface Event {
    type: '高潮';
    eventName: '越流' | '越波' | '堤防決壊' | string;
    time?: string;
  }

  export type EventBase = Util.Base<{
    sentence: string;
    location: string;
    event: Event;
  }>;
  export type EventBaseLocalOnly = Util.BaseLocalOnly<EventBase>;
  export type EventLocal = Util.Local<EventBase>;
  export type EventPart = Util.Part<EventBase>;

  // 雪
  export type SnowfallDepthType = '６時間最大降雪量' | '１２時間最大降雪量' | '２４時間最大降雪量' | string;

  export interface SnowfallDepth<Type extends SnowfallDepthType, C extends string = never> {
    type: Type;
    uint: 'cm';
    value: string;
    condition?: C;
  }

  export type SnowfallDepthBase<Type extends SnowfallDepthType> = Util.Base<{
    snowfallDepths: SnowfallDepth<Type>[];
  }>;
  export type SnowfallDepthLocal<Type extends SnowfallDepthType> = Util.Local<SnowfallDepthBase<Type>>;
  export type SnowfallDepthPart<Type extends SnowfallDepthType> = Util.Part<SnowfallDepthBase<Type>>;

  export type SnowfallDepthsBase<Type extends SnowfallDepthType> = Util.Base<{
    snowfallDepths: Util.TimeRefID<SnowfallDepth<Type, '以下' | '未満'>>[];
  }>;
  export type SnowfallDepthsLocal<Type extends SnowfallDepthType> = Util.Local<SnowfallDepthsBase<Type>>;
  export type SnowfallDepthsPart<Type extends SnowfallDepthType> = Util.Part<SnowfallDepthBase<Type>>;

  // 湿度
  type HumidityTypes = '実効湿度' | '最小湿度';

  export type Humidity<Type extends HumidityTypes> = Util.ValueOrNone<{ type: Type; uint: '%'; }>;

  export type HumidityBase<Type extends HumidityTypes> = Util.Base<{
    humidity: Humidity<Type>;
  }>;
  export type HumidityLocal<Type extends HumidityTypes> = Util.Local<HumidityBase<Type>>;
  export type HumidityPart<Type extends HumidityTypes> = Util.Part<HumidityBase<Type>>;

  export type HumiditiesBase<Type extends HumidityTypes> = Util.Base<{
    humidities: Util.TimeRefID<Humidity<Type>>[];
  }>;
  export type HumiditiesLocal<Type extends HumidityTypes> = Util.Local<HumiditiesBase<Type>>;
  export type HumiditiesPart<Type extends HumidityTypes> = Util.Part<HumiditiesBase<Type>>;

  // 雨
  type PrecipitationTypes = '１時間最大雨量' | '２４時間最大雨量';

  export type Precipitation<Type extends PrecipitationTypes, C extends string = never> = Util.ValueOrNone<{ type: Type; uint: '㎜'; condition?: C; }>;

  export type PrecipitationsBase<Type extends PrecipitationTypes> = Util.Base<{
    precipitations: Util.TimeRefID<Precipitation<Type, '以下' | '未満'>>[];
  }>;
  export type PrecipitationsLocal<Type extends PrecipitationTypes> = Util.Local<PrecipitationsBase<Type>>;
  export type PrecipitationsPart<Type extends PrecipitationTypes> = Util.Part<PrecipitationsBase<Type>>;


  export interface WarningPropertyRisk<Type extends RiskTypes> {
    type: Type;
    significancyPart: SignificancyPart<Type>;
    criteriaPeriod?: CriteriaPeriodPart;
  }

  export interface WarningPropertyWind {
    type: '風';
    windDirectionPart: WindDirectionPart;
    windSpeedPart: WindSpeedPart;
  }

  export interface WarningPropertyVisibility {
    type: '濃霧';
    visibilityPart: VisibilityPart;
  }

  export interface WarningPropertyWave {
    type: '波';
    waveHeightPart: WaveHeightPart<'波高'>;
  }

  export interface WarningPropertyExceedingStormSurgeStandards {
    type: '高潮基準超過';
    waveHeightPart?: WaveHeightPart<'うちあげ高水位'>;
    tidalLevelPart: TidalLevelPart<'潮位'>;
  }

  export interface WarningPropertyStormSurgePeak {
    type: '高潮ピーク';
    waveHeightPart?: WaveHeightPart<'うちあげ高水位'>;
    tidalLevelPart: TidalLevelPart<'潮位'>;
  }

  export interface WarningPropertyStormSurgeObservation {
    type: '観測';
    tidalLevelPart?: TidalLevelPart<'最高潮位'>;
    eventPart?: EventPart;
  }

  export interface WarningPropertySnow {
    type: '雪';
    snowfallDepthPart: SnowfallDepthPart<SnowfallDepthType>;
  }

  export interface WarningPropertyDryAir {
    type: '乾燥';
    humidityParts: [HumidityPart<'実効湿度'>, HumidityPart<'最小湿度'>] | [HumidityPart<'実効湿度'> | HumidityPart<'最小湿度'>];
  }


  export type LastKind<CNC extends Util.CodeNameComb<any>> = CNC;

  export type WarningProperty =
    WarningPropertyRisk<RiskTypes> |
    WarningPropertyWind |
    WarningPropertyVisibility |
    WarningPropertyWave |
    WarningPropertyExceedingStormSurgeStandards |
    WarningPropertyStormSurgePeak |
    WarningPropertyStormSurgeObservation |
    WarningPropertySnow |
    WarningPropertyDryAir;

  export type WarningPropertiesRain = [WarningPropertyRisk<'大雨浸水危険度'>];
  export type WarningPropertiesLandslide = [WarningPropertyRisk<'土砂災害危険度'>];
  export type WarningPropertiesWind = [WarningPropertyRisk<'風危険度'>, WarningPropertyWind];
  export type WarningPropertiesSnow = [WarningPropertyRisk<'雪危険度'>, WarningPropertySnow];
  export type WarningPropertiesWave = [WarningPropertyRisk<'波危険度'>, WarningPropertyWave];
  export type WarningPropertiesStormSurge = [WarningPropertyRisk<'高潮危険度'>, WarningPropertyExceedingStormSurgeStandards, WarningPropertyStormSurgePeak];
  export type WarningPropertiesThunder = [WarningPropertyRisk<'雷危険度'>];
  export type WarningPropertiesSnowMelting = [WarningPropertyRisk<'融雪危険度'>];
  export type WarningPropertiesDenseFog = [WarningPropertyRisk<'濃霧危険度'>, WarningPropertyVisibility];
  export type WarningPropertiesDryAir = [WarningPropertyRisk<'乾燥危険度'>, WarningPropertyDryAir];
  export type WarningPropertiesAvalanche = [WarningPropertyRisk<'なだれ危険度'>];
  export type WarningPropertiesLowTemperature = [WarningPropertyRisk<'低温危険度'>];
  export type WarningPropertiesFrost = [WarningPropertyRisk<'霜危険度'>];
  export type WarningPropertiesIceAccretion = [WarningPropertyRisk<'着氷危険度'>];
  export type WarningPropertiesSnowAccretion = [WarningPropertyRisk<'着雪危険度'>];
  export type WarningPropertiesStormSurgeSection =
    [WarningPropertyRisk<'高潮危険度'>, WarningPropertyExceedingStormSurgeStandards, WarningPropertyStormSurgePeak] |
    [WarningPropertyRisk<'高潮危険度'>, WarningPropertyExceedingStormSurgeStandards, WarningPropertyStormSurgePeak, WarningPropertyStormSurgeObservation];

  export type WarningProperties =
    WarningPropertiesRain |
    WarningPropertiesLandslide |
    WarningPropertiesWind |
    WarningPropertiesSnow |
    WarningPropertiesWave |
    WarningPropertiesStormSurge |
    WarningPropertiesThunder |
    WarningPropertiesSnowMelting |
    WarningPropertiesDenseFog |
    WarningPropertiesDryAir |
    WarningPropertiesAvalanche |
    WarningPropertiesLowTemperature |
    WarningPropertiesFrost |
    WarningPropertiesIceAccretion |
    WarningPropertiesSnowAccretion;

  export type WarningKind<CNC extends Util.CodeNameComb<any>, P extends WarningProperty[] | never, D extends string> = Util.ExclusiveUnion<
    {
      status: '発表' | '継続' | '特別警報から警報' | '特別警報から注意報' | '警報から注意報' | '特別警報から危険警報' | '危険警報から警報' | '危険警報から注意報';
      lastKind?: LastKind<CNC>;
      additions?: string[];
      properties: P;
      condition?: D;
    },
    { lastKind: LastKind<CNC>; status: '解除'; },
    CNC,
    { dateTime?: string }
  >;

  export type WarningAreaKind<CNC extends Util.CodeNameComb<any>> =
    CNC & Util.Prohibit<WarningKind<CNC, never, CNC extends KindCodeNameStormSurge ? '氾濫発生' : never>, 'properties'>;

  export type WarningArea<K extends WarningAreaKind<any>> = Util.ExclusiveUnion<
    {
      kinds: K[];
      fullStatus: '一部' | '全域';
      editingMark: boolean;
      changeStatus: '警報・注意報種別に変化有' | '警報・注意報種別に変化無、量的予想事項等に変化有' | '変化無';
    },
    { kinds: [], condition: '発表警報・注意報はなし'; },
    Components.CodeName
  >;


  export type WarningCity<K extends WarningKind<any, any[], any>[]> =
    Util.ExclusiveUnion<
      { kinds: K; changeStatus: '警報・注意報種別に変化有' | '警報・注意報種別に変化無、量的予想事項等に変化有' | '変化無'; },
      { kinds: []; condition: '発表警報・注意報はなし'; },
      Components.CodeName,
      { dateTime?: string; }
    >;

  export type WarningCityKindRain = WarningKind<KindCodeNameRain, WarningPropertiesRain, never>;
  export type WarningCityKindLandslide = WarningKind<KindCodeNameLandslide, WarningPropertiesLandslide, never>;
  export type WarningCityKindWind = WarningKind<KindCodeNameWind, WarningPropertiesWind, never>;
  export type WarningCityKindSnow = WarningKind<KindCodeNameSnow, WarningPropertiesSnow, never>;
  export type WarningCityKindWave = WarningKind<KindCodeNameWave, WarningPropertiesWave, never>;
  export type WarningCityKindStormSurge = WarningKind<KindCodeNameStormSurge, WarningPropertiesStormSurge, '氾濫発生'>;
  export type WarningCityKindThunder = WarningKind<KindCodeNameThunder, WarningPropertiesThunder, never>;
  export type WarningCityKindSnowMelting = WarningKind<KindCodeNameSnowMelting, WarningPropertiesSnowMelting, never>;
  export type WarningCityKindDenseFog = WarningKind<KindCodeNameDenseFog, WarningPropertiesDenseFog, never>;
  export type WarningCityKindDryAir = WarningKind<KindCodeNameDryAir, WarningPropertiesDryAir, never>;
  export type WarningCityKindAvalanche = WarningKind<KindCodeNameAvalanche, WarningPropertiesAvalanche, never>;
  export type WarningCityKindLowTemperature = WarningKind<KindCodeNameLowTemperature, WarningPropertiesLowTemperature, never>;
  export type WarningCityKindFrost = WarningKind<KindCodeNameFrost, WarningPropertiesFrost, never>;
  export type WarningCityKindIceAccretion = WarningKind<KindCodeNameIceAccretion, WarningPropertiesIceAccretion, never>;
  export type WarningCityKindSnowAccretion = WarningKind<KindCodeNameSnowAccretion, WarningPropertiesSnowAccretion, never>;

  export type WarningCityKindAdvisory =
    WarningCityKindThunder |
    WarningCityKindSnowMelting |
    WarningCityKindDenseFog |
    WarningCityKindDryAir |
    WarningCityKindAvalanche |
    WarningCityKindLowTemperature |
    WarningCityKindFrost |
    WarningCityKindIceAccretion |
    WarningCityKindSnowAccretion;

  export type WarningCityKind =
    WarningCityKindRain |
    WarningCityKindLandslide |
    WarningCityKindWind |
    WarningCityKindSnow |
    WarningCityKindWave |
    WarningCityKindStormSurge |
    WarningCityKindAdvisory;

  export type WarningStormSurgeSectionKind = WarningKind<KindCodeNameStormSurge, WarningPropertiesStormSurgeSection, '氾濫発生'>;

  export interface WarningStormSurgeSectionSubCity {
    names: string[];
  }

  export type WarningStormSurgeSection = Util.ExclusiveUnion<
    { kinds: [WarningStormSurgeSectionKind]; changeStatus: '警報・注意報種別に変化有' | '警報・注意報種別に変化無、量的予想事項等に変化有' | '変化無'; },
    { kinds: [], condition: '発表警報・注意報はなし' },
    { code: string; codeType: '高潮予報区間'; name: string; subCity: WarningStormSurgeSectionSubCity; location: true; dateTime?: string; }
  >;

  export interface Office {
    type: '都道府県' | '補足情報担当' | '水位関係' | '気象関係' | string;
    name: string;
  }

  export interface TidalWarningReferenceSubCity {
    names: string[];
    codes: string[];
  }

  export interface CriteriaWaterLevel {
    type: '堤防天端高' | '設計高潮位' | string;
    uint: 'm';
    value: string | null;
    condition: '有効' | '値なし';
  }

  export interface Criteria {
    waterLevels: CriteriaWaterLevel[];
  }

  export interface HydrometricStation {
    name: string;
    location: string;
    chargeSections?: string[];
    criteria: Criteria;
  }

  export interface TidalWarningReference extends Components.CodeName {
    codeType: '高潮予報区間';
    subCity: TidalWarningReferenceSubCity;
    location: string;
    chargeSections: string[];
    stations: HydrometricStation[];
  }

  export interface CommentText {
    type: 'レベル５土砂災害危険警報の補足情報' | 'レベル４土砂災害危険警報の補足情報' | 'レベル３土砂災害危険警報の補足情報' | 'レベル２土砂災害危険警報の補足情報';
    text: string;
  }

  export interface Comment {
    texts: CommentText[];
  }

  type CNCExp<K extends WarningKind<Util.CodeNameComb<any>, any, any>> = K extends { lastKind?: infer CNC } ? CNC : never;

  export interface PublicBodyWarningBase<CityKind extends WarningKind<Util.CodeNameComb<any>, any[], any>[] = WarningCityKind[], CNC extends Util.CodeNameComb<any> = CNCExp<CityKind[number]>> {
    prefectures: WarningArea<WarningAreaKind<CNC>>[];
    regions: WarningArea<WarningAreaKind<CNC>>[];
    areas: WarningArea<WarningAreaKind<CNC>>[];
    cities: WarningCity<CityKind>[];
    stormSurgeSections?: WarningStormSurgeSection[];
    offices?: Office[];
    references?: TidalWarningReference[];
    comment?: Comment;
  }

  type PublicBodyWarningOmitKey = 'stormSurgeSections' | 'offices' | 'references' | 'comment';
  export type PublicBodyVPWW55 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindRain]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWW56 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindLandslide]>, 'stormSurgeSections' | 'references'>;
  export type PublicBodyVPWW57 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindStormSurge]>, 'comment'>;
  export type PublicBodyVPWW58 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindWind]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWW59 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindWave]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWW60 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindSnow]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWW61 = Util.Prohibit<PublicBodyWarningBase<WarningCityKindAdvisory[]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWS50 = Util.Prohibit<PublicBodyWarningBase, 'offices' | 'references' | 'comment'>;
  export type PublicBodyWarning =
    PublicBodyVPWW55 | PublicBodyVPWW56 | PublicBodyVPWW57 | PublicBodyVPWW58 | PublicBodyVPWW59 | PublicBodyVPWW60 | PublicBodyVPWW61 | PublicBodyVPWS50;


  export interface TimeSeriesPropertyRisk<Type extends RiskTypes> {
    type: Type;
    significancesPart: SignificancesPart<Type>;
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

  export interface TimeSeriesPropertyDryAir {
    type: '乾燥';
    humidityParts: [HumiditiesPart<'実効湿度'>, HumiditiesPart<'最小湿度'>] | [HumiditiesPart<'実効湿度'> | HumiditiesPart<'最小湿度'>];
  }

  export type TimeSeriesProperty =
    TimeSeriesPropertyRisk<RiskTypes> |
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

  export type TimeSeriesPropertiesRainRisk = [TimeSeriesPropertyRisk<'大雨浸水危険度'>];
  export type TimeSeriesPropertiesPrecipitation<Type extends PrecipitationTypes> = [TimeSeriesPropertyPrecipitation<Type>];
  export type TimeSeriesPropertiesLandslideRisk = [TimeSeriesPropertyRisk<'土砂災害危険度'>];
  export type TimeSeriesPropertiesWindRisk = [TimeSeriesPropertyRisk<'風危険度'>];
  export type TimeSeriesPropertiesWind = [TimeSeriesPropertyWind];
  export type TimeSeriesPropertiesSnowRisk = [TimeSeriesPropertyRisk<'雪危険度'>];
  export type TimeSeriesPropertiesSnow<Type extends SnowfallDepthType> = [TimeSeriesPropertySnow<Type>];
  export type TimeSeriesPropertiesWaveRisk = [TimeSeriesPropertyRisk<'波危険度'>];
  export type TimeSeriesPropertiesWave = [TimeSeriesPropertyWave];
  export type TimeSeriesPropertiesStormSurgeRisk = [TimeSeriesPropertyRisk<'高潮危険度'>];
  export type TimeSeriesPropertiesStormSurge = [TimeSeriesPropertyStormSurge];
  export type TimeSeriesPropertiesThunderRisk = [TimeSeriesPropertyRisk<'雷危険度'>];
  export type TimeSeriesPropertiesSnowMeltingRisk = [TimeSeriesPropertyRisk<'融雪危険度'>];
  export type TimeSeriesPropertiesDenseFogRisk = [TimeSeriesPropertyRisk<'濃霧危険度'>];
  export type TimeSeriesPropertiesDryAirRisk = [TimeSeriesPropertyRisk<'乾燥危険度'>];
  export type TimeSeriesPropertiesDryAir = [TimeSeriesPropertyDryAir];
  export type TimeSeriesPropertiesAvalancheRisk = [TimeSeriesPropertyRisk<'なだれ危険度'>];
  export type TimeSeriesPropertiesLowTemperatureRisk = [TimeSeriesPropertyRisk<'低温危険度'>];
  export type TimeSeriesPropertiesFrostRisk = [TimeSeriesPropertyRisk<'霜危険度'>];
  export type TimeSeriesPropertiesIceAccretionRisk = [TimeSeriesPropertyRisk<'着氷危険度'>];
  export type TimeSeriesPropertiesSnowAccretionRisk = [TimeSeriesPropertyRisk<'着雪危険度'>];

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

  export type TimeSeriesCity1 = TimeSeries<[
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
  ]>;
  export type TimeSeriesCity2 = TimeSeries<[
    TimeSeriesKindPrecipitation<'２４時間最大雨量'>,
    TimeSeriesKindSnow<'２４時間最大降雪量'>
  ]>;
  export type TimeSeriesCity3 = TimeSeries<[
    TimeSeriesKindDryAirRisk,
    TimeSeriesKindDryAir,
    TimeSeriesKindAvalancheRisk,
    TimeSeriesKindLowTemperatureRisk,
    TimeSeriesKindFrostRisk
  ]>

  export interface TimeSeriesQuantitativeForecast {
    type: '量的予想時系列（市町村等）';
    timeSeries: [TimeSeriesCity1, TimeSeriesCity2, TimeSeriesCity3];
  }

  export interface PublicBodyTimeSeries {
    city: TimeSeriesQuantitativeForecast;
  }


  export interface PublicWarning extends TelegramJSONMain {
    _schema: Schema;
    type: '気象警報・注意報（Ｒ０６）（大雨）' | '気象警報・注意報（Ｒ０６）（土砂）' | '気象警報・注意報（Ｒ０６）（高潮）' | '気象警報・注意報（Ｒ０６）（暴風）' | '気象警報・注意報（Ｒ０６）（波浪）' | '気象警報・注意報（Ｒ０６）（大雪）' | '気象警報・注意報（Ｒ０６）（その他注意報）' | '気象警報・注意報（Ｒ０６）（集約通報）';
    title: string;
    infoType: '発表' | '訂正';
    targetDateTimeDubious?: never;
    targetDuration?: never;
    validDateTime?: never;
    eventId: null;
    serialNo: null;
    infoKind: '気象警報・注意報';
    body: PublicBodyWarning;
  }

  export interface PublicTimeSeries extends TelegramJSONMain {
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
    body: PublicBodyTimeSeries;
  }

  export type Main = PublicWarning | PublicTimeSeries;
}
