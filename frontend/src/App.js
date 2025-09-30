import React, { useState, useEffect } from 'react';

const naijaCities = ['Lagos', 'Abuja', 'Port Harcourt'];
const foreignCities = ['London', 'New York', 'Tokyo', 'Berlin', 'San Francisco'];

const conditions = ['Sunny', 'Rainy', 'Cloudy', 'Windy', 'Stormy', 'Cool'];

const cityTimeZones = {
  'Lagos': 'Africa/Lagos',
  'Abuja': 'Africa/Lagos',
  'Port Harcourt': 'Africa/Lagos',
  'London': 'Europe/London',
  'New York': 'America/New_York',
  'Tokyo': 'Asia/Tokyo',
  'Berlin': 'Europe/Berlin',
  'San Francisco': 'America/Los_Angeles'
};

const getHour = (city) => {
  const date = new Date().toLocaleString('en-US', { timeZone: cityTimeZones[city] });
  return new Date(date).getHours();
};

const getIcon = (hour) => (hour >= 6 && hour < 18 ? '🌞' : '🌙');

const getNaijaGreeting = (hour) => {
  if (hour < 12) return {
    en: 'Good morning',
    ig: 'Ụtụtụ ọma',
    ha: 'Ina kwana',
    yo: 'E kaaro'
  };
  if (hour < 17) return {
    en: 'Good afternoon',
    ig: 'Ehihie ọma',
    ha: 'Ina wuni',
    yo: 'E kaasan'
  };
  return {
    en: 'Good night',
    ig: 'Mgbede ọma',
    ha: 'Ina yini',
    yo: 'E kaale'
  };
};

const getGlobalGreeting = (hour) => {
  if (hour < 12) return 'Good morning / Bonjour';
  if (hour < 17) return 'Good afternoon / Bon après-midi';
  return 'Good night / Bonsoir';
};

const getBackground = (condition) => {
  switch (condition) {
    case 'Sunny': return '#ffe066';
    case 'Rainy': return '#a4b0be';
    case 'Cloudy': return '#dfe4ea';
    case 'Windy': return '#70a1ff';
    case 'Stormy': return '#57606f';
    case 'Cool': return '#cce5ff';
    default: return '#ffffff';
  }
};

const generateWeather = (city) => ({
  location: city,
  temperature: Math.floor(Math.random() * 35),
  condition: conditions[Math.floor(Math.random() * conditions.length)],
  humidity: Math.floor(Math.random() * 100),
  windSpeed: Math.floor(Math.random() * 30),
  forecast: Array.from({ length: 2 }, (_, i) => ({
    day: `Day ${i + 1}`,
    temperature: Math.floor(Math.random() * 35),
    condition: conditions[Math.floor(Math.random() * conditions.length)]
  }))
});

const App = () => {
  const [naijaCity, setNaijaCity] = useState(naijaCities[0]);
  const [foreignCity, setForeignCity] = useState(foreignCities[0]);
  const [naijaWeather, setNaijaWeather] = useState(generateWeather(naijaCity));
  const [foreignWeather, setForeignWeather] = useState(generateWeather(foreignCity));
  const [naijaTime, setNaijaTime] = useState('');
  const [foreignTime, setForeignTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const naijaDate = new Date().toLocaleTimeString('en-US', { timeZone: cityTimeZones[naijaCity] });
      const foreignDate = new Date().toLocaleTimeString('en-US', { timeZone: cityTimeZones[foreignCity] });
      setNaijaTime(naijaDate);
      setForeignTime(foreignDate);
    }, 1000);
    return () => clearInterval(timer);
  }, [naijaCity, foreignCity]);

  useEffect(() => {
    setNaijaWeather(generateWeather(naijaCity));
  }, [naijaCity]);

  useEffect(() => {
    setForeignWeather(generateWeather(foreignCity));
  }, [foreignCity]);

  const naijaHour = getHour(naijaCity);
  const foreignHour = getHour(foreignCity);
  const naijaGreeting = getNaijaGreeting(naijaHour);

  return (
    <div style={styles.page}>
      {/* Naija Section */}
      <div style={{ ...styles.section, backgroundColor: getBackground(naijaWeather.condition) }}>
        <h1 style={styles.header}>🇳🇬 Naija Weather</h1>
        <p style={styles.greeting}>
          {naijaGreeting.en} | {naijaGreeting.ig} | {naijaGreeting.ha} | {naijaGreeting.yo}
          <span style={styles.icon}>{getIcon(naijaHour)}</span>
        </p>
        <p style={styles.clock}>Time in {naijaCity}: {naijaTime}</p>

        <select style={styles.select} value={naijaCity} onChange={(e) => setNaijaCity(e.target.value)}>
          {naijaCities.map((city, i) => <option key={i} value={city}>{city}</option>)}
        </select>

        <div style={styles.card}>
          <h2>{naijaWeather.location}</h2>
          <p style={styles.temp}>{naijaWeather.temperature}°C</p>
          <p>{naijaWeather.condition}</p>
          <p>Humidity: {naijaWeather.humidity}% | Wind: {naijaWeather.windSpeed} km/h</p>
        </div>

        <div style={styles.forecastContainer}>
          {naijaWeather.forecast.map((day, i) => (
            <div key={i} style={styles.forecastCard}>
              <p>{day.day}</p>
              <p>{day.temperature}°C</p>
              <p>{day.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Global Section */}
      <div style={{ ...styles.section, backgroundColor: getBackground(foreignWeather.condition) }}>
        <h1 style={styles.header}>🌍 Global Weather</h1>
        <p style={styles.greeting}>
          {getGlobalGreeting(foreignHour)} <span style={styles.icon}>{getIcon(foreignHour)}</span>
        </p>
        <p style={styles.clock}>Time in {foreignCity}: {foreignTime}</p>

        <select style={styles.select} value={foreignCity} onChange={(e) => setForeignCity(e.target.value)}>
          {foreignCities.map((city, i) => <option key={i} value={city}>{city}</option>)}
        </select>

        <div style={styles.card}>
          <h2>{foreignWeather.location}</h2>
          <p style={styles.temp}>{foreignWeather.temperature}°C</p>
          <p>{foreignWeather.condition}</p>
          <p>Humidity: {foreignWeather.humidity}% | Wind: {foreignWeather.windSpeed} km/h</p>
        </div>

        <div style={styles.forecastContainer}>
          {foreignWeather.forecast.map((day, i) => (
            <div key={i} style={styles.forecastCard}>
              <p>{day.day}</p>
              <p>{day.temperature}°C</p>
              <p>{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem',
    boxSizing: 'border-box'
  },
  section: {
    flex: '1 1 400px',
    maxWidth: '480px',
    borderRadius: '12px',
    padding: '1.2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem'
  },
  greeting: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  }
};

export default App;