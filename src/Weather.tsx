import { WeatherData } from "./types";

interface WeatherProps {
  weatherData: WeatherData | undefined;
}

const Weather = (props: WeatherProps) => {
  const currentTime = new Date().toLocaleTimeString();
  return (
    <div className="weather-container">
      {props.weatherData && (
        <>
          <div className="weather-header">
            <div>
              Current Weather of{" "}
              <strong>
                <em>{props.weatherData.name}</em>
              </strong>
            </div>
            <div>
              <strong>
                <em>{currentTime}</em>
              </strong>
            </div>
          </div>
          <div className="weather-content">
            <div className="weather-left">
              <img
                src={`https://openweathermap.org/img/wn/${props.weatherData.icon}@2x.png`}
              />
              <div className="primary-data">
                <div>
                  <strong
                    style={{ fontSize: "24px" }}
                  >{`${props.weatherData.temp}°`}</strong>
                  C
                </div>
                <div>{`Feels like ${props.weatherData.feelsLikeTemp}°C`}</div>
                <div>{props.weatherData.weatherDescription}</div>
              </div>
            </div>
            <div className="weather-right">
              <div className="secondary-data">
                <span>Humidity</span>
                <span>{`${props.weatherData.humidity}%`}</span>
              </div>
              <div className="secondary-data">
                <span>Wind Speed</span>
                <span>{`${props.weatherData.windSpeed}m/s`}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
