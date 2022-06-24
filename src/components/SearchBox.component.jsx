import React from "react";
import axios from "axios";
export default class SearchBox extends React.Component {
  state = {
    instantWeather: {},
    lat: 0,
    lon: 0,
  };

  /*function handleDefault(response) {
   setDefaultCity(response.data.city.name);
 }*/

  retrievePosition = (position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    axios.get(url).then((res) => {
      const data = res.data;
      this.setState({
        instantWeather: data.properties.timeseries[0].data.instant.details,
      });
      console.log(this.state.instantWeather);
    });
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.retrievePosition);
  }

  /* function handleSearch(event) {
      event.preventDefault();
      setCity(event.target.value);
    }*/
  /*function handleSubmit(event) {
      event.preventDefault();

      let urlCity = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&APPID=${apiKey}`;

      axios.get(urlCity).then(handleResponse);
    }*/
  render() {
    return (
      <div className="SearchBar">
        <form className="SearchBar">
          {" "}
          {/*onSubmit={handleSubmit}*/}
          <div className="inline">
            <input
              type="search"
              placeholder="Type a city"
              className="form-control shadow-sm"
              autoFocus="on"
              autoComplete="off"
            />{" "}
            {/*onChange={handleSearch}*/}
            <input
              type="submit"
              value="Search"
              className="btn btn-success btn-rounded shadow-sm"
            />
          </div>{" "}
        </form>
        {
          <div>
            <h1>{this.state.instantWeather.air_temperature} °C</h1>
          </div>
        }
      </div>
    );
  }
}
