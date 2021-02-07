import { LocalEvent } from 'app/event';
import { useEffect, useState } from 'react';

import { getWeatherData } from 'utils/weather';

type WeatherProps = {
  children?: never;
} & Pick<LocalEvent['location'], 'latitude' | 'longitude'>;

export const Weather: React.FC<WeatherProps> = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState<ReturnType<typeof getWeatherData> | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        const day = data.properties.timeseries[0].data;

        setWeather(getWeatherData(day.next_1_hours.summary.symbol_code));
      } catch (e) {
        console.error('Could not retrieve weather data.');
      }
    };

    getWeather();
  }, [latitude, longitude, setWeather]);

  const title = `Current weather: ${weather?.description}`;

  return (
    <div
      className="p-1 inline-block shadow-sm font-bold bg-white rounded-sm leading-0"
      title={weather ? title : undefined}
    >
      {weather ? (
        <img src={`/icons/png/${weather.icon}`} alt={title} className="w-9 h-9" />
      ) : (
        <div className="w-5 h-5 rounded-full m-2 bg-gray-300 animate-pulse" />
      )}
    </div>
  );
};
