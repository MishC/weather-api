import { React } from "react";
import "./SearchBar.styles.css";
const SearchBar = ({ handleSearch, handleSubmit }) => {
  /* const [city, setCity] = useState();
  function handleSearch(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();

    //let urlCity = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&APPID=${apiKey}`;

    //axios.get(urlCity).then(handleResponse);
  }*/
  return (
    <form className="inline" onSubmit={handleSubmit}>
      {" "}
      {/*onSubmit={handleSubmit}*/}
      <input
        type="search"
        placeholder="Type a city"
        className="form-control shadow-sm"
        autoFocus="on"
        autoComplete="off"
        onChange={handleSearch}
      />{" "}
      {/**/}
      <input
        type="submit"
        value="Search"
        className="btn btn-success btn-rounded shadow-sm "
      />
    </form>
  );
};
export default SearchBar;
