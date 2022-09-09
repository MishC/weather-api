//import { PartOfDay } from "./PartOfDay";
import { Dates } from "./Dates";
const NextDays = (timeseries, dayX, timeshifts) => {
  //timeseries as coming from yr.no API
  //dayX - integer shift in Day in month relative to current date
  //timeshifts - timeshifts for dayX
  //dayPart is string representing the part of the day (timeserie) which will be returned
  console.log(timeshifts);
  let now = new Date();
  let hours = now.getUTCHours();
  let dayMonth = Dates(dayX, "daymonth");

  const dayLocal = timeshifts[dayX] + hours > 24 ? dayMonth + 1 : dayMonth;
  console.log(dayLocal, dayMonth, timeshifts[dayX], hours);
  ////////////////////////////////////////////////////////////////////////////////////
  const timeLocal = (h) =>
    ///gives local timeshift  and add it to the current UTC time;

    timeshifts[dayX] + h > 24
      ? timeshifts[dayX] + h - 24
      : timeshifts[dayX] + h;

  //console.log(timeLocal(23));

  const timeLocalRounded = (h) => {
    ///next 6_hour object has image symbol_code from the day 3, therefore +6
    h = h + 6;
    if (timeLocal(h) >= 6 && timeLocal(h) < 11) {
      return 6;
    } //morning
    else if (timeLocal(h) >= 11 && timeLocal(h) < 18) {
      return 12;
    } //afternoon
    else if (timeLocal(h) >= 18 && timeLocal(h) < 24) {
      return 18;
    } //evening
    else {
      return 0;
    } //night
  };
  //console.log(timeLocal(hours), timeLocalRounded(14));
  //////////////////////////////////////////////////////////////////////////////////
  const dayPart = (h) => {
    switch (h) {
      case 0:
        return "night";
      case 6:
        return "morning";
      case 12:
        return "afternoon";
      case 18:
        return "evening";
      default:
        dayPart(h);
    }
  };
  // console.log(dayPart(10), timeLocalRounded(10));*/
  const nextDay = timeseries.filter((timeserie) => {
    return parseInt(timeserie.time.slice(8, 10)) === dayLocal;
  });
  /////////////////////////////////////////////////////////////////
  /* const results = [2, 10, 14, 19].map((i) => {
    return nextDay.filter((day) => {
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(i);
    });
  });
  const dayparts = [2, 10, 14, 19].map((i) => {
    return dayPart(i);
  });
*/
  //let finalResult = {};
  let finalResult = {
    [dayPart(timeLocalRounded(1))]: nextDay.filter((day) => {
      // console.log(parseInt(day.time.slice(11, 13)));
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(1);
    }),
    [dayPart(timeLocalRounded(8))]: nextDay.filter((day) => {
      //   console.log(dayPart(timeLocalRounded(7)));
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(8);
    }),
    [dayPart(timeLocalRounded(15))]: nextDay.filter((day) => {
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(15);
    }),
    [dayPart(timeLocalRounded(20))]: nextDay.filter((day) => {
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(20);
    }),
  };
  if (finalResult.lenght < 4) {
    finalResult = {
      night: undefined,
      morning: undefined,

      [dayPart(timeLocalRounded(14))]: nextDay.filter((day) => {
        console.log("hi");
        return parseInt(day.time.slice(11, 13)) === timeLocalRounded(14);
      }),
      [dayPart(timeLocalRounded(18))]: nextDay.filter((day) => {
        return parseInt(day.time.slice(11, 13)) === timeLocalRounded(18);
      }),
    };
  }
  ["night", "morning", "afternoon", "evening"].map((i) => {
    if (!finalResult.hasOwnProperty(i)) {
      return (finalResult[i] = []);
    }
    return finalResult[i];
  });
  /*const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  const finalResult = zip(dayparts, results);*/
  console.log(finalResult, finalResult.lenght);

  return finalResult;
};
export { NextDays };
