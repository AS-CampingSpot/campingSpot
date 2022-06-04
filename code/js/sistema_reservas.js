var date_start = null;
var date_end = null;
var type = null;
var nPeople = null;

const TENDA_LIMIT = 5; 
const CARAVANA_LIMIT = 10;
const CAMPING_RV_LIMIT = 10;

function getInfo() {
    date_start = document.getElementById("start-date-1").value;
    date_end = document.getElementById("end-date-1").value;
    type = document.getElementById("type").value;
    n_people = document.getElementById("nPeople").value;
    localStorage.setItem("start-date-1",date_start)
    localStorage.setItem("end-date-1",date_end)
    localStorage.setItem("type", type)
    localStorage.setItem("nPeople", n_people)
}
function getVagas (){
   
    var dias = getPeriodOfDays(localStorage.getItem("start-date-1"),localStorage.getItem("end-date-1"))
    var min=null
    if ( localStorage.getItem("type")==1) {
        min = TENDA_LIMIT
    }else if( localStorage.getItem("type")==2){
        min = CARAVANA_LIMIT
    }else if ( localStorage.getItem("type")==3){
        min = CAMPING_RV_LIMIT
    }
    
    for (let index = 0; index < dias.length; index++) {
        var vagas = localStorage.getItem(dias[index]+"::"+ localStorage.getItem("type"))
        
        if(vagas<min){
            min = vagas
        }
    }
    var x = null;
    if(localStorage.getItem("type")==1){
        x = document.getElementById("tenda_vagas")
        x.innerHTML = "Apenas tem " + min + " vagas"
    }else if(localStorage.getItem("type")==2){
        x = document.getElementById("caravana_vagas")
        x.innerHTML = "Apenas tem " + min + " vagas"
    }else if(localStorage.getItem("type")==3){
        x = document.getElementById("camping-rv_vagas")
        x.innerHTML = "Apenas tem " + min + " vagas"
    }
}

function book(){
    //console.log("book")
    const periodOfDays = getPeriodOfDays(localStorage.getItem("start-date-1"),localStorage.getItem("end-date-1"))
    var check = false;
    if(isAvailable(periodOfDays)){
        for (let index = 0; index < periodOfDays.length; index++) {
            var x = localStorage.getItem(periodOfDays[index]+"::"+ localStorage.getItem("type"))
            localStorage.setItem(periodOfDays[index]+"::"+ localStorage.getItem("type"),x- lolocalStorage.getItem("nPeople"))
        }
        check = true
    }
    //console.log(check)
    
}
function disponibilidade (){
    isAvailable(getPeriodOfDays(localStorage.getItem("start-date-1"),localStorage.getItem("end-date-1")))
}
function isAvailable(periodOfDays){
    //console.log("isAvailable")
    var available = true
    for (let index = 0; index < periodOfDays.length; index++) {
        var x = localStorage.getItem(periodOfDays[index]+"::"+ localStorage.getItem("type"))
        if(x == null){
            if(localStorage.getItem("type")=="1"){
                localStorage.setItem(periodOfDays[index]+"::"+localStorage.getItem("type"),TENDA_LIMIT);
            }else if( localStorage.getItem("type")=="2"){
                localStorage.setItem(periodOfDays[index]+"::"+localStorage.getItem("type"),CARAVANA_LIMIT);
            }else if( localStorage.getItem("type")=="3"){
                localStorage.setItem(periodOfDays[index]+"::"+localStorage.getItem("type"),CAMPING_RV_LIMIT);
            }
            x = localStorage.getItem(periodOfDays[index]+"::"+localStorage.getItem("type"))
        }
        if(x < localStorage.getItem("nPeople")){
            available=false
        }
        var book = document.getElementById("book")
      console.log(localStorage.getItem("type"))
        if(available){
            if (localStorage.getItem("type")==1) {
                book.setAttribute("href","search-tent.html")
            }else if(localStorage.getItem("type")==2){
                book.setAttribute("href","search-caravan.html")
            }else if (localStorage.getItem("type")==3){
                book.setAttribute("href","search-camping-rv.html")
            }
        }else{
            //alert("Não há disponibiliadade para essa data");
            localStorage.clear()
        }
    }
    return available;
}

function getPeriodOfDays(date_s,date_e){
    //console.log("getPeriodOfDays")
    const array = [];
    array.push(date_s);
    while(date_s!=date_e){
        date_s = incrementDay(date_s);
        array.push(date_s); 
    }
    return array
}

function incrementDay(date){
    //console.log("incrementDay")
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