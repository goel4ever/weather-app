import React from 'react';

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <input type="text" name="zipcode" placeholder="Zip Code . . ." />
        <button>Get Weather</button>
      </form>
    );
  }
}
