import  {PartOfDay} from "./PartOfDay";
import {Dates} from "./Dates";
const NextDays=(timeseries,dayX,timeshifts)=>{
    //timeseries as coming from yr.no API
    //dayX - integer shift in Day in month relative to current date
    //timeshifts - timeshifts for dayX
       //dayPart is string representing the part of the day (timeserie) which will be returned 
     let now=new Date();
    let hours=now.getUTCHours();
    let dayMonth=Dates(dayX,"daymonth");
   
     const dayLocal=(timeshifts[dayX]+hours)>24?dayMonth+1:dayMonth;
////////////////////////////////////////////////////////////////////////////////////
     const timeLocal=(h)=>(timeshifts[dayX]+h)>24? (timeshifts[dayX]+h)-24:(timeshifts[dayX]+h);
    const timeLocalRounded=(h)=>{
           
             if (timeLocal(h)>=4 && timeLocal(h)<=12){return 6}//morning
            else if (timeLocal(h)>12 && timeLocal(h)<18){return 12}//afternoon
           else if (timeLocal(h)>=18 && timeLocal(h)<24){ return 18}//evening 
           else {return 0} //night
        }
        console.log(timeLocal(hours), timeLocalRounded(10))
  //////////////////////////////////////////////////////////////////////////////////  
    const dayPart=(h)=>{switch(timeLocalRounded(h)) {case 0:return "night";case 6:return "morning";
        case 12: return "afternoon"; case 18: return "evening"; default: PartOfDay(now.getHours());}};
    console.log(dayPart(10),timeLocalRounded(10));
        const nextDay=timeseries.filter((timeserie)=>
        {return parseInt(timeserie.time.slice(8,10))===dayLocal});
        /////////////////////////////////////////////////////////////////
   //// const results=[2,10,14,19].map(i=>{return (
    //    nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===timeLocalRounded(i)}))});
    // const dayparts=[2,10,14,19].map(i=>{return dayPart(i)});
     const finalResult={"night":nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===timeLocalRounded(2)}),
        "morning":nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===timeLocalRounded(10)}),
    "afternoon":nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===timeLocalRounded(14)}),
    "evening":nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===timeLocalRounded(19)}),}
     //const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    // const finalResult=zip(dayparts,results);
     console.log(finalResult)
 
     return finalResult;
}
export {NextDays}