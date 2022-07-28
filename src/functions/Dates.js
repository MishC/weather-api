const Dates=(x, output) => {
  const mSeconds = (new Date()).getTime();
  // initialize date object
  const objDate = new Date();
  objDate.setTime(mSeconds + 86400000 * x); 
    let dayMonth = objDate.getUTCDate(); //getUTCDate() returns the day of the month of a date, 
                                        //according to UTC
        let day = objDate.getDay(); //Day of the week, number 0-6
        let month = objDate.getMonth(); //current month, number of 0-11
       
       


        const dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let weekDay = dayWeek[day];
        let currentMonth = months[month];
      switch(output){ case "daymonth": return dayMonth;
      case "weekday":return weekDay;
      case "currentMonth":return currentMonth;
       default: return `${weekDay} ${dayMonth}. ${currentMonth}`;}
      }
    
export {Dates}