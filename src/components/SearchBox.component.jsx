import React from "react";

import axios from "axios";
import { Circles } from "react-loader-spinner";

export default class SearchBox extends React.Component {
  state = {
    instantWeather: {},
    city: "",
    district: "",
    lat: 0,
  };

  /*function handleDefault(response) {
   setDefaultCity(response.data.city.name);
 }*/

  retrievePosition = (position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    this.setState({ lat: lat });

    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    const url1 = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`;
    axios.get(url).then((res) => {
      const data = res.data;
      this.setState({
        instantWeather: data.properties.timeseries[0].data.instant.details,
      });
      //console.log(this.state.instantWeather);
    });
    axios.get(url1).then((res) => {
      const data1 = res.data.features[0].properties.address;
      this.setState({ city: data1.city });
      this.setState({ district: data1.city_district });
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
    if (this.state.lat !== 0) {
      return (
        <div className="SearchBar">
          <h2>City: {this.state.city}</h2>
          <h2>City District: {this.state.district}</h2>
          <form>
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

          <div>
            <h1>Current Weather</h1>

            <h2>Temperature {this.state.instantWeather.air_temperature} °C</h2>
          </div>
        </div>
      );
    } else {
      <div className="loader">
        {" "}
        <Circles color="#00BFFF" height={80} width={80} />
      </div>;
    }
  }
}
