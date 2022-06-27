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
      lat: 0,
      lon: 0,
      ready: false,
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
      const data = res.data;
      this.setState({
        instantTemperature:
          data.properties.timeseries[0].data.instant.details.air_temperature,
      });
    });
    axios.get(url1).then((res) => {
      const data1 = res.data.features[0].properties.address;
      this.setState({ city: data1.city + ", " + data1.city_district });
    });
  };
  ///////
  handleSearch = (event) => {
    // event.preventDefault();
    this.setState({ city: event.target.value });
    //console.log(this.state.city);
  };
  handleSubmit = (event) => {
    event.preventDefault();

    let urlCity = `https://nominatim.openstreetmap.org/search?q=${this.state.city}&format=geojson`;

    axios.get(urlCity).then(this.handleResponse);
  };
  handleResponse = (response) => {
    let now = new Date();

    console.log(response.data);
    this.setState({
      ready: true,
      city: response.data.features[0].properties.display_name,
      lat: response.data.features[0].geometry.coordinates[0].toFixed(5),
      lon: response.data.features[0].geometry.coordinates[1].toFixed(5),
    });
    let url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${this.state.lat}&lon=${this.state.lon}`;
    axios.get(url).then((res) => {
      const data = res.data;
      console.log(res);
      let avg_temperature = 0;
      let length_timeseries = data.properties.timeseries.length;
      data.properties.timeseries.forEach((timeserie) => {
        avg_temperature += timeserie.data.instant.details.air_temperature;
      });
      this.setState({
        instantTemperature: avg_temperature / length_timeseries,
      });
      console.log("hello");
      console.log(data.properties.timeseries[0].data.instant.details);
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.retrievePosition);
    console.log("Mount");
  }
  /*componentDidUpdate({city}){
if
}*/
  render() {
    if (this.state.lat !== 0) {
      return (
        <div className="current-weather">
          <h2>City: {this.state.city}</h2>

          <SearchBar
            handleSearch={this.handleSearch}
            handleSubmit={this.handleSubmit}
            handleResponse={this.handleResponse}
          />

          <h2>Temperature: {this.state.instantTemperature} °C</h2>
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
