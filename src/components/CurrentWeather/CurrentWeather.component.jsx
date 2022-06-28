import React from "react";

import axios from "axios";
import { Circles } from "react-loader-spinner";
import SearchBar from "../SearchBar/SearchBar.component";
import "./Current.Weather.styles.css";

export default class CurrentWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      instantWeather: {},
      instantTemperature: 0,
      city: "",
      cityShow: "",
      lat: 0,
      lon: 0,
      ready: false,
      summary: "",
      precipitation: 0,
      windSpeed: 0,
      // searchField:""
    };
  }

  /*function handleDefault(response) {
   setDefaultCity(response.data.city.name);
 }*/

  retrievePosition = (position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    this.setState({ lat: lat });
    this.setState({ lon: lon });

    let url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    let url1 = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`;
    axios.get(url).then((res) => {
      this.setState({
        summary:
          res.data.properties.timeseries[0].data.next_1_hours.summary
            .symbol_code,
        instantTemperature: Math.floor(
          res.data.properties.timeseries[0].data.instant.details.air_temperature
        ),
        precipitation:
          res.data.properties.timeseries[0].data.next_1_hours.details
            .precipitation_amount,
        windSpeed:
          res.data.properties.timeseries[0].data.instant.details.wind_speed,
      });
    });
    axios.get(url1).then((res) => {
      const data1 = res.data.features[0].properties.address;
      this.setState({ cityShow: data1.city + ", " + data1.city_district });
    });
  };
  ///////
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.retrievePosition);
    console.log("Mount");
  }
  ////
  handleSearch = (event) => {
    event.preventDefault();
    this.setState({ city: event.target.value });
    // let urlCity = `https://nominatim.openstreetmap.org/search?q=${this.state.city}&format=geojson`;
  };
  /////
  handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${this.state.city}&format=geojson`
    );
    this.setState({
      cityShow: response.data.features[0].properties.display_name,
      lat: response.data.features[0].geometry.coordinates[0].toFixed(5),
      lon: response.data.features[0].geometry.coordinates[1].toFixed(5),
    });

    //let url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${this.state.lat}&lon=${this.state.lon}`;
    const res = await axios.get(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${this.state.lat}&lon=${this.state.lon}`
    );

    //console.log(res.data);
    this.setState({
      ready: true,
      summary:
        res.data.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
      instantTemperature: Math.floor(
        res.data.properties.timeseries[0].data.instant.details.air_temperature
      ),
      precipitation:
        res.data.properties.timeseries[0].data.next_1_hours.details
          .precipitation_amount,
      windSpeed:
        res.data.properties.timeseries[0].data.instant.details.wind_speed,
    });
  };

  render() {
    if (this.state.lat !== 0) {
      return (
        <div className="current-weather">
          <SearchBar
            handleSearch={this.handleSearch}
            handleSubmit={this.handleSubmit}
          />
          <h2>City: {this.state.cityShow}</h2>
          <h3>Summary: {this.state.summary} </h3>

          <h3>Temperature: {this.state.instantTemperature} °C</h3>
          <h3>Precipitation: {this.state.precipitation} </h3>
          <h3>Wind Speed: {this.state.windSpeed} </h3>
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
