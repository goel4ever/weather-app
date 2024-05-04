import React from 'react';
import ReactGA from 'react-ga4';
import './App.css';
import Title from './components/Title';
import WeatherForm from './components/WeatherForm';
import Weather from './components/Weather';

const ZIP_CODE = '08816';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY_WEATHER}`;
const URL = `${BASE_URL}&zip=`;

class App extends React.Component {
  state = {
    temperature: undefined,
    error: undefined,
  }
  getWeather = async (e) => {
    e.preventDefault();

    const zipCode = e.target.elements.zipcode.value || ZIP_CODE;
    const country = 'us';

    let vendorUrl = URL;
    if (zipCode) {
      vendorUrl += `${zipCode},${country}`;

      const api_call = await fetch(vendorUrl);
      const data = await api_call.json();
      const temperatureInFahrenheit = (((data.main.temp-273.15)*1.8)+32).toFixed(2);
      const feelsLikeInFahrenheit = (((data.main.feels_like-273.15)*1.8)+32).toFixed(2);
      const minTempInFahrenheit = (((data.main.temp_min-273.15)*1.8)+32).toFixed(2);
      const maxTempInFahrenheit = (((data.main.temp_max-273.15)*1.8)+32).toFixed(2);
      const windSpeedInMph = this.windMpsToMph(data.wind.speed).toFixed(2);
      const windGustInMph = this.windMpsToMph(data.wind.gust).toFixed(2);

      // console.log(data);

      this.setState({
        temperature: temperatureInFahrenheit,
        feelsLike: feelsLikeInFahrenheit,
        minTemperature: minTempInFahrenheit,
        maxTemperature: maxTempInFahrenheit,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        windSpeed: windSpeedInMph,
        windGust: windGustInMph,
        description: data.weather[0].description,
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
        error: 'Please submit valid values',
      });
    }
  }
  windMpsToMph = (speed) => {
    return speed * 2.23694;
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
