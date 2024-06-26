import React from 'react';

export default class Weather extends React.Component {
  render() {
    return (
      <div className="weather__info">
        {
          this.props.city && this.props.country
          && <p className="weather__key">
            Location: <span className="weather__value">{this.props.city}, {this.props.country}</span>
          </p>
        }
        {
          this.props.temperature
          && <p className="weather__key">
            Temperature: <span className="weather__value">{this.props.temperature}</span>
            {this.props.feelsLike && <><br/>Feels like: <span className="weather__value">{this.props.feelsLike}</span></>}
            {this.props.minTemperature && <><br/>Min: <span className="weather__value">{this.props.minTemperature}</span></>}
            {this.props.maxTemperature && <><br/>Max: <span className="weather__value">{this.props.maxTemperature}</span></>}
          </p>
        }
        {
          this.props.humidity
          && <p className="weather__key">
            Humidity: <span className="weather__value">{this.props.humidity}</span>
            {this.props.windSpeed && <><br/>Wind speed: <span className="weather__value">{this.props.windSpeed} mph</span></>}
            {this.props.windGust && <><br/>Wind gust: <span className="weather__value">{this.props.windGust} mph</span></>}
          </p>
        }
        {
          this.props.description
          && <p className="weather__key">
            Conditions: <span className="weather__value">{this.props.description}</span>
          </p>
        }
        {
          this.props.error
          && <p className="weather__error">
            {this.props.error}
          </p>
        }
      </div>
    );
  }
}
