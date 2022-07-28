import {TimeShift} from "./TimeShift";
const PartOfDay=(time)=>{
 
    const timeShift=TimeShift();   
    const timeShifted=parseInt(time+timeShift);
  

   if (timeShifted<6){
 
        
            return "night"}
            else if ((6<=timeShifted)&&(timeShifted<12)) {
       
                return "morning";}
               else if ((12<=timeShifted)&&(timeShifted<18)){
                    return "afternoon";}
                   else if ((18<=timeShifted)&&(timeShifted<24)){
                        return "evening";}
                       else return "morning";
                     

}
export {PartOfDay}