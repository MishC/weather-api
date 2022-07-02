import React from "react";

import axios from "axios";
import { Circles } from "react-loader-spinner";
import SearchBar from "../SearchBar/SearchBar.component";
import WeatherImg from "../weatherImg/WeatherImg.component";
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
  }
  ////
  handleSearch = (event) => {
    event.preventDefault();
    this.setState({ city: event.target.value });
    // let urlCity = `https://nominatim.openstreetmap.org/search?q=${this.state.city}&format=geojson`;
  };
  ///
  handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${this.state.city}&format=geojson`
    );
    const res = await axios.get(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${response.data.features[0].geometry.coordinates[1]}&lon=${response.data.features[0].geometry.coordinates[0]}`
    );
    console.log(response.data);
    console.log(res.data);
    this.setState({
      ready: true,
      cityShow: response.data.features[0].properties.display_name,
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
    if (this.state.cityShow) {
      return (
        <div className="current-weather  ">
          <SearchBar
            handleSearch={this.handleSearch}
            handleSubmit={this.handleSubmit}
          />

          <h3 className="mb-5 text-white">{this.state.cityShow}</h3>
          <div className="instant-weather inline  bg-white p-3">
            <div>
              <h5 className="text-left  ">Current condition</h5>

              <br />

              <WeatherImg summary={this.state.summary} key={Date.now()} />
              <h6 className="text-muted">
                {this.state.summary.split("_")[0]}{" "}
              </h6>
            </div>
            <h4 className="text-left m-4 p-5">
              {this.state.instantTemperature} °C
            </h4>
            <h4 className="text-left m-4 p-5">
              {" "}
              {this.state.precipitation} mm
            </h4>
            <h4 className="text-left m-4 p-5"> {this.state.windSpeed} m/s</h4>
          </div>
          <div>
            <button></button>
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
