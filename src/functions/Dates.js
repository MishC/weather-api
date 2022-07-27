const Dates=(x) => {
        let now = new Date();       
        let day = now.getDay()+x; //Day of the week, number 0-6
        let month = now.getMonth(); //current month, number of 0-11
       
        let dayMonth = now.getUTCDate()+x; //getUTCDate() returns the day of the month of a date, 
                                        //according to UTC 


        let dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let months = [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "june",
          "july",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ];
        let weekDay = dayWeek[day];
        let currentMonth = months[month];
      
        return `${weekDay} ${dayMonth}. ${currentMonth}`;
      }
    
export {Dates}