import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Search from "./Search";
import { Location, WeatherData } from "./types";
import Weather from "./Weather";
import debounce from "./utils/debounce";

const API_KEY = "ec4f6dbff99ea5d83e06bbff7a6f7060";

function App() {
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [weatherQuery, setWeatherQuery] = useState<Location>();
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const fetchLocations = useCallback(
    async (query: string, abortController: AbortController) => {
      try {
        const searchQuery = query.trim();
        if (searchQuery) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`,
            { signal: abortController.signal }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setLocations(
              data.map((d: any) => {
                return {
                  name: d.display_name,
                  lat: d.lat,
                  lon: d.lon,
                };
              })
            );
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.log(err.message);
        }
      }
    },
    []
  );

  const debouncedFetchLocations = useCallback(
    debounce(fetchLocations, 400),
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    debouncedFetchLocations(locationQuery, abortController);
    return () => {
      abortController.abort();
      setLocations([]);
    };
  }, [locationQuery]);

  useEffect(() => {
    async function fetchWeatherData() {
      if (!weatherQuery) {
        return;
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${weatherQuery?.lat}&lon=${weatherQuery?.lon}&appid=${API_KEY}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        const weatherDes = data.weather[0]?.description
          .split(" ")
          .filter((word: string) => word)
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setWeatherData({
          name: weatherQuery.name,
          temp: data.main.temp,
          feelsLikeTemp: data.main.feels_like,
          humidity: data.main.humidity,
          weatherDescription: weatherDes,
          icon: data.weather[0]?.icon,
          weatherMain: data.weather[0]?.main,
          windSpeed: data.wind.speed,
          windGust: data.wind.gust,
        });
      }
    }
    fetchWeatherData();
  }, [weatherQuery]);

  return (
    <div className="app">
      <Search
        locationQuery={locationQuery}
        onLocationQueryChanged={setLocationQuery}
        locations={locations}
        onWeatherQueryChanged={setWeatherQuery}
      />
      <Weather weatherData={weatherData} />
    </div>
  );
}

export default App;
