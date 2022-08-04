import {Dates} from "./Dates";
const TimeStamp=(dayX)=>{
    let now = new Date();

let dayMonth = Dates(dayX, "daymonth");
let month= now.getMonth(); 
let year =now.getFullYear();
return Math.floor(new Date( year, month, dayMonth).valueOf()/1000);
}

export {TimeStamp}