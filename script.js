//Regla de 3 en minutos. minutos jugados * 50 / 60

//Function that adds a Zero to the start time when time is less than 10

function addZero(i)
{
    if(i < 10)
    {
        i = "0" + i;
    }
    return i;
}

//Function that starts the hour
function timeStart()
{
    var ds = new Date();
    var hs = addZero(ds.getHours());
    var ms = addZero(ds.getMinutes());
    var ss = addZero(ds.getSeconds());
    return hs + ":" + ms + ":" + ss;
}

//Function to get the difference between start hour and end hour 
function getDifference(aux1, aux2)
{
    var hourStart = aux2.split(":");
    var hourEnd = aux1.split(":");
    var auxDate1 = new Date();
    var auxDate2 = new Date();

    //Sets the hours to milliseconds, then convert them into minutes for post usage in rule of 3 so we can get the total price
    auxDate1.setHours(hourStart[0], hourStart[1], hourStart[2]);
    auxDate2.setHours(hourEnd[0], hourEnd[1], hourEnd[2]);

    //var that stores milliseconds difference
    var difference = Math.abs(auxDate1 - auxDate2);

    //Convert milliseconds into minutes, then return them.
    return Math.floor((difference/1000)/60);
}

//Function for changing image and startTime, endTime, total.

function changeImage(num) {

    //Vars that get id's from index.html so can be used independently
    var tableNum = document.getElementById(num);
    var startTime = document.getElementById("startTime" + num[num.length - 1]);
    var endTime = document.getElementById("endTime" + num[num.length - 1]);
    var total = document.getElementById("total" + num[num.length - 1]);

    if(tableNum.src.match("tableOff.png"))
    {
        tableNum.src = "tableOn.png";
        startTime.innerHTML = timeStart();
        endTime.innerHTML = "*En uso*";
        total.innerHTML = "Calculando...";
    }
    else
    {
        tableNum.src = "tableOff.png";
        endTime.innerHTML = timeStart();
       
        var tableUsage = getDifference(startTime.innerHTML, endTime.innerHTML);
        
        total.innerHTML = ((tableUsage * 50)/60).toFixed(2);
        
        if(total.innerHTML < 10)
        {
            total.innerHTML = "$" + "0" + total.innerHTML;
        }
        else
        {
            total.innerHTML = "$" + total.innerHTML;
        }

    }
}
