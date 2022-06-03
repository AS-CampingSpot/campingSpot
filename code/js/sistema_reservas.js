var date_start = null;
var date_end = null;
var type = null;
var n_people = null;

const TENDA_LIMIT = 5; 
const CARAVANA_LIMIT = 10;
const CAMPING_RV_LIMIT = 10;

function getInfo() {
    date_start = document.getElementById("start-date-1").value;
    date_end = document.getElementById("end-date-1").value;
    type = document.getElementById("type").value;
    n_people = document.getElementById("nPeople").value;
}

function book(){
    console.log("book")
    const periodOfDays = getPeriodOfDays(date_start,date_end)
    var check = false;
    if(isAvaible(periodOfDays)){
        for (let index = 0; index < periodOfDays.length; index++) {
            var x = localStorage.getItem(periodOfDays[index]+"::"+type)
            localStorage.setItem(periodOfDays[index]+"::"+type,x-n_people)
        }
        check = true
    }
    console.log(check)
    var book = document.getElementById("book")
    /*
    if(check){
        book.setAttribute("href","contact.html")
    }else{
        book.setAttribute("href","activity.html")
    }
    */
}

function isAvaible(periodOfDays){
    console.log("isAvailable")
    for (let index = 0; index < periodOfDays.length; index++) {
        var x = localStorage.getItem(periodOfDays[index]+"::"+type)
        if(x == null){
            if(type=="1"){
                localStorage.setItem(periodOfDays[index]+"::"+type,TENDA_LIMIT);
            }else if(type=="2"){
                localStorage.setItem(periodOfDays[index]+"::"+type,CARAVANA_LIMIT);
            }else if(type=="3"){
                localStorage.setItem(periodOfDays[index]+"::"+type,CAMPING_RV_LIMIT);
            }
            x = localStorage.getItem(periodOfDays[index]+"::"+type)
        }
        if(x<n_people){
            return false;
        }
    }
    return true;
}

function getPeriodOfDays(date_s,date_e){
    console.log("getPeriodOfDays")
    const array = [];
    array.push(date_s);
    while(date_s!=date_e){
        console.log(date_s)
        date_s = incrementDay(date_s);
        array.push(date_s); 
    }
    return array
}

function incrementDay(date){
    console.log("incrementDay")
    const values = date.split(".")
    var day = parseInt(values[1])
    var month = parseInt(values[0])
    var year = parseInt(values[2])

    if (month == 12 && day == monthDays(month, year)) {
        year++;
        month = 1;
        day = 1;
    } else if (day == monthDays(month, year)) {
        month++;
        day = 1;
    } else {
        day++;
    }

    if(day<10){
        day = 0 + day.toString()
    }

    if(month<10){
        month = 0 + month.toString()
    }

    return month+"."+day+"."+year
}

function monthDays(month, year) {
    const days = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    if (leapYear(year) && month == 2) {
        return 29;
    }
    return days[month - 1];
}

function leapYear(year) {
    if ((year % 4 == 0 && year % 100 == 0 && year % 400 == 0)) {
        return true;
    } else if (year % 4 == 0 && year % 100 != 0) {
        return true;
    }
    return false;
}