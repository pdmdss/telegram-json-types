import { TelegramJSONMain } from '../../main';
import { Components, Util } from '../../component';

export namespace WeatherWarning {
  export interface Schema {
    type: 'weather-warning';
    version: '1.1.0';
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
    type: RiskTypes;
    code: '50' | '30' | '20' | '01' | '51' | '41' | '31' | '22' | '21' | '11' | '00';
    name: '特別警報級' | '警報級' | '注意報級' | '注意報級未満' | '警戒レベル５相当' | '警戒レベル４相当' | '警戒レベル３相当' | '警戒レベル２相当' | '警戒レベル２' | '警戒レベル２未満' | '値なし';
  }

  export interface PeakTime {
    date: string;
    term: string;
  }

  export interface SignificancyBase {
    significancy: Significancy;
    peakTime?: PeakTime;
    attentions?: string[];
    additions?: string[];
  }

  export type SignificancyLocal = Util.Local<SignificancyBase>;
  export type SignificancyPart = Util.Part<SignificancyBase, SignificancyLocal>;

  export interface Criterion extends Components.CodeName {
  }

  export interface CriteriaPeriodBase {
    sentence: string;
    criterion: Criterion;
    time: string;
    duration?: string;
  }

  export type CriteriaPeriodLocal = Util.Local<CriteriaPeriodBase>;
  export type CriteriaPeriodPart = Util.Part<CriteriaPeriodBase, CriteriaPeriodLocal>;

  // 風向
  export type Direction = Util.ValueElement<'風向', '８方位漢字', '風雪'>;

  export interface WindDirectionBase {
    direction: Direction;
  }

  export type WindDirectionLocal = Util.Local<WindDirectionBase>;
  export type WindDirectionPart = Util.Part<WindDirectionBase, WindDirectionLocal>;

  // 風速
  export type Speed = Util.ValueElement<'最大風速', 'm/s', '風雪'>;

  export interface WindSpeedBase {
    speed: Speed;
  }

  export type WindSpeedLocal = Util.Local<WindSpeedBase>;
  export type WindSpeedPart = Util.Part<WindSpeedBase, WindSpeedLocal>;

  // 濃霧
  export interface Visibility {
    type: '視程';
    uint: 'm';
    value: string;
    condition: '以下';
  }

  export interface VisibilityBase {
    visibility: Visibility;
  }

  export type VisibilityLocal = Util.Local<VisibilityBase>;
  export type VisibilityPart = Util.Part<VisibilityBase, VisibilityLocal>;

  // 波
  export type WaveHeightTypes = '波高' | 'うちあげ高水位' | '最高うちあげ高水位';

  export type WaveHeight<Type extends WaveHeightTypes> = Util.ValueElement<Type, 'm'>;

  interface WaveHeightBase<Type extends WaveHeightTypes> {
    waveHeight: WaveHeight<Type>;
    time?: string;
  }

  type WaveHeightLocal<Type extends WaveHeightTypes> = Util.Local<WaveHeightBase<Type>>;
  type WaveHeightPart<Type extends WaveHeightTypes> = Util.Part<WaveHeightBase<Type>, WaveHeightLocal<Type>>;


  // 潮位
  export type TidalLevelTypes = '潮位' | '最高潮位';

  export type TidalLevel<Type extends TidalLevelTypes> = Util.ValueElement<Type, 'm'>;

  export interface TidalLevelBase<Type extends TidalLevelTypes> {
    tidalLevel: TidalLevel<Type>;
    time?: string;
  }

  export type TidalLevelLocal<Type extends TidalLevelTypes> = Util.Local<TidalLevelBase<Type>>;
  export type TidalLevelPart<Type extends TidalLevelTypes> = Util.Part<TidalLevelBase<Type>, TidalLevelLocal<Type>>;


  // イベント
  export interface Event {
    type: '高潮';
    eventName: '越流' | '越波' | '堤防決壊' | string;
    time?: string;
  }

  export interface EventBase {
    sentence: string;
    location: string;
    event: Event;
  }

  export type EventLocal = Util.Local<EventBase>;
  export type EventPart = Util.Part<EventBase, EventLocal>;

  // 雪
  export type SnowfallDepthTypes = '６時間最大降雪量' | '１２時間最大降雪量' | '２４時間最大降雪量';

