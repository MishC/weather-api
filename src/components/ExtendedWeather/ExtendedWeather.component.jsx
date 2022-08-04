import { React } from "react";
import {Dates} from "../../functions/Dates";
//import  {PartOfDay} from "../../functions/PartOfDay";
const ExtendedWeather = ({days}) => {
   console.log(days[1].evening[0].data);
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
    {[...Array(6).keys()].map(i=>{return(<tr> 
        <th scope="row">Today {Dates(i)}</th>
    {(days[i].night[0])?(<td>{days[i].night[0].data.next_1_hours.summary.symbol_code}</td>):
    <td>{""}</td>}
 {(days[i].morning[0])?(<td>{days[i].morning[0].data.next_1_hours.summary.symbol_code}</td>):
    <td>{""}</td>}    {(days[i].afternoon[0])?(<td>{days[i].afternoon[0].data.next_1_hours.summary.symbol_code}</td>):
    <td>{""}</td>}
 {(days[i].evening[0])?(<td>{days[i].evening[0].data.next_1_hours.summary.symbol_code}</td>):
    <td>{""}</td>}    </tr>)}) }
      
    </tbody>
              </table>

  </div>)};
  export default  ExtendedWeather;