import {TimeStamp} from "./TimeStamp";
import  {PartOfDay} from "./PartOfDay";
import {Dates} from "./Dates";
import axios from "axios";


const NextDays=(timeseries,dayX,timeShift)=>{
    //timeseries as coming from yr.no API
    //dayPart is string representing the part of the day (timeserie) which will be returned 
    //dayX - integer shift in Day in month
    //lat,lon - latitude, longitude
   {/* let now = new Date();
    
    let hours=now.getHours();
    //let dayPart=PartOfDay(now.getHours());
    let timestamp = TimeStamp();
   const timeShift=async (lat,lon)=>{
    if (lat!==undefined){
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&language=en&key=AIzaSyDvQnTRBUjrJB2m1SsDlBZNxMgulpZCqfs`,
        headers: { }
      };
    }
     const res=await axios(config);
      res.then(function (res)
      
      {
       return res.data.rawOffset+res.data.dstOffset
      })
      .catch(function (error) {
        console.log(error);
      });}
     const dayLocal=(timeShift()+hours)>24?dayMonth+1:dayMonth;
     const timeLocal=(h)=>(timeShift()+h)>24? (timeShift()+h)-24:(timeShift()+h);
        const timeLocalRounded=(h)=>{switch(true){
            default: return 0;
            case timeLocal(h)<6:return 0; //night
            case timeLocal(h)>=6 && timeLocal(h)<12:return 6;//morning
            case timeLocal(h)>=12 && timeLocal(h)<18:return 12;//afternoon
           case timeLocal(h)>=18 && timeLocal(h)<24: return 18;};//evening
        }
    
    const dayPart=(h)=>{switch(timeLocalRounded(h)) {case 0:return "night";case 6:return "morning";
        case 12: return "afternoon"; case 18: return "evening"; default: PartOfDay(now.getHours());}};
    
        const nextDay=timeseries.filter((timeserie)=>{return parseInt(timeserie.time.slice(8,10))===dayLocal});
    const result=[1,10,14,19].map(i=>{return (
        nextDay.filter(day=>{return parseInt(day.time.slice(11,13))===timeLocalRounded(i)}))});
     const daypart=[1,10,14,19].map(i=>{return dayPart(i)});

     const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    
 
     const finalResult=[zip(daypart,result)];
     console.log(finalResult)
 
     return finalResult;*/}
     return null;
}
export {NextDays}