export interface Location {
  name: string;
  lat: string;
  lon: string;
}

export interface WeatherData {
  name: string;
  temp: string;
  feelsLikeTemp: string;
  humidity: string;
  weatherDescription: string;
  icon: string;
  weatherMain: string;
  windSpeed: string;
  windGust: string;
}
