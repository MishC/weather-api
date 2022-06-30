import { React } from "react";
import "./SearchBar.styles.css";
const SearchBar = ({ handleSearch, handleSubmit }) => {
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
        className="btn btn-primary btn-rounded shadow-sm "
      />
    </form>
  );
};
export default SearchBar;