  export interface SnowfallDepth<Type extends SnowfallDepthTypes = SnowfallDepthTypes> {
    type: Type;
    uint: 'cm';
    value: string;
  }

  export interface SnowfallDepthBase<Type extends SnowfallDepthTypes> {
    snowfallDepths: SnowfallDepth<Type>[];
  }

  export type SnowfallDepthLocal<Type extends SnowfallDepthTypes> = Util.Local<SnowfallDepthBase<Type>>;
  export type SnowfallDepthPart<Type extends SnowfallDepthTypes> = Util.Part<SnowfallDepthBase<Type>, SnowfallDepthLocal<Type>>;

  // 湿度
  export type HumidityTypes = '実効湿度' | '最小湿度';

  export type Humidity<Type extends HumidityTypes> = Util.ValueElement<Type, '%'>;

  export interface HumidityBase<Type extends HumidityTypes> {
    humidity: Humidity<Type>;
  }

  export type HumidityLocal<Type extends HumidityTypes> = Util.Local<HumidityBase<Type>>;
  export type HumidityPart<Type extends HumidityTypes> = Util.Part<HumidityBase<Type>, HumidityLocal<Type>>;


  export interface WarningPropertyRisk {
    type: RiskTypes;
    significancyPart: SignificancyPart;
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
    snowfallDepthPart: SnowfallDepthPart<SnowfallDepthTypes>;
  }

  export interface WarningPropertyDryAir {
    type: '乾燥';
    humidityParts: [HumidityPart<'実効湿度'>, HumidityPart<'最小湿度'>] | [HumidityPart<'実効湿度'> | HumidityPart<'最小湿度'>];
  }


  export interface LastKind extends Components.CodeName {
    condition?: '氾濫発生';
  }

  export type WarningProperty =
    WarningPropertyRisk |
    WarningPropertyWind |
    WarningPropertyVisibility |
    WarningPropertyWave |
    WarningPropertyExceedingStormSurgeStandards |
    WarningPropertyStormSurgePeak |
    WarningPropertyStormSurgeObservation |
    WarningPropertySnow |
    WarningPropertyDryAir;

  export type WarningPropertiesRain = [WarningPropertyRisk];
  export type WarningPropertiesLandslide = [WarningPropertyRisk];
  export type WarningPropertiesWind = [WarningPropertyRisk, WarningPropertyWind];
  export type WarningPropertiesSnow = [WarningPropertyRisk, WarningPropertySnow];
  export type WarningPropertiesWave = [WarningPropertyRisk, WarningPropertyWave];
  export type WarningPropertiesStormSurge = [WarningPropertyRisk, WarningPropertyExceedingStormSurgeStandards, WarningPropertyStormSurgePeak];
  export type WarningPropertiesThunder = [WarningPropertyRisk];
  export type WarningPropertiesSnowMelting = [WarningPropertyRisk];
  export type WarningPropertiesDenseFog = [WarningPropertyRisk, WarningPropertyVisibility];
  export type WarningPropertiesDryAir = [WarningPropertyRisk, WarningPropertyDryAir];
  export type WarningPropertiesAvalanche = [WarningPropertyRisk];
  export type WarningPropertiesLowTemperature = [WarningPropertyRisk];
  export type WarningPropertiesFrost = [WarningPropertyRisk];
  export type WarningPropertiesIceAccretion = [WarningPropertyRisk];
  export type WarningPropertiesSnowAccretion = [WarningPropertyRisk];
  export type WarningPropertiesStormSurgeSection =
    [WarningPropertyRisk, WarningPropertyExceedingStormSurgeStandards, WarningPropertyStormSurgePeak] |
    [WarningPropertyRisk, WarningPropertyExceedingStormSurgeStandards, WarningPropertyStormSurgePeak, WarningPropertyStormSurgeObservation];

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

  export type WarningKind<P extends WarningProperty[] | never> =
    Components.CodeName & { dateTime?: string } & (
    {
      status: '発表' | '継続' | '特別警報から警報' | '特別警報から注意報' | '警報から注意報' | '特別警報から危険警報' | '危険警報から警報' | '危険警報から注意報';
      lastKind?: LastKind;
      additions?: string[];
      properties: P;
      condition?: '氾濫発生';
    } |
    {
      status: '解除';
      lastKind: LastKind;
      additions?: never;
      properties?: never;
      condition?: never;
    }
    );

