import { Dates } from "../../functions/Dates";
import { Average } from "../../functions/Average";

import WeatherImg from "../weatherImg/WeatherImg.component";
import "./ExtendedWeather.styles.css";

//import  {PartOfDay} from "../../functions/PartOfDay";
const ExtendedWeather = ({ days }) => {
  return (
    <div className="ExtendedWeather mt-5 mx-4">
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
          {[...Array(5).keys()].map((i) => {
            const arrDay = Object.entries(days[i]);

            let arrDayT = arrDay.map((item) => {
              if (item[1][0] === undefined) {
                return "none";
              }
              return item[1][0].data.instant.details.air_temperature;
            });
            arrDayT = arrDayT.filter((i) => {
              return i !== "none";
            });

            let x = 6;
            let y = `next_${x}_hours`;

            //

            let arrDayP = arrDay.map((item) => {
              if (item[1][0] === undefined) {
                return "none";
              }
              return item[1][0].data[y].details.precipitation_amount;
            });

            arrDayP = arrDayP.filter((i) => {
              return i !== "none";
            });

            ///////
            let arrDayW = arrDay.map((item) => {
              if (item[1][0] === undefined) {
                return "none";
              }
              return item[1][0].data.instant.details.wind_speed;
            });

            arrDayW = arrDayW.filter((i) => {
              return i !== "none";
            });

            if (Math.round(Math.max(...arrDayT)) === Infinity) {
              arrDayT = 0;
              arrDayP = "";

              arrDayW = "";
            }

            return (
              <tr key={i}>
                {i === 0 ? (
                  <th scope="row">Today {Dates(i)}</th>
                ) : (
                  <th scope="row"> {Dates(i)}</th>
                )}
                {days[i].night[0] !== undefined ? (
                  <td>
                    <WeatherImg
                      summary={days[i].night[0].data[y].summary.symbol_code}
                      key={Date.now()}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                {days[i].morning[0] !== undefined ? (
                  <td>
                    <WeatherImg
                      summary={days[i].morning[0].data[y].summary.symbol_code}
                      key={Date.now()}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                {days[i].afternoon[0] !== undefined ? (
                  <td>
                    <WeatherImg
                      summary={days[i].afternoon[0].data[y].summary.symbol_code}
                      key={Date.now()}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                {days[i].evening[0] !== undefined ? (
                  <td>
                    <WeatherImg
                      summary={days[i].evening[0].data[y].summary.symbol_code}
                      key={Date.now()}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                <td className="daily-weather-list-item__temperature ">
                  {Math.round(Math.max(...arrDayT)) !== Infinity
                    ? `${Math.round(Math.max(...arrDayT))}°/
                  ${Math.round(Math.min(...arrDayT))}°`
                    : ""}
                </td>
                <td className="daily-weather-list-item__precipitation ">
                  {typeof arrDayP !== "string"
                    ? `${Math.round(Average(arrDayP))} mm`
                    : ""}
                </td>
                <td className="daily-weather-list-item__wind ">
                  {typeof arrDayW !== "string"
                    ? `${Math.round(Average(arrDayW))} m/s`
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ExtendedWeather;
