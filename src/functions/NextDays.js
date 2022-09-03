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
  console.log(dayLocal, dayMonth, timeshifts[dayX]);
  console.log(timeshifts[dayX]);
  ////////////////////////////////////////////////////////////////////////////////////
  const timeLocal = (h) =>
    ///gives local timeshift  and add it to the current UTC time;

    timeshifts[dayX] + h > 24
      ? timeshifts[dayX] + h - 24
      : timeshifts[dayX] + h;
  console.log(timeLocal(hours));
  const timeLocalRounded = (h) => {
    h = h - 6;
    if (timeLocal(h) >= 5 && timeLocal(h) <= 12) {
      return 6;
    } //morning
    else if (timeLocal(h) > 12 && timeLocal(h) < 17) {
      return 12;
    } //afternoon
    else if (timeLocal(h) >= 17 && timeLocal(h) < 24) {
      return 18;
    } //evening
    else {
      return 0;
    } //night
  };
  console.log(timeLocal(hours), timeLocalRounded(14));
  //////////////////////////////////////////////////////////////////////////////////
  /*const dayPart = (h) => {
    ///next 6_hour object has symbol from the day 3, therefore +6
    // let time = h + 6;
    switch (timeLocalRounded(h)) {
      case 0:
        return "evening";
      case 6:
        return "afternoon";
      case 12:
        return "evening";
      case 18:
        return "night";
      default:
        PartOfDay(now.getHours());
    }
  };
  // console.log(dayPart(10), timeLocalRounded(10));*/
  const nextDay = timeseries.filter((timeserie) => {
    return parseInt(timeserie.time.slice(8, 10)) === dayLocal;
  });
  /////////////////////////////////////////////////////////////////
  //// const results=[2,10,14,19].map(i=>{return (
  //    nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===timeLocalRounded(i)}))});
  // const dayparts=[2,10,14,19].map(i=>{return dayPart(i)});

  const finalResult = {
    night: nextDay.filter((day) => {
      console.log(parseInt(day.time.slice(11, 13)));
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(3);
    }),
    morning: nextDay.filter((day) => {
      console.log(parseInt(day.time.slice(11, 13)) === timeLocalRounded(10));
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(10);
    }),
    afternoon: nextDay.filter((day) => {
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(12);
    }),
    evening: nextDay.filter((day) => {
      return parseInt(day.time.slice(11, 13)) === timeLocalRounded(19);
    }),
  };
  //if (finalResult.lenght()===0){};
  //const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  // const finalResult=zip(dayparts,results);
  console.log(finalResult);

  return finalResult;
};
export { NextDays };
