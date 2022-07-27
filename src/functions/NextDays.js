import {TimeShift} from "./TimeShift";
//import  {PartOfDay} from "../../functions/PartOfDay";


const NextDays=(timeseries,x,dayPart)=>{
    //timeseries as coming from yr.no API
    //dayPart is string representing the part of the day (timeserie) which will be returned
    //x - integer shift in Day in month

    let now = new Date();
    let dayMonth = now.getDate()+x;
 
    const timeShift=TimeShift();   
    
    const nextDay=timeseries.filter(timeserie=>{return parseInt(timeserie.time.slice(8,10))===dayMonth});
    const morning=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===10+timeShift});
    const afternoon=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===15+timeShift});
    const evening=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===21+timeShift});
    const night=nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===3+timeShift});

   switch(dayPart) 
   {case "morning":return morning;
   case "afternoon":return afternoon;
   case "evening":return evening;
   case "night":return night;
   default:return morning;
}


}
export {NextDays}