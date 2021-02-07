// See https://api.met.no/weatherapi/weathericon/2.0/documentation
const legends = {
  partlycloudy: { description: 'Partly cloudy', variants: ['day', 'night', 'polartwilight'] },
  sleetandthunder: { description: 'Sleet and thunder', variants: null },
  fair: { description: 'Fair', variants: ['day', 'night', 'polartwilight'] },
  snowshowers: { description: 'Snow showers', variants: ['day', 'night', 'polartwilight'] },
  heavysnow: { description: 'Heavy snow', variants: null },
  clearsky: { description: 'Clear sky', variants: ['day', 'night', 'polartwilight'] },
  heavyrain: { description: 'Heavy rain', variants: null },
  lightssnowshowersandthunder: {
    description: 'Light snow showers and thunder',
    variants: ['day', 'night', 'polartwilight'],
  },
  lightssleetshowersandthunder: {
    description: 'Light sleet showers and thunder',
    variants: ['day', 'night', 'polartwilight'],
  },
  lightsleet: { description: 'Light sleet', variants: null },
  heavysleetshowersandthunder: {
    description: 'Heavy sleet showers and thunder',
    variants: ['day', 'night', 'polartwilight'],
  },
  heavysleetshowers: { description: 'Heavy sleet showers', variants: ['day', 'night', 'polartwilight'] },
  lightsnowandthunder: { description: 'Light snow and thunder', variants: null },
  heavyrainandthunder: { description: 'Heavy rain and thunder', variants: null },
  heavysnowshowers: { description: 'Heavy snow showers', variants: ['day', 'night', 'polartwilight'] },
  heavyrainshowers: { description: 'Heavy rain showers', variants: ['day', 'night', 'polartwilight'] },
  sleet: { description: 'Sleet', variants: null },
  heavyrainshowersandthunder: {
    description: 'Heavy rain showers and thunder',
    variants: ['day', 'night', 'polartwilight'],
  },
  lightsleetandthunder: { description: 'Light sleet and thunder', variants: null },
  rainshowers: { description: 'Rain showers', variants: ['day', 'night', 'polartwilight'] },
  heavysleetandthunder: { description: 'Heavy sleet and thunder', variants: null },
  rainandthunder: { description: 'Rain and thunder', variants: null },
  rain: { description: 'Rain', variants: null },
  snowandthunder: { description: 'Snow and thunder', variants: null },
  snow: { description: 'Snow', variants: null },
  fog: { description: 'Fog', variants: null },
  snowshowersandthunder: { description: 'Snow showers and thunder', variants: ['day', 'night', 'polartwilight'] },
  lightrainandthunder: { description: 'Light rain and thunder', variants: null },
  sleetshowersandthunder: { description: 'Sleet showers and thunder', variants: ['day', 'night', 'polartwilight'] },
  lightsleetshowers: { description: 'Light sleet showers', variants: ['day', 'night', 'polartwilight'] },
  lightsnow: { description: 'Light snow', variants: null },
  cloudy: { description: 'Cloudy', variants: null },
  lightrainshowers: { description: 'Light rain showers', variants: ['day', 'night', 'polartwilight'] },
  lightrain: { description: 'Light rain', variants: null },
  rainshowersandthunder: { description: 'Rain showers and thunder', variants: ['day', 'night', 'polartwilight'] },
  lightrainshowersandthunder: {
    description: 'Light rain showers and thunder',
    variants: ['day', 'night', 'polartwilight'],
  },
  heavysleet: { description: 'Heavy sleet', variants: null },
  lightsnowshowers: { description: 'Light snow showers', variants: ['day', 'night', 'polartwilight'] },
  heavysnowshowersandthunder: {
    description: 'Heavy snow showers and thunder',
    variants: ['day', 'night', 'polartwilight'],
  },
  heavysnowandthunder: { description: 'Heavy snow and thunder', variants: null },
  sleetshowers: { description: 'Sleet showers', variants: ['day', 'night', 'polartwilight'] },
};

export const getWeatherData = (code: string) => {
  const foo = code.split('_');

  const type = foo[0] as keyof typeof legends;
  const variant = foo[1] || null;

  let icon = `${type}${variant ? '_' + variant : ''}.png`;

  return {
    icon,
    type,
    variant,
    description: legends[type].description,
  };
};
