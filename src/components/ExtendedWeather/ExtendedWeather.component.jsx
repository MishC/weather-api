import { React } from "react";
import {Dates} from "../../functions/Dates.js";
import  {PartOfDay} from "../../functions/PartOfDay";
const ExtendedWeather = () => {
  return(<div className="ExtendedWeather mt-5 mx-4">
                <table className="table">
            <thead>
    <tr>
    <th scope="col"> </th>

      <th scope="col"> Night</th>
      <th scope="col">Morning</th>
      <th scope="col">Afternoon</th>
      <th scope="col">Evening</th>
      <th scope="col">Max/Min temperature</th>
      <th scope="col">Precipitation</th>
      <th scope="col">Wind</th>



    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Today {Dates(0)}</th>
      <td></td>
      <td></td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">{Dates(1)}</th>
      <td></td>
      <td></td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">{Dates(2)}</th>
      <td></td>
      <td></td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">{Dates(3)}</th>
      <td></td>
      <td></td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">{Dates(4)}</th>
      <td></td>
      <td></td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">{Dates(5)}</th>
      <td></td>
      <td></td>
      <td>@mdo</td>
    </tr>
    </tbody>
              </table>

  </div>)};
  export default  ExtendedWeather;