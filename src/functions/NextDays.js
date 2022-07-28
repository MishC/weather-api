import {TimeShift} from "./TimeShift";
import  {PartOfDay} from "./PartOfDay";
import {Dates} from "./Dates";


const NextDays=(timeseries,x)=>{
    //timeseries as coming from yr.no API
    //dayPart is string representing the part of the day (timeserie) which will be returned
    //x - integer shift in Day in month

    let now = new Date();
    let dayMonth = Dates(x, "daymonth");
    console.log(dayMonth);
    let dayPart=PartOfDay(now.getHours());
    const timeShift=TimeShift();
  console.log(timeShift);
    
    const nextDay=timeseries.filter(timeserie=>{return parseInt(timeserie.time.slice(8,10))===dayMonth});
    
  
    let morning=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===6});
    let afternoon=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===12});
    let evening=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===18});
    let night=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===0});
     if (x<=2){morning=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===10+timeShift});
     afternoon=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===13+timeShift});
     evening=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===19+timeShift});
    night=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===3+timeShift});}

    if (x===0) {
        switch(dayPart) 
        {case "night":return  {"night":night,"morning":morning,"afternoon":afternoon,"evening":evening};
        case "afternoon":return  {"morning":morning,"afternoon":afternoon,"evening":evening};
        case "evening":return  {"evening":evening};
        default:return  {"night":night,"morning":morning,"afternoon":afternoon,"evening":evening} ;
     }

    } 
     else
    return {"night":night,"morning":morning,"afternoon":afternoon,"evening":evening}
  /* switch(dayPart) 
   {case "morning":return morning;
   case "afternoon":return afternoon;
   case "evening":return evening;
   case "night":return night;
   default:return morning;
}*/


}
export {NextDays}