  export type WarningAreaKind = Omit<WarningKindBase<[]>, 'properties'>;

  export type WarningArea<K extends WarningAreaKind> =
    Components.CodeName & (
    {
      kinds: K[];
      fullStatus: '一部' | '全域';
      editingMark: boolean;
      changeStatus: '警報・注意報種別に変化有' | '警報・注意報種別に変化無、量的予想事項等に変化有' | '変化無';
      condition?: never;
    } |
    {
      kinds: [],
      fullStatus?: never;
      editingMark?: never;
      changeStatus?: never;
      condition: '発表警報・注意報はなし';
    }
    );


  export type WarningCity<K extends WarningKindBase<any[]>[]> =
    Components.CodeName & { dateTime?: string; } &
    ({
      kinds: K;
      changeStatus: '警報・注意報種別に変化有' | '警報・注意報種別に変化無、量的予想事項等に変化有' | '変化無';
      condition?: never;
    } |
      {
        kinds: [];
        changeStatus?: never;
        condition: '発表警報・注意報はなし';
      });

  export type WarningCityKindRain = WarningKindBase<WarningPropertiesRain>;
  export type WarningCityKindLandslide = WarningKindBase<WarningPropertiesLandslide>;
  export type WarningCityKindWind = WarningKindBase<WarningPropertiesWind>;
  export type WarningCityKindSnow = WarningKindBase<WarningPropertiesSnow>;
  export type WarningCityKindWave = WarningKindBase<WarningPropertiesWave>;
  export type WarningCityKindStormSurge = WarningKindBase<WarningPropertiesStormSurge>;
  export type WarningCityKindThunder = WarningKindBase<WarningPropertiesThunder>;
  export type WarningCityKindSnowMelting = WarningKindBase<WarningPropertiesSnowMelting>;
  export type WarningCityKindDenseFog = WarningKindBase<WarningPropertiesDenseFog>;
  export type WarningCityKindDryAir = WarningKindBase<WarningPropertiesDryAir>;
  export type WarningCityKindAvalanche = WarningKindBase<WarningPropertiesAvalanche>;
  export type WarningCityKindLowTemperature = WarningKindBase<WarningPropertiesLowTemperature>;
  export type WarningCityKindFrost = WarningKindBase<WarningPropertiesFrost>;
  export type WarningCityKindIceAccretion = WarningKindBase<WarningPropertiesIceAccretion>;
  export type WarningCityKindSnowAccretion = WarningKindBase<WarningPropertiesSnowAccretion>;

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

  export type WarningStormSurgeSectionKind = WarningKindBase<WarningPropertiesStormSurgeSection>;

  export interface WarningStormSurgeSectionSubCity {
    names: string[];
  }

  export type WarningStormSurgeSection =
    { code: string; codeType: '高潮予報区間'; name: string; subCity: WarningStormSurgeSectionSubCity; location: true; dateTime?: string; } &
    ({
      kinds: [WarningStormSurgeSectionKind];
      changeStatus: '警報・注意報種別に変化有' | '警報・注意報種別に変化無、量的予想事項等に変化有' | '変化無';
      condition?: never;
    });

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


  export interface PublicBodyWarningBase<CityKind extends WarningKindBase<any[]>[] = WarningCityKind[]> {
    prefectures: WarningArea<WarningAreaKind>[];
    regions: WarningArea<WarningAreaKind>[];
    areas: WarningArea<WarningAreaKind>[];
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
  export type PublicBodyVPWW58 = Util.Prohibit<PublicBodyWarningBase<WarningCityKindWind[]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWW59 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindWave]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWW60 = Util.Prohibit<PublicBodyWarningBase<[WarningCityKindSnow]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWW61 = Util.Prohibit<PublicBodyWarningBase<WarningCityKindAdvisory[]>, PublicBodyWarningOmitKey>;
  export type PublicBodyVPWS50 = Util.Prohibit<PublicBodyWarningBase, 'offices' | 'references' | 'comment'>;
  export type PublicBodyWarning =
    PublicBodyVPWW55 | PublicBodyVPWW56 | PublicBodyVPWW57 | PublicBodyVPWW58 | PublicBodyVPWW59 | PublicBodyVPWW60 | PublicBodyVPWW61 | PublicBodyVPWS50;


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


  export type Main = PublicWarning;
}
