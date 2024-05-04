import React from 'react';
import ReactGA from 'react-ga4';
import './App.css';
import Title from './components/Title';
import WeatherForm from './components/WeatherForm';
import Weather from './components/Weather';

const ZIP_CODE = '08816';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY_WEATHER}`;
const URL = `${BASE_URL}&zip=`;
const CONVERSION_FACTOR = 2.23694;

class App extends React.Component {
  state = {
    temperature: undefined,
    error: undefined,
  }

  getWeatherData = async (url) => {
    const api_call = await fetch(url);
    return await api_call.json();
  }

  convertToMph = (speed) => {
    return speed * CONVERSION_FACTOR;
  }

  updateState = async (vendorUrl) => {
    const data = await this.getWeatherData(vendorUrl);

    if (data.cod === 200) {
      const { main, wind, name, sys, weather } = data;
      const { temp, feels_like, temp_min, temp_max, humidity } = main;
      const { speed, gust } = wind;

      const temperatureInFahrenheit = temp ? (((temp-273.15)*1.8)+32).toFixed(2) : null;
      const feelsLikeInFahrenheit = feels_like ? (((feels_like-273.15)*1.8)+32).toFixed(2) : null;
      const minTempInFahrenheit = temp_min ? (((temp_min-273.15)*1.8)+32).toFixed(2) : null;
      const maxTempInFahrenheit = temp_max ? (((temp_max-273.15)*1.8)+32).toFixed(2) : null;
      const windSpeedInMph = speed ? this.convertToMph(speed).toFixed(2) : null;
      const windGustInMph = gust ? this.convertToMph(gust).toFixed(2) : null;

      this.setState({
        temperature: temperatureInFahrenheit,
        feelsLike: feelsLikeInFahrenheit,
        minTemperature: minTempInFahrenheit,
        maxTemperature: maxTempInFahrenheit,
        city: name,
        country: sys.country,
        humidity: humidity,
        windSpeed: windSpeedInMph,
        windGust: windGustInMph,
        description: weather[0].description,
        error: '',
      });
    } else {
      this.setState({
        temperature: undefined,
        feelsLike: undefined,
        minTemperature: undefined,
        maxTemperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        windSpeed: undefined,
        windGust: undefined,
        description: undefined,
        error: data.cod === 401 ? 'API key expired' : 'Please submit valid zipcode.',
      });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const zipCode = e.target.elements.zipcode.value || ZIP_CODE;
    const country = 'us';

    let vendorUrl = URL;
    if (zipCode) {
      vendorUrl += `${zipCode},${country}`;

      await this.updateState(vendorUrl);
    }
  }

  render() {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
      title: 'Weather Home Page',
    });

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-5 title-container">
                  <Title />
                </div>
                <div className="col-7 form-container">
                  <WeatherForm getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    feelsLike={this.state.feelsLike}
                    minTemperature={this.state.minTemperature}
                    maxTemperature={this.state.maxTemperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    windSpeed={this.state.windSpeed}
                    windGust={this.state.windGust}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;