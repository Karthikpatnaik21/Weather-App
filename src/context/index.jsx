import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState('Visakhapatnam');
  const [thisLocation, setLocation] = useState('');

  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  const fetchWeather = async () => {
    try {
      const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`);

      if (geoResponse.data.length > 0) {
        const { lat, lon, name, country } = geoResponse.data[0];
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`);
        const weatherData = weatherResponse.data;
        setLocation(`${weatherData.name}, ${weatherData.sys.country}`);
        setWeather(weatherData);
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const forecastData = forecastResponse.data;

        // Process the forecast data to get daily forecasts at noon (12:00 PM)
        const dailyForecasts = forecastData.list.filter(item => {
          const date = new Date(item.dt_txt);
          return date.getHours() === 12;
        }).map(day => ({
          dt: day.dt,
          dt_txt: day.dt_txt,
          main: { temp: day.main.temp },
          weather: [{ main: day.weather[0].main }]
        }));
        setValues(dailyForecasts);
      } else {
        alert("Location not found.");
      }
    } catch (e) {
      console.error('Error fetching weather data:', e);
      alert('Error fetching weather data');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider value={{
      weather,
      setPlace,
      values,
      thisLocation,
      place
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
