import { React } from "react";
import {Dates} from "../../functions/Dates.js";
//import  {PartOfDay} from "../../functions/PartOfDay";
const ExtendedWeather = ({day0,day1,day2,day3,day4,day5}) => {
    console.log(day0.evening)
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
      {/*" <th scope="row">Today {Dates(0)}</th>
       {day0.night===undefined?(
    <td>{" "}</td>):( <td>{day0.night[0].data.next_1_hours.summary.symbol_code}</td>)}
       {day0.morning===undefined?(
    <td>{" "}</td>):( <td>{day0.morning[0].data.next_1_hours.summary.symbol_code}</td>)}
       {day0.afternoon===undefined?(
    <td>{" "}</td>):( <td>{day0.afternoon[0].data.next_1_hours.summary.symbol_code}</td>)}<td>{day0.evening.length>0?day0.evening[0].data.next_1_hours.summary.symbol_code:" "}</td>
       ""*/}
    </tr>
    <tr>
    <th scope="row">{Dates(1)}</th>
      <td>{day1.night[0].data.next_1_hours.summary.symbol_code}</td>
      <td>{day1.morning[0].data.next_1_hours.summary.symbol_code}</td>
      <td>{day1.afternoon[0].data.next_1_hours.summary.symbol_code}</td>
      <td>{day1.evening[0].data.next_1_hours.summary.symbol_code}</td>

      
    </tr>
    <tr>
      <th scope="row">{Dates(2)}</th>
      <td>{day2.night[0].data.next_1_hours.summary.symbol_code}</td>
      <td>{day2.morning[0].data.next_1_hours.summary.symbol_code}</td>
      <td>{day2.afternoon[0].data.next_1_hours.summary.symbol_code}</td>
      <td>{day2.evening[0].data.next_1_hours.summary.symbol_code}</td> 

    </tr>
    <tr>
      <th scope="row">{Dates(3)}</th>
      <td>{day3.night[0].data.next_6_hours.summary.symbol_code}</td>
      <td>{day3.morning[0].data.next_6_hours.summary.symbol_code}</td>
      <td>{day3.afternoon[0].data.next_6_hours.summary.symbol_code}</td>
      <td>{day3.evening[0].data.next_6_hours.summary.symbol_code}</td> 
  <td></td>
  <td></td>
  <td></td>
    </tr>
    <tr>
     <th scope="row">{Dates(4)}</th>
     <td>{day4.night[0].data.next_6_hours.summary.symbol_code}</td>
      <td>{day4.morning[0].data.next_6_hours.summary.symbol_code}</td>
      <td>{day4.afternoon[0].data.next_6_hours.summary.symbol_code}</td>
<td>{day4.evening[0].data.next_6_hours.summary.symbol_code}</td>

    </tr>
    <tr>
      <th scope="row">{Dates(5)}</th>
      <td>{day5.night[0].data.next_6_hours.summary.symbol_code}</td>
      <td>{day5.morning[0].data.next_6_hours.summary.symbol_code}</td>
      <td>{day5.afternoon[0].data.next_6_hours.summary.symbol_code}</td>
<td>{day5.evening[0].data.next_6_hours.summary.symbol_code}</td>
      <td></td>
    </tr>
    </tbody>
              </table>

  </div>)};
  export default  ExtendedWeather;