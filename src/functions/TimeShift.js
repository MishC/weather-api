const TimeShift=()=>{
const now=new Date();
    return now.getUTCHours() - now.getHours();
    };

export {TimeShift};
