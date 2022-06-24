import React from "react";

import axios from "axios";
import { Circles } from "react-loader-spinner";
import SearchBar from "../SearchBar/SearchBar.component";
import "./Current.Weather.styles.css";

export default class CurrentWeather extends React.Component {
  state = {
    instantWeather: {},
    city: "",
    district: "",
    lat: 0,
    lon: 0,
    // searchField:""
  };

  /*function handleDefault(response) {
   setDefaultCity(response.data.city.name);
 }*/

  retrievePosition = (position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    this.setState({ lat: lat });
    this.setState({ lon: lon });

    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    const url1 = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`;
    axios.get(url).then((res) => {
      const data = res.data;
      this.setState({
        instantWeather: data.properties.timeseries[0].data.instant.details,
      });
    });
    axios.get(url1).then((res) => {
      const data1 = res.data.features[0].properties.address;
      this.setState({ city: data1.city });
      this.setState({ district: data1.city_district });
    });
  };
  /* handleSearch(event) {
    event.preventDefault();
    this.setState({city:event.target.value});
  }
handleSubmit(event) {
    event.preventDefault();

    let urlCity = `https://api.openweathermap.org/data/2.5/forecast/?q=${this.state.city}&units=metric&APPID=${apiKey}`;

    axios.get(urlCity).then(handleResponse);
  }
 handleResponse(response) {
    let now = new Date();

    this.setState({
      ready: true,
      city: response.data.city.name.toUpperCase(),
      country: response.data.city.country,
      temperature: Math.round(response.data.list[0].main.temp),
      icon: response.data.list[0].weather[0].icon,
      // icon: `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`,
      description: response.data.list[0].weather[0].description,
      precipitation: Math.round(response.data.list[0].pop),
      wind: Math.round(response.data.list[0].wind.speed),
      humidity: response.data.list[0].main.humidity,
      windDeg: Math.round(response.data.list[0].wind.deg),
      date: currentDate(now),
      coordinates: response.data.city.coord,
    });
  }*/

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.retrievePosition);
  }

  render() {
    if (this.state.lat !== 0) {
      return (
        <div className="current-weather">
          <h2>City: {this.state.city}</h2>
          <h2>City District: {this.state.district}</h2>

          <SearchBar />

          <h2>Temperature: {this.state.instantWeather.air_temperature} °C</h2>
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
