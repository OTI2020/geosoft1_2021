
function get_xhr_object(in_lat, in_long) {

    var in_API_key = document.getElementById("input_field_api_key").value
    var resource = "https://api.openweathermap.org/data/2.5/weather?lat="+in_lat+"&lon="+in_long+"&appid="+in_API_key

    var x = new XMLHttpRequest();
    x.onload = loadcallback;
    x.onerror = errorcallback;
    x.onreadystatechange = statechangecallback;
    x.open("GET", resource, true);
    x.send();


    function statechangecallback() {
        //console.dir(x);
        if (x.status == "200" && x.readyState == 4) {
        //console.log(x.responseText);
        console.log(x)
        console.log(x.responseText);
        // document.getElementById("content").innerHTML = x.responseText +  JSON.stringify(JSON.parse(x.responseText),null,4);
        show_weather(x.responseText)
        }
    }

    function errorcallback(e) {
        // console.dir(x);
        // console.dir(e);
        document.getElementById("content").innerHTML = "errorcallback: check web-console";
    }

    function loadcallback() {
        //console.dir(x);
        console.log(x.status);
    }    
}


function get_geolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          window.alert("Please insert your correct API-key")
      }
    
    function showPosition(position) {
        // console.log("test showPosition()");
        // console.dir(position)
        
        get_xhr_object(position.coords.latitude, position.coords.longitude)
    }
    
    function showError(error) {
        console.dir(error);
        window.alert(error + " Please insert your correct API-key")
      
    }
}


function show_weather(weather_json) {
    weather_json = JSON.parse(weather_json)
    console.log(weather_json)

    var table_1 = document.getElementById("table_1")
    //generate table_1
    // fill table column header
    var row = table_1.insertRow()
    row.insertCell().innerHTML = weather_json.main.temp + " Fahrenheit"
    row.insertCell().innerHTML = weather_json.main.feels_like + " Fahrenheit"    
    row.insertCell().innerHTML = weather_json.main.humidity + " %"       
    row.insertCell().innerHTML = weather_json.main.pressure + " Pa"    
}
