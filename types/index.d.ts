import * as EarthquakeInformation from './schema/earthquake-information';
import * as EarthquakeExplanation from './schema/earthquake-explanation';
import * as EarthquakeCounts from './schema/earthquake-counts';
import * as EarthquakeHypocenterUpdate from './schema/earthquake-hypocenter-update';
import * as EarthquakeNankai from './schema/earthquake-nankai';
import * as EewInformation from './schema/eew-information';
import * as TsunamiInformation from './schema/tsunami-information';
import * as VolcanoInformation from './schema/volcano-information';
import * as WeatherInformation from './schema/weather-information';
import * as WeatherImpactSociety from './schema/weather-impact-society';
import * as WeatherEarly from './schema/weather-early';
import * as WeatherWarning from './schema/weather-warning';
import * as WeatherTornado from './schema/weather-tornado';
import * as WeatherTyphoon from './schema/weather-typhoon';
import * as WeatherLandslide from './schema/weather-landslide';
import * as WeatherRiverFlood from './schema/weather-river-flood';
import * as ForecastPrefecture from './schema/forecast-prefecture';
import * as ForecastWarningPossibility from './schema/forecast-warning-possibility';
import * as ForecastSeason from './schema/forecast-season';
import * as Forecast2weekTemperature from './schema/forecast-2week-temperature';
import * as ForecastWeathermap from './schema/forecast-weathermap';

import { TelegramJSONMain } from './main';
import { Components } from './component';

type All =
  EarthquakeInformation.v1_0_0.Main |
  EarthquakeInformation.v1_1_0.Main |
  EarthquakeExplanation.v1_0_0.Main |
  EarthquakeCounts.v1_0_0.Main |
  EarthquakeHypocenterUpdate.v1_0_0.Main |
  EarthquakeNankai.v1_0_0.Main |
  EewInformation.v1_0_0.Main |
  TsunamiInformation.v1_0_0.Main |
  TsunamiInformation.v1_1_0.Main |
  VolcanoInformation.v1_0_0.Main |
  WeatherInformation.v1_0_0.Main |
  WeatherImpactSociety.v1_0_1.Main |
  WeatherEarly.v1_0_0.Main |
  WeatherWarning.v1_0_0.Main |
  WeatherTornado.v1_0_0.Main |
  WeatherTyphoon.v1_0_0.Main |
  WeatherLandslide.v1_0_0.Main |
  WeatherRiverFlood.v1_0_0.Main |
  ForecastPrefecture.v1_0_0.Main |
  ForecastWarningPossibility.v1_0_0.Main |
  ForecastSeason.v1_0_0.Main |
  Forecast2weekTemperature.v1_0_0.Main |
  ForecastWeathermap.v1_0_0.Main;

export {
  EarthquakeInformation,
  EarthquakeExplanation,
  EarthquakeCounts,
  EarthquakeHypocenterUpdate,
  EarthquakeNankai,
  EewInformation,
  TsunamiInformation,
  VolcanoInformation,
  WeatherInformation,
  WeatherImpactSociety,
  WeatherEarly,
  WeatherWarning,
  WeatherTornado,
  WeatherTyphoon,
  WeatherLandslide,
  WeatherRiverFlood,
  ForecastPrefecture,
  ForecastWarningPossibility,
  ForecastSeason,
  Forecast2weekTemperature,
  ForecastWeathermap,
  TelegramJSONMain,
  Components,
  All
};
