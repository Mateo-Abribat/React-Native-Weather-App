export type ToasterType = "failure" | "success" | undefined;
export type StatusType = "loading" | "connected" | undefined;

export interface GeocodeProps {
  lat: number;
  lon: number;
  name: string;
  state?: string;
  country: string;
  local_names: {
    ascii: string;
    feature_name: string;
    [languageCode: string]: string;
  };
}

export interface CityProps {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
}

export interface WeatherProps {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  rain?: number;
  snow?: number;
  pop: number;
  sunrise: number;
  sunset: number;
}
