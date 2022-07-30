import {TimeShift} from "./TimeShift";
import  {PartOfDay} from "./PartOfDay";
import {Dates} from "./Dates";
import axios from "axios";


const NextDays=(timeseries,x,lat,lon)=>{
    //timeseries as coming from yr.no API
    //dayPart is string representing the part of the day (timeserie) which will be returned 
    //x - integer shift in Day in month
    //lat,lon - latitude, longitude

    let now = new Date();
    let dayMonth = Dates(x, "daymonth");
    let month= now.getMonth();
    let hours=now.getHours();
    let dayPart=PartOfDay(now.getHours());
    let timestamp = new Date( 1995, month, dayMonth).getTime();
   const timeShift=()=>{
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&language=en&key=YOUR_API_KEY`,
        headers: { }
      };
      
      axios(config)
      .then(function (res) {
       return res.data.rawOffset+res.data.dstOffset
      })
      .catch(function (error) {
        console.log(error);
      });}
     (timeShift()+hours)>24?dayMonth+1:dayMonth;

    const nextDay=timeseries.filter(timeserie=>{return parseInt(timeserie.time.slice(8,10))===dayMonth});
    const result=()=>{
       (x<=2)?({"morning":nextDay.filter(day=>{ parseInt(day.time.slice(11,13))===10+timeShift()}),
     "afternoon":nextDay.filter(day=>{parseInt(day.time.slice(11,13))===13+timeShift()}),
    "evening":nextDay.filter(day=>{ parseInt(day.time.slice(11,13))===19+timeShift()}),
  "night":nextDay.filter(day=>{parseInt(day.time.slice(11,13))===3+timeShift()})}):({
  "morning":nextDay.filter(day=>{parseInt(day.time.slice(11,13))===6}),
  "afternoon":nextDay.filter(day=>{ parseInt(day.time.slice(11,13))===12}),
  "evening":nextDay.filter(day=>{ parseInt(day.time.slice(11,13))===18}),
   "night":nextDay.filter(day=>{ parseInt(day.time.slice(11,13))===0})})
  }

    /* if (x===0) {
        switch(dayPart) 
        {case "night":return  {"night":night,"morning":morning,"afternoon":afternoon,"evening":evening};
        case "afternoon":return  {"morning":morning,"afternoon":afternoon,"evening":evening};
        case "evening":return  {"evening":evening};
        default:return  {"night":night,"morning":morning,"afternoon":afternoon,"evening":evening} ;
     }

    } 
     else
    return {"night":night,"morning":morning,"afternoon":afternoon,"evening":evening} }

}*/
return result();

    }
export {NextDays